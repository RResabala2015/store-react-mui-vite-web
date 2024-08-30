import { ApiResponse } from "../interfaces/response/ApiResponse";
import { User } from "../interfaces/user/User";
import { TransporteService } from "../TransporteService";

export class AuthService{

   public static async login(obj:User):Promise<ApiResponse>{
      return (await TransporteService.post('/auth/login', obj)).data
   }
}