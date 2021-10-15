import withSession from "../../lib/session";
import { prisma } from "../../lib/prisma";

export default withSession((req, res) => {
  const { email, password, repassword } = req.body;
  if (password !== repassword) {
    res.status(404).send({ error: "password did not match" });
    return;
  }
  prisma.user
    .create({
      data: {
        email,
        password,
      },
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => console.log("this is err"));
});
