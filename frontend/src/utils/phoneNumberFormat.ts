/**
 * Formata um número de telefone nos padrões (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.
 * @param phoneNumber A string do telefone a ser formatada.
 * @returns O número formatado ou a string original se inválida.
 */
export function formatPhoneNumber(
  phoneNumber: string | null | undefined
): string {
  if (!phoneNumber) {
    return ''
  }

  const cleaned = phoneNumber.replace(/\D/g, '')

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return phoneNumber
}
