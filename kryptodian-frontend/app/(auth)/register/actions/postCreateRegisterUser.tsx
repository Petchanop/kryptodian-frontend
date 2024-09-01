"use server"

import { createGatewayClient } from "@/lib/data";
import { paths } from "@/src/schemas/api-schema";
import { TSVaction } from "@/src/schemas/server-action";

export type TUserPostIn = paths["/auth/register"]["post"]["requestBody"]["content"]["application/json"];
export type TUserPostInResponse = paths["/auth/register"]["post"]["responses"]["201"]["content"]["application/json"]
export type ResponseStatus = {
    statusCode: number;
    message: string;
}

export async function registerAction(payload: TUserPostIn): Promise<TSVaction<TUserPostInResponse | ResponseStatus>> {
    const client = await createGatewayClient();
    const { data, error } = await client.POST(
        "/auth/register",
        { body: payload }
    )

    if (error) {
        return {
            data: null,
            error: error,
        }
    }
    return {
        data: data,
        error: null,
    }
}