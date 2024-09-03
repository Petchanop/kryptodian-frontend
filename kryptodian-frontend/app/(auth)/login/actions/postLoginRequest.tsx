"use server"

import { createGatewayClient } from "@/lib/data";
import { paths } from "@/src/schemas/api-schema";
import { TSVaction } from "@/src/schemas/server-action";

export type TUserPostLogIn = paths["/auth/signin"]["post"]["requestBody"]["content"]["application/json"];
export type TUserPostLogInResponse = paths["/auth/signin"]["post"]["responses"]["201"]["content"]["application/json"]
export type ResponseStatus = {
    statusCode: number;
    message: string;
}

export async function loginAction(payload: TUserPostLogIn): Promise<TSVaction<TUserPostLogInResponse>> {
    const client = await createGatewayClient();
    const { data, error } = await client.POST(
        "/auth/signin",
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