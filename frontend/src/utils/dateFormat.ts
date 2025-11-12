export function formatDayAndMonth(dateString: string): string {
  const date = new Date(dateString)

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
