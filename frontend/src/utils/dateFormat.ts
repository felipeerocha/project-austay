export function formatDayAndMonth(dateString: string): string {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long'
  }

  return date.toLocaleDateString('pt-BR', options)
}

export const DateFormat = Object.freeze({
  formatDayAndMonth
})
