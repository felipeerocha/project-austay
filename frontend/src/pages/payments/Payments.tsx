import { MoneyFormat } from '../../utils/moneyFormat'

export function Payments() {
  return <p>Payments {MoneyFormat.formatCurrency(100)}</p>
}
