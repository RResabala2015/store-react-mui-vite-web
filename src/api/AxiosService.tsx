import axios from 'axios';
import { environment } from '../environments/environment';

export class AxiosService {
  static baseUrl = environment.VITE_APP_API_URL;

  public static post(path: string, obj: any): Promise<any> {
    return axios.post(this.baseUrl + path, obj);
  }
}
