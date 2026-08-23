import { createClient } from '@supabase/supabase-js'

export const reservationSlots = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

export function getSupabase() {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) throw new Error('Supabase n’est pas configuré.')

  return createClient(url, serviceRoleKey, { auth: { persistSession: false } })
}

export function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00Z`))
}

export function isOpenDay(value: string) {
  return new Date(`${value}T12:00:00Z`).getUTCDay() !== 1
}
