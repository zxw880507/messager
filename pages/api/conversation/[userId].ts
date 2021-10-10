import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  conversation: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.userId as string;

  const conversation = await prisma.conversation.findMany();
  res.status(200).json({ conversation });
}
