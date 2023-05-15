import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const l = ['monthly', 'annual'];

  for (const month of l) {
    const type = await prisma.expenseType.create({
      data: {
        name: month
      }
    });
    console.log(type);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
