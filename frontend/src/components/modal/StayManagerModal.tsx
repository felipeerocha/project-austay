import { useEffect, useMemo, useState } from 'react'
import { FiTrash2, FiSave, FiX, FiAlertTriangle } from 'react-icons/fi'
import { stayService } from '../../services/stayService'
import type { Stay } from '../../types/stay'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HeaderTexts,
  ModalTitle,
  ModalSubtitle,
  CloseButton,
  Tabs,
  TabButton,
  ModalBody,
  SectionCard,
  SectionTitle,
  SummaryGrid,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  FormGrid,
  Field,
  Input,
  TextArea,
  ToggleRow,
  ToggleLabel,
  Toggle,
  ToggleInput,
  ToggleSlider,
  ActionsRow,
  GhostButton,
  PrimaryButton,
  DeleteCard,
  DeleteTitle,
  DeleteText,
  DeleteActions,
  DangerButton,
  OutlineButton,
  LoadingState
} from './StayManagerModal.styles'
import type { UpdateStayPayload } from '../../types/stay'
import { toastError, toastSuccess } from '../toast/toast'

type Mode = 'edit' | 'delete'

type StayManagerModalProps = {
  open: boolean
  stayId: string | null
  onClose: () => void
  onUpdateSuccess?: () => void
  onDeleteSuccess?: () => void
  initialMode?: Mode
}

const initialFormState = {
  data_saida: '',
  hora_final: '',
  valor_diaria: '',
  observacoes: '',
  pago: false
}

export function StayManagerModal({
  open,
  stayId,
  onClose,
  onUpdateSuccess,
  onDeleteSuccess,
  initialMode = 'edit'
}: StayManagerModalProps) {
  const [stay, setStay] = useState<Stay | null>(null)
  const [form, setForm] = useState(initialFormState)
  const [activeTab, setActiveTab] = useState<Mode>('edit')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!open) {
      resetState()
      return
    }

    setActiveTab(initialMode)
  }, [open, initialMode])

  useEffect(() => {
    if (!open || !stayId) {
      return
    }

    const fetchStay = async () => {
      setIsLoading(true)
      try {
        const response = await stayService.getOne(stayId)
        setStay(response)
        setForm({
          data_saida: response.data_saida ?? '',
          hora_final: response.hora_final ? response.hora_final.slice(0, 5) : '',
          valor_diaria: formatCurrencyInput(response.valor_diaria.toFixed(2).replace('.', ',')),
          observacoes: response.observacoes ?? '',
          pago: response.pago
        })
      } catch (err) {
        console.error(err)
        toastError('Não foi possível carregar a estadia selecionada.')
        onClose()
      } finally {
        setIsLoading(false)
      }
    }

    fetchStay()
  }, [open, stayId, onClose])

  const stayPeriod = useMemo(() => {
    if (!stay) return ''
    const entrada = formatDate(stay.data_entrada)
    const saida = stay.data_saida ? formatDate(stay.data_saida) : '—'
    return `${entrada} • ${saida}`
  }, [stay])

  const valorDiariaPreview = useMemo(() => {
    if (!stay) return ''
    return formatCurrency(stay.valor_diaria)
  }, [stay])

  const valorTotalPreview = useMemo(() => {
    if (!stay || typeof stay.valor_total !== 'number') return '—'
    return formatCurrency(stay.valor_total)
  }, [stay])

  const handleInputChange = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    if (!stayId) return
    setIsSaving(true)

    try {
      const payload: UpdateStayPayload = {
        data_saida: form.data_saida ? form.data_saida : null,
        hora_final: form.hora_final ? `${form.hora_final}:00` : null,
        observacoes: form.observacoes?.trim() ? form.observacoes.trim() : null,
        pago: form.pago
      }

      if (form.valor_diaria) {
        payload.valor_diaria = parseFloat(form.valor_diaria.replace(/\./g, '').replace(',', '.'))
      }

      const updated = await stayService.update(stayId, payload)
      setStay(updated)
      toastSuccess('Estadia atualizada com sucesso!')
      onUpdateSuccess?.()
    } catch (err) {
      console.error(err)
      toastError('Erro ao atualizar a estadia.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!stayId) return
    setIsDeleting(true)

    try {
      await stayService.remove(stayId)
      toastSuccess('Estadia excluída com sucesso.')
      onDeleteSuccess?.()
      handleClose()
    } catch (err) {
      console.error(err)
      toastError('Não foi possível excluir esta estadia.')
    } finally {
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  const handleClose = () => {
    if (isSaving || isDeleting) return
    onClose()
    resetState()
  }

  const resetState = () => {
    setStay(null)
    setForm(initialFormState)
    setConfirmDelete(false)
    setIsLoading(false)
    setActiveTab('edit')
  }

  if (!open || !stayId) {
    return null
  }

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <HeaderTexts>
            <ModalTitle>Gerenciar estadia</ModalTitle>
            <ModalSubtitle>
              {stay ? `${stay.pet.nome} • Tutor ${stay.tutor.name}` : 'Carregando...'}
            </ModalSubtitle>
          </HeaderTexts>
          <CloseButton onClick={handleClose} aria-label="Fechar modal">
            <FiX />
          </CloseButton>
        </ModalHeader>

        <Tabs>
          <TabButton
            type="button"
            $active={activeTab === 'edit'}
            onClick={() => setActiveTab('edit')}
          >
            <FiSave style={{ marginRight: '0.6rem' }} />
            Atualizar informações
          </TabButton>
          <TabButton
            type="button"
            $active={activeTab === 'delete'}
            onClick={() => setActiveTab('delete')}
          >
            <FiTrash2 style={{ marginRight: '0.6rem' }} />
            Excluir estadia
          </TabButton>
        </Tabs>

        <ModalBody>
          {isLoading && <LoadingState>Carregando dados...</LoadingState>}

          {!isLoading && stay && (
            <>
              <SectionCard>
                <SectionTitle>Resumo</SectionTitle>
                <SummaryGrid>
                  <SummaryItem>
                    <SummaryLabel>Pet</SummaryLabel>
                    <SummaryValue>{stay.pet.nome}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Tutor</SummaryLabel>
                    <SummaryValue>{stay.tutor.name}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Período</SummaryLabel>
                    <SummaryValue>{stayPeriod}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Valor diária atual</SummaryLabel>
                    <SummaryValue>{valorDiariaPreview}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Valor total previsto</SummaryLabel>
                    <SummaryValue>{valorTotalPreview}</SummaryValue>
                  </SummaryItem>
                </SummaryGrid>
              </SectionCard>

              {activeTab === 'edit' && (
                <SectionCard>
                  <SectionTitle>Atualizar informações</SectionTitle>
                  <FormGrid>
                    <Field>
                      Data de saída
                      <Input
                        type="date"
                        value={form.data_saida}
                        onChange={(event) => handleInputChange('data_saida', event.target.value)}
                        max="9999-12-31"
                      />
                    </Field>

                    <Field>
                      Hora de saída
                      <Input
                        type="time"
                        value={form.hora_final}
                        onChange={(event) => handleInputChange('hora_final', event.target.value)}
                      />
                    </Field>

                    <Field>
                      Valor da diária
                      <Input
                        inputMode="decimal"
                        value={form.valor_diaria}
                        onChange={(event) =>
                          handleInputChange('valor_diaria', formatCurrencyInput(event.target.value))
                        }
                        placeholder="0,00"
                      />
                    </Field>
                  </FormGrid>

                  <Field>
                    Observações
                    <TextArea
                      value={form.observacoes}
                      onChange={(event) => handleInputChange('observacoes', event.target.value)}
                      placeholder="Adicione informações adicionais sobre o pet ou estadia"
                    />
                  </Field>

                  <ToggleRow>
                    <ToggleLabel>Status de pagamento</ToggleLabel>
                    <Toggle>
                      <ToggleInput
                        type="checkbox"
                        checked={form.pago}
                        onChange={(event) => handleInputChange('pago', event.target.checked)}
                      />
                      <ToggleSlider />
                    </Toggle>
                  </ToggleRow>

                  <ActionsRow>
                    <GhostButton type="button" onClick={handleClose}>
                      Cancelar
                    </GhostButton>
                    <PrimaryButton type="button" onClick={handleSave} disabled={isSaving}>
                      {isSaving ? 'Salvando...' : 'Salvar alterações'}
                    </PrimaryButton>
                  </ActionsRow>
                </SectionCard>
              )}

              {activeTab === 'delete' && (
                <DeleteCard>
                  <DeleteTitle>
                    <FiAlertTriangle style={{ marginRight: '0.6rem' }} />
                    Deseja remover esta estadia?
                  </DeleteTitle>
                  <DeleteText>
                    Esta ação não pode ser desfeita. {stay.pet.nome} deixará de aparecer nas listas
                    e calendários, e o histórico será permanentemente removido.
                  </DeleteText>

                  <DeleteActions>
                    {!confirmDelete ? (
                      <>
                        <OutlineButton type="button" onClick={() => setActiveTab('edit')}>
                          Voltar para edição
                        </OutlineButton>
                        <DangerButton type="button" onClick={() => setConfirmDelete(true)}>
                          Excluir estadia
                        </DangerButton>
                      </>
                    ) : (
                      <>
                        <OutlineButton type="button" onClick={() => setConfirmDelete(false)}>
                          Manter estadia
                        </OutlineButton>
                        <DangerButton type="button" onClick={handleDelete} disabled={isDeleting}>
                          {isDeleting ? 'Excluindo...' : 'Confirmar exclusão'}
                        </DangerButton>
                      </>
                    )}
                  </DeleteActions>
                </DeleteCard>
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

const formatDate = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

const formatCurrencyInput = (value: string) => {
  if (!value) return ''
  let cleaned = value.replace(/[^\d,]/g, '')
  cleaned = cleaned.replace('.', ',')
  const parts = cleaned.split(',')

  if (parts.length > 2) {
    cleaned = `${parts[0]},${parts.slice(1).join('')}`
  }

  if (parts.length === 2 && parts[1].length > 2) {
    cleaned = `${parts[0]},${parts[1].slice(0, 2)}`
  }

  return cleaned
}

