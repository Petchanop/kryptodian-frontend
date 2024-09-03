import { DefaultSession } from "next-auth";
import { paths } from "./src/schemas/api-schema";

type TMeGet = paths["/user/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

declare module "next-auth" {
  interface User {
    user?: TMeGet;
    accessToken: string;
  }

  interface Session extends DefaultSession {
    user: TMeGet;
    token: string;
  }
}
