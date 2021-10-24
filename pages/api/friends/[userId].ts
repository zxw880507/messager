import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

interface DataElement {
  id: string;
  friend: {
    id: string;
    email: string;
  };
}

export type Data = Array<DataElement>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.query.userId as string;

  const friends = await prisma.friends
    .findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      select: {
        id: true,
        user1: {
          select: {
            id: true,
            email: true,
          },
        },
        user2: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    })
    .then((data) =>
      data.reduce((acc, el) => {
        const { id, user1, user2 } = el;
        let selected!: DataElement;
        switch (userId) {
          case user1.id:
            selected = { id, friend: user2 };
            break;
          case user2.id:
            selected = { id, friend: user1 };
            break;
          default:
            break;
        }
        return [...acc, selected];
      }, [] as Data)
    );

  res.status(200).json(friends);
}
