import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Setting category for all existing products...')

    const result = await prisma.product.updateMany({
        where: {
            category: { not: 'shawl' },
        },
        data: {
            category: 'shawl',
        },
    })

    console.log(`Updated ${result.count} products to category: "shawl"`)

    // Also update any products that might have null/empty category (shouldn't happen with default, but just in case)
    const result2 = await prisma.product.updateMany({
        data: {
            category: 'shawl',
        },
    })

    console.log(`Verified all ${result2.count} products have category: "shawl"`)
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
