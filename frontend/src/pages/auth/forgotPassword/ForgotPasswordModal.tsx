import CloseIcon from '@mui/icons-material/Close';
import * as S from './ForgotPasswordModal.styles';
import forgotPassword from '../../../assets/forgotPassword.svg';
import { useForgotPasswordForm } from './hooks/useForgotPasswordForm';

type ForgotPasswordModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ForgotPasswordModal({
  open,
  onClose,
}: ForgotPasswordModalProps) {
  const {
    step,
    loading,
    form,
    otpDigits,
    handleClose,
    handleSendEmail,
    handleVerifyCode,
    handleResetPassword,
    handleOtpChange,
  } = useForgotPasswordForm({ onClose });

  const {
    register,
    formState: { errors },
  } = form;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <S.Title>Redefinir senha</S.Title>
            <S.Subtitle>
              Digite o seu e-mail para receber um código de verificação.
            </S.Subtitle>
            <S.Illustration src={forgotPassword} alt="Redefinir senha" />
            <S.StyledTextField
              label="E-mail"
              fullWidth
              disabled={loading}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <S.ActionsContainer>
              <S.TextButton onClick={handleClose} disabled={loading}>
                Cancelar
              </S.TextButton>
              <S.PrimaryButton onClick={handleSendEmail} disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </S.PrimaryButton>
            </S.ActionsContainer>
          </>
        );
      case 2:
        return (
          <>
            <S.Title>Código de verificação</S.Title>
            <S.Subtitle>
              Digite o código de 6 dígitos enviado para seu e-mail.
            </S.Subtitle>
            <S.Illustration src={forgotPassword} alt="Código de verificação" />
            <S.OtpContainer>
              {otpDigits.map((data, index) => (
                <S.OtpInput
                  key={index}
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleOtpChange(e, index)}
                  disabled={loading}
                />
              ))}
            </S.OtpContainer>
            {errors.otp && (
              <S.ErrorMessage>{errors.otp.message}</S.ErrorMessage>
            )}
            <S.ActionsContainer>
              <S.TextButton onClick={handleClose} disabled={loading}>
                Cancelar
              </S.TextButton>
              <S.PrimaryButton onClick={handleVerifyCode} disabled={loading}>
                {loading ? 'Validando...' : 'Validar'}
              </S.PrimaryButton>
            </S.ActionsContainer>
          </>
        );
      case 3:
        return (
          <>
            <S.Title>Criar nova senha</S.Title>
            <S.Subtitle>
              Defina uma nova senha para acessar sua conta.
            </S.Subtitle>
            <S.StyledTextField
              label="Nova Senha"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              disabled={loading}
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
            <S.StyledTextField
              label="Confirmar Senha"
              type="password"
              fullWidth
              disabled={loading}
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <S.ActionsContainer>
              <S.TextButton onClick={handleClose} disabled={loading}>
                Cancelar
              </S.TextButton>
              <S.PrimaryButton
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Confirmar'}
              </S.PrimaryButton>
            </S.ActionsContainer>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <S.ModalContainer open={open} onClose={handleClose}>
      <S.ModalHeader>
        <h2>Esqueceu a senha?</h2>
        <S.CloseButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </S.CloseButton>
      </S.ModalHeader>
      <S.ModalWrapper>{renderStep()}</S.ModalWrapper>
    </S.ModalContainer>
  );
}