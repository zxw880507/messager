import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const data = [...new Array(5)].map((el, index) => ({
    email: `test${index + 1}@msg.com`,
    password: "test",
  }));

  await prisma.user.createMany({
    data,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
