import { ApiResponse } from '../interfaces/response/ApiResponse';
import { User } from '../interfaces/user/User';
import { AxiosService } from '../AxiosService';

export class AuthService {
  public static async login(obj: User): Promise<ApiResponse> {
    return (await AxiosService.post('/auth/login', obj)).data;
  }
}
