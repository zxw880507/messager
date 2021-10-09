import { Password } from "@mui/icons-material";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  await prisma.user.create({
    data: {
      email: "test1@messager.com",
      password: "test",
    },
  });
  // ... you will write your Prisma Client queries here
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
