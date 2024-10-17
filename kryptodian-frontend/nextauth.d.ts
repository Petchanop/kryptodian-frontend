import { DefaultSession } from "next-auth";
import { paths } from "./src/schemas/api-schema";

type TMeGet = paths["/auth/signin"]["post"]["responses"]["201"]["content"]["application/json"];

declare module "next-auth" {
  interface User {
    user?: TMeGet;
    token: string;
  }

  interface Session extends DefaultSession {
    user: TMeGet;
    token: string;
  }
}
