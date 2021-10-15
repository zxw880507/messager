import withSession from "../../lib/session";
import { prisma } from "../../lib/prisma";

export default withSession(async (req, res) => {
  const user = req.session.get("user");

  if (user) {
    const verified = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (verified) {
      res.status(200).json(verified);
    } else {
      res.status(404).json({ error: "User does not exist!" });
    }
  } else {
    res.status(404).send(null);
  }
});
