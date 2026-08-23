import type { Handler } from '@netlify/functions'
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

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !phone || !isValidDate(date) || !isOpenDay(date) || !reservationSlots.includes(time) || !Number.isInteger(guests) || guests < 1 || guests > 20) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Merci de compléter tous les champs obligatoires.' }) }
    }

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

    return { statusCode: 201, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reservation: data }) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Une erreur est survenue. Veuillez réessayer.' }) }
  }
}
