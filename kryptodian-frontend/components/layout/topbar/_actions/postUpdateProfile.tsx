"use server"

import { createGatewayClient } from "@/lib/data";
import { paths } from "@/src/schemas/api-schema"

export type TPostUpdateProfile = paths["/profile/{id}"]["patch"]["requestBody"]["content"]["application/json"];
export type TProfile = paths["/profile/{id}"]["patch"]["responses"]["201"]["content"]["application/json"];

export async function postUpdateProfile(id: string, payload: TPostUpdateProfile): Promise<TProfile> {
    const client = await createGatewayClient();
    const res = await client.PATCH("/profile/{id}", {
        params: {
            path: {
                id: id,
            }
        },
        body: payload,
    })
    return res.data!;
}