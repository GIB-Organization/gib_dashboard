import { FormControl } from "@angular/forms";
import { IRefreshTokenDTO } from "./auth.interface";

export interface IUser {
    id?: string,
    fullName?: string,
    email?: string,
    createdDate?: string,
    token?:IRefreshTokenDTO,
    phoneNumber?:string,
}

export interface IUserFormGroup{
    fullName: FormControl<string | null>;
    email: FormControl<string | null>;
}