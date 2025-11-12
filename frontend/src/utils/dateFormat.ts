export function formatDayAndMonth(dateString: string): string {
  const parts = dateString.split('-')

  let date: Date
  if (parts.length === 3) {
    const year = Number(parts[0])
    const month = Math.max(0, Number(parts[1]) - 1)
    const day = Number(parts[2])
    date = new Date(year, month, day)
  } else {
    date = new Date(dateString)
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long'
  }

  return date.toLocaleDateString('pt-BR', options)
}

export function getTodayDate(): string {
  const date = new Date()

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // meses começam em 0
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const DateFormat = Object.freeze({
  formatDayAndMonth,
  getTodayDate
})
