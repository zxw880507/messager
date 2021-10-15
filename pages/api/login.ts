import withSession from "../../lib/session";
import { prisma } from "../../lib/prisma";

export default withSession(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    if (user.password === password) {
      req.session.set("user", user);
      await req.session.save();
      res.status(200).json(user);
      return;
    }
    res.status(400).send({ error: "password is incorrect!" });
  } else {
    res.status(400).send({ error: "user not found!" });
  }
});
