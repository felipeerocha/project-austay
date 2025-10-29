import type { ForgotPasswordResponseDTO } from "./ForgotPasswordResponseDTO";

export type VerifyCodeResponseDTO = Pick<ForgotPasswordResponseDTO, 'successMessage'> 