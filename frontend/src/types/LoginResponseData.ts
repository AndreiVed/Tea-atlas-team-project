import { UserInfo } from "./UserInfo";

export type LoginResponseData = {
  access: string,
  refresh: string,
  user: UserInfo,
}