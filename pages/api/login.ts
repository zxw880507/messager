import { withIronSession, Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";

type NextIronRequest = NextApiRequest & { session: Session };

async function handler(
  req: NextIronRequest,
  res: NextApiResponse
): Promise<void> {
  req.session.set("user", {});
  await req.session.save();
  res.redirect("/");
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "msg_user",
  cookieOptions: {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  },
});
