const BASE_URL = 'http://localhost:3000/api'

// ─── HELPERS ─────────────────────────────────────────────

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Något gick fel')
  }

  return data
}

// ─── PUPILS ──────────────────────────────────────────────

export async function getPupils() {
  return request('/pupils')
}

export async function addPupil(full_name, className) {
  return request('/pupils', {
    method: 'POST',
    body: JSON.stringify({ full_name, class: className })
  })
}

export async function deletePupil(id) {
  return request(`/pupils/${id}`, {
    method: 'DELETE'
  })
}

// ─── TEACHERS ────────────────────────────────────────────

export async function getTeachers() {
  return request('/teachers')
}

// ─── ATTENDANCE ──────────────────────────────────────────

export async function getAttendanceByDate(date) {
  return request(`/attendance/${date}`)
}

export async function markAttendance(pupil_id, teacher_id, date, status) {
  return request('/attendance', {
    method: 'POST',
    body: JSON.stringify({ pupil_id, teacher_id, date, status })
  })
}

export async function getAttendanceStats() {
  return request('/attendance/stats/all')
}