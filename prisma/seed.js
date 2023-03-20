import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    await prisma.tasks.create({
        data: {
            title: "Read emails",
            description: "read two emails today",
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
