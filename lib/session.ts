// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";

// optionally add stronger typing for next-specific implementation
export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse
) => void | Promise<void>;

const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, {
    password:
      process.env.SECRET_COOKIE_PASSWORD ||
      "complex_password_at_least_32_characters_long",
    cookieName: "msg_user",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  });

export default withSession;
