import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type DataElement = { id: string; user: { id: string; email: string } };
export type Data = Array<DataElement>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.userId as string;

  const conversation = await prisma.conversation
    .findMany({
      where: {
        OR: [{ creatorId: userId }, { participantId: userId }],
      },
      select: {
        id: true,
        creator: {
          select: {
            id: true,
            email: true,
          },
        },
        participant: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })
    .then((data) =>
      data.reduce((init, el) => {
        const { id, creator, participant } = el;
        let newEl!: DataElement;
        if (creator.id === userId) {
          newEl = { id, user: participant };
        }
        if (participant.id === userId) {
          newEl = { id, user: creator };
        }
        init.push(newEl);
        return init;
      }, [] as Data)
    );
  res.status(200).json(conversation);
}
