import * as dotenv from 'dotenv';
dotenv.config();
import { requestOptions, fetchRequest } from './fetchRequest';
const corsAnywhere = process.env.PUBLIC_CORS;

export async function proxy<ProxyResult>(
  url: string,
  options: requestOptions = {}
): Promise<ProxyResult> {
  return await fetchRequest(`${corsAnywhere}/${url}`, {
    ...options,
  });
}

export default proxy;
