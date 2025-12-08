import { ProductForm } from "@/components/product-form"
import { notFound } from "next/navigation"

// This is a simplified fetch. In a real app with DB, you'd fetch from DB directly here.
// Since we are using an API route that reads from a static file for now (or potentially DB),
// we can try to fetch from the API url, but better to import the logic if possible.
// Given the setup, I'll fetch from the LOCAL API URL which is common in Next.js apps,
// OR import the data directly if it's static.
// Assuming the user wants it to work "like a real app", I will try to fetch from the API endpoint
// or falling back to the static list if the API isn't running at build time (which might be an issue).
// SAFEST: Import the data directly since it's currently in lib/products.ts
// BUT if I implement the API to use a DB later, this will be stale.
// So I will use a fetch to the API.

// NOTE: in Server Components, we can't easily fetch our own API routes safely during build time if not handled carefully,
// but for dynamic pages it is fine.
import { products } from "@/lib/products"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Try to find in static list first (mocking DB fetch)
    const product = products.find((p) => p.id === id)

    if (!product) {
        notFound()
    }

    return <ProductForm initialData={product} isEditing />
}
