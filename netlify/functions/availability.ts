import type { Handler } from '@netlify/functions'
import { getSupabase, isValidDate, reservationSlots } from './_lib/reservations'

export const handler: Handler = async (event) => {
  const date = event.queryStringParameters?.date ?? ''
  const guests = Number(event.queryStringParameters?.guests ?? 1)

  if (!isValidDate(date) || !Number.isInteger(guests) || guests < 1 || guests > 20) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Date ou nombre de personnes invalide.' }) }
  }
  try {
    const supabase = getSupabase()
    const [{ data: settings, error: settingsError }, { data: reservations, error: reservationsError }] = await Promise.all([
      supabase.from('restaurant_settings').select('max_covers_per_slot').eq('id', true).single(),
      supabase.from('reservations').select('reservation_time, guests').eq('reservation_date', date).in('status', ['pending', 'confirmed']),
    ])

    if (settingsError || reservationsError) throw settingsError ?? reservationsError

    const usedBySlot = new Map<string, number>()
    reservations.forEach((reservation) => {
      const time = reservation.reservation_time.slice(0, 5)
      usedBySlot.set(time, (usedBySlot.get(time) ?? 0) + reservation.guests)
    })

    const slots = reservationSlots.map((time) => ({
      time,
      available: (settings.max_covers_per_slot - (usedBySlot.get(time) ?? 0)) >= guests,
    }))

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slots }) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ error: 'Impossible de vérifier les disponibilités.' }) }
  }
}
