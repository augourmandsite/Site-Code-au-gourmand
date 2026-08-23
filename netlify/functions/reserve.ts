import type { Handler } from '@netlify/functions'
import { Resend } from 'resend'
import { getSupabase, isOpenDay, isValidDate, reservationSlots } from './_lib/reservations'

type ReservationPayload = {
  name?: string
  email?: string
  phone?: string
  date?: string
  time?: string
  guests?: number
  notes?: string
}

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character)

async function sendReservationEmails({ name, email, phone, date, time, guests, notes }: Required<Omit<ReservationPayload, 'notes'>> & { notes?: string }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  const hostEmail = process.env.RESERVATION_HOST_EMAIL
  if (!apiKey || !from || !hostEmail) {
    console.warn('E-mails de réservation non configurés : variables Resend manquantes.')
    return false
  }

  const resend = new Resend(apiKey)
  const formattedDate = new Intl.DateTimeFormat('fr-CH', { dateStyle: 'full', timeZone: 'Europe/Zurich' }).format(new Date(`${date}T12:00:00Z`))
  const details = `<ul><li><strong>Nom :</strong> ${escapeHtml(name)}</li><li><strong>E-mail :</strong> ${escapeHtml(email)}</li><li><strong>Téléphone :</strong> ${escapeHtml(phone)}</li><li><strong>Date :</strong> ${formattedDate}</li><li><strong>Heure :</strong> ${time}</li><li><strong>Personnes :</strong> ${guests}</li>${notes ? `<li><strong>Message :</strong> ${escapeHtml(notes)}</li>` : ''}</ul>`

  try {
    const [hostResult, guestResult] = await Promise.all([
      resend.emails.send({ from, to: [hostEmail], replyTo: email, subject: `Nouvelle réservation — ${formattedDate} à ${time}`, html: `<h1>Nouvelle demande de réservation</h1>${details}` }),
      resend.emails.send({ from, to: [email], replyTo: hostEmail, subject: 'Votre demande de réservation — Au Gourmand', html: `<h1>Votre demande a bien été reçue.</h1><p>Bonjour ${escapeHtml(name)},</p><p>Nous vous confirmerons votre réservation rapidement.</p><h2>Récapitulatif</h2>${details}<p>Pour toute question, appelez le <a href="tel:+41213115474">021 311 54 74</a>.</p>` }),
    ])
    if (hostResult.error || guestResult.error) throw hostResult.error ?? guestResult.error
    return true
  } catch (error) {
    console.error('Échec de l’envoi de l’e-mail de réservation', error)
    return false
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' }

  try {
    const payload = JSON.parse(event.body ?? '{}') as ReservationPayload
    const name = payload.name?.trim() ?? ''
    const email = payload.email?.trim() ?? ''
    const phone = payload.phone?.trim() ?? ''
    const date = payload.date ?? ''
    const time = payload.time ?? ''
    const guests = Number(payload.guests)

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !phone || !isValidDate(date) || !reservationSlots.includes(time) || !Number.isInteger(guests) || guests < 1 || guests > 20) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Merci de compléter tous les champs obligatoires.' }) }
    }
    if (!isOpenDay(date)) return { statusCode: 400, body: JSON.stringify({ error: 'Le restaurant est fermé le lundi. Choisissez une date du mardi au dimanche.' }) }

    const { data, error } = await getSupabase().rpc('create_reservation', {
      p_guest_name: name,
      p_guest_email: email,
      p_guest_phone: phone,
      p_reservation_date: date,
      p_reservation_time: time,
      p_guests: guests,
      p_notes: payload.notes?.trim() || null,
    })

    if (error) return { statusCode: 409, body: JSON.stringify({ error: error.message }) }

    const notificationSent = await sendReservationEmails({ name, email, phone, date, time, guests, notes: payload.notes?.trim() || undefined })

    return { statusCode: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reservation: data, notificationSent }) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Une erreur est survenue. Veuillez réessayer.' }) }
  }
}
