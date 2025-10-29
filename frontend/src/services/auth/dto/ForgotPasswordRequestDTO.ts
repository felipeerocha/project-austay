import type { SignInRequestDTO } from "./SignInResquestDTO";

export type ForgotPasswordRequestDTO = Omit<SignInRequestDTO, 'password'> 