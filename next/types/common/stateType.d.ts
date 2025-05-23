import { apiUserBasicAuthResponseType } from "@/types/api/user/basicAuth/response";
export interface stateType {
  loginInfo: apiUserBasicAuthResponseType | null | false;
}
