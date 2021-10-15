import withSession from "../../lib/session";
import { prisma } from "../../lib/prisma";

export default withSession(async (req, res) => {
  const { email, password, repassword } = req.body;
  if (password !== repassword) {
    res.status(500).send({ errorMessage: "Password did not match" });
    return;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res
      .status(500)
      .send({ errorMessage: "This email has already registered!" });
    return;
  }

  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  req.session.set("user", user);
  await req.session.save();
  res.status(200).json(user);
});
