import { DefaultSession } from "next-auth";
import { paths } from "./schemas/api-schema";

type TGetAuthen = paths["/api/auth/profile"]["get"]["responses"]["200"]["content"]["application/json"];

declare module "next-auth" {
  interface User {
    profile?: TGetAuthen;
    token: string;
  }

  interface Session extends DefaultSession {
    user: TGetAuthen;
    token: string;
  }
}
