import { PrismaClient } from '@prisma/client'
import { products } from '../lib/products'
import { reviews } from '../lib/reviews'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    // Seed Products
    for (const product of products) {
        const existingProduct = await prisma.product.findFirst({
            where: { name: product.name }
        })

        if (!existingProduct) {
            await prisma.product.create({
                data: {
                    // Ensure we don't accidentally use the ID from the file if we want CUIDs, 
                    // but for consistency with existing URLs/SEO, we might want to keep IDs if they are sludge-like.
                    // However, schema uses CUID. Let's map properties carefully.
                    // If ids in lib/products.ts are slugs (e.g. "jet-black"), we should probably change schema to support that or let Prisma generate IDs.
                    // The current lib/products.ts uses slugs like 'jet-black'. 
                    // Let's force the ID to match if possible, or just let Prisma generate new ones and we'll have to adapt.
                    // Actually, for a migration, it's better to keep the ID if possible.
                    // Prisma CUID is a string, so we can pass our string IDs.
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    originalPrice: product.originalPrice,
                    discountedPrice: product.discountedPrice,
                    discountPercentage: product.discountPercentage,
                    image: product.image,
                    imageAlt: product.imageAlt,
                    style: product.style,
                    tiktokUrl: product.tiktokUrl,
                    featured: product.featured,
                }
            })
            console.log(`Created product: ${product.name}`)
        }
    }

    // Seed Reviews
    for (const review of reviews) {
        const existingReview = await prisma.review.findFirst({
            where: {
                name: review.name,
                text: review.text
            }
        })

        if (!existingReview) {
            await prisma.review.create({
                data: {
                    id: review.id,
                    name: review.name,
                    rating: review.rating,
                    text: review.text,
                    date: new Date(review.date),
                    verified: review.verified,
                    photo: review.photo,
                    location: review.location,
                }
            })
            console.log(`Created review from: ${review.name}`)
        }
    }

    console.log('Seeding finished.')
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
