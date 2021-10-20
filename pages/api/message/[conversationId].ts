import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type MessagesElement<T> = {
  id: T;
  sender: {
    id: T;
    email: T;
  };
  text: T;
};

export type Messages = Array<MessagesElement<string>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Messages | MessagesElement<string>>
) {
  const conversationId = req.query.conversationId as string;

  switch (req.method) {
    case "GET": {
      const messages = await prisma.message.findMany({
        where: {
          conversationId,
        },
        orderBy: {
          createdBy: "asc",
        },
        select: {
          id: true,
          sender: {
            select: {
              id: true,
              email: true,
            },
          },
          text: true,
        },
      });

      return res.status(200).json(messages);
    }

    case "POST": {
      const { text, senderId } = req.body;
      const message = await prisma.message.create({
        data: {
          senderId,
          conversationId,
          text,
        },
        select: {
          id: true,
          sender: {
            select: {
              id: true,
              email: true,
            },
          },
          text: true,
        },
      });

      return res.status(200).json(message);
    }

    default:
      return;
  }
}
