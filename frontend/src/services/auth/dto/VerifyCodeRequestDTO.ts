import type { ForgotPasswordResponseDTO } from "./ForgotPasswordResponseDTO"

export type VerifyCodeRequestDTO = Pick<ForgotPasswordResponseDTO, 'user_id'> & {
  code: string
}