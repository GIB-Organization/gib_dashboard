import { IUser } from "../../models";

export interface IUsersStore{
  users: IUser[],
  usersCount: number,
  isProcessing?:boolean,
  user?: IUser,
  isExporting:boolean
}