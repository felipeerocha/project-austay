export type GetPaymentsDTO = {
  id: string
  estadia_id: string
  valor: number | null
  status: boolean
  meio_pagamento: string | null
  data_pagamento: string | null
}
