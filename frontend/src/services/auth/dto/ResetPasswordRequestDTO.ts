import type { ForgotPasswordResponseDTO } from "./ForgotPasswordResponseDTO"

export type ResetPasswordRequestDTO = Pick<ForgotPasswordResponseDTO, 'user_id'> & {
  token: string,
  new_password: string
}