import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|home|examples/*|signup|login|forget-password|activate-user|change-password|document/*/view).*)',
  ],
};
