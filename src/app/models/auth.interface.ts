import { IUser } from './user.interface';
import { FormControl } from "@angular/forms";

export interface ILoginDTO {
    email?: string;
    password?: string;
}
export interface ILoginDTOFormGroup {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}

export interface IRefreshTokenDTO {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse extends IUser{
  
}

export interface IChangeInfo{
  phoneNumber: string,
  fullName: string,
  email: string
}

export interface IChangeInfoFormGroup{
  phoneNumber: FormControl<string | null>,
  fullName: FormControl<string | null>,
  email: FormControl<string | null>
}

export interface IChangePassword{
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

export interface IChangePasswordFormGroup{
  oldPassword: FormControl<string | null>,
  newPassword: FormControl<string | null>,
  confirmPassword: FormControl<string | null>
}

export interface ILegacyTokenUser{
  nameid: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  bankName: string;
  iban: string;
  expireTime?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
}

export interface IForgotPassword{
  email: string,
}
export interface IForgotPasswordFormGroup{
  email: FormControl<string>,
}

export interface IResetPassword{
  code: string,
  newPassword:string,
  confirmPassword:string,
}

export interface IResetPasswordFormGroup{
  code: FormControl<string|null>,
  newPassword:FormControl<string>,
  confirmPassword:FormControl<string>,
}
