import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type Data = {
  conversation?: any[];
  error?: string;
  userId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.userId as string;

  const conversation = await prisma.conversation.findMany({
    where: {
      OR: [{ creatorId: userId }, { participantId: userId }],
    },
  });
  res.status(200).json({ conversation });
}
