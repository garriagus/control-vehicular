import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
<<<<<<< HEAD
        name: 'Ali',
        email: 'alaice@prisma.io',
        password: 'password',
=======
        name: 'Alice',
        email: 'alice@prisma.io',
        password: '123456',
>>>>>>> 2e9fe492cb73921ca0874cbb0f9736838acb8c26

    },
    {
        name: 'Ni',
        email: 'nailu@prisma.io',

    },
    {
        name: 'Mahmo',
        email: 'mahmaoud@prisma.io',

    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })