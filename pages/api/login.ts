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
    res.status(500).send({ errorMessage: "Password is incorrect!" });
  } else {
    res.status(500).send({ errorMessage: "User is not found!" });
  }
});
