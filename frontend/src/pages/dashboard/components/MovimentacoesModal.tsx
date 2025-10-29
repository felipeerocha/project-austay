import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import * as S from './MovimentacoesModal.styles'
import type { MovimentacoesPorData } from '../types'

interface MovimentacoesModalProps {
  open: boolean
  onClose: () => void
  data: MovimentacoesPorData | null
  isLoading: boolean
}

export function MovimentacoesModal({
  open,
  onClose,
  data,
  isLoading
}: MovimentacoesModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontSize: '1.8rem', fontWeight: 600 }}>
        Movimentações - {data ? formatDate(data.data) : ''}
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <S.LoadingContainer>
            <S.PurpleSpinner size={24} />
          </S.LoadingContainer>
        ) : data ? (
          <S.Content>
            {data.check_ins.length > 0 && (
              <S.Section>
                <S.SectionTitle>
                  Check-ins ({data.check_ins.length})
                </S.SectionTitle>
                <S.Table>
                  <S.TableHeader>
                    <S.TableHeaderCell>Pet</S.TableHeaderCell>
                    <S.TableHeaderCell>Tutor</S.TableHeaderCell>
                    <S.TableHeaderCell>Hora</S.TableHeaderCell>
                    <S.TableHeaderCell>Diária</S.TableHeaderCell>
                    <S.TableHeaderCell>Status</S.TableHeaderCell>
                  </S.TableHeader>
                  <S.TableBody>
                    {data.check_ins.map((item) => (
                      <S.TableRow key={item.estadia_id}>
                        <S.TableCell>{item.pet_nome}</S.TableCell>
                        <S.TableCell>{item.tutor_nome}</S.TableCell>
                        <S.TableCell>{item.hora || '-'}</S.TableCell>
                        <S.TableCell>{formatCurrency(item.valor_diaria)}</S.TableCell>
                        <S.TableCell>
                          <S.PaymentBadge paid={item.pago}>
                            {item.pago ? 'Pago' : 'Pendente'}
                          </S.PaymentBadge>
                        </S.TableCell>
                      </S.TableRow>
                    ))}
                  </S.TableBody>
                </S.Table>
              </S.Section>
            )}

            {data.check_outs.length > 0 && (
              <S.Section>
                <S.SectionTitle>
                  Check-outs ({data.check_outs.length})
                </S.SectionTitle>
                <S.Table>
                  <S.TableHeader>
                    <S.TableHeaderCell>Pet</S.TableHeaderCell>
                    <S.TableHeaderCell>Tutor</S.TableHeaderCell>
                    <S.TableHeaderCell>Hora</S.TableHeaderCell>
                    <S.TableHeaderCell>Diária</S.TableHeaderCell>
                    <S.TableHeaderCell>Status</S.TableHeaderCell>
                  </S.TableHeader>
                  <S.TableBody>
                    {data.check_outs.map((item) => (
                      <S.TableRow key={item.estadia_id}>
                        <S.TableCell>{item.pet_nome}</S.TableCell>
                        <S.TableCell>{item.tutor_nome}</S.TableCell>
                        <S.TableCell>{item.hora || '-'}</S.TableCell>
                        <S.TableCell>{formatCurrency(item.valor_diaria)}</S.TableCell>
                        <S.TableCell>
                          <S.PaymentBadge paid={item.pago}>
                            {item.pago ? 'Pago' : 'Pendente'}
                          </S.PaymentBadge>
                        </S.TableCell>
                      </S.TableRow>
                    ))}
                  </S.TableBody>
                </S.Table>
              </S.Section>
            )}

            {data.check_ins.length === 0 && data.check_outs.length === 0 && (
              <S.EmptyMessage>
                Nenhuma movimentação encontrada para esta data
              </S.EmptyMessage>
            )}
          </S.Content>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

