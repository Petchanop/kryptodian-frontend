import { getServerSession } from 'next-auth';
import createClient, { Client } from 'openapi-fetch';
import { paths } from '@/schemas/api-schema';
import { authOptions } from '@/lib/auth/authOptions';

/**
 * createGatewayClient()
 * @returns an openapi-fetch client for using with the kryptodian wallet API
 */
export async function createGatewayClient(): Promise<Client<paths, `${string}/${string}`>> {
  const session = await getServerSession(authOptions);
  const authToken: string | undefined = await session?.token;
  const client = createClient<paths>({
    baseUrl: process.env.BACKEND_URL,
    headers: {
      Authorization: `Bearer ${authToken}` ?? undefined,
    }
  });
  return client;
}
