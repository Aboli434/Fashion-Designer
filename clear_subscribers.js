const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.newsletterSubscriber.deleteMany({});
  console.log("Deleted all subscribers");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
