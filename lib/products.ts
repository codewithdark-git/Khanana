export interface Product {
  id: string
  name: string
  description: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  images: string[]
  imageAlt: string
  style: string
  category: "shawl" | "cloth" | "chappal"
  tiktokUrl?: string
  featured: boolean
}

export const products: Product[] = [
  {
    id: "jet-black",
    name: "Pathan Jet Black",
    description:
      "Premium handwoven Pathan shawl in deep jet black. Features intricate fringes and authentic Pashtun craftsmanship.",
    originalPrice: 8550,
    discountedPrice: 5985,
    discountPercentage: 30,
    images: ["/black-pathan-shawl-elegant-box.jpg"],
    imageAlt: "Jet Black Pathan Shawl",
    style: "Jet Black",
    category: "shawl",
    featured: true,
  },
  {
    id: "classic-wool",
    name: "Pathan Classic Wool",
    description:
      "Timeless classic wool shawl draped in traditional style. Perfect for formal occasions and everyday elegance.",
    originalPrice: 7000,
    discountedPrice: 4900,
    discountPercentage: 30,
    images: ["/man-in-blue-attire-with-black-pathan-shawl-draped.jpg"],
    imageAlt: "Classic Wool Pathan Shawl",
    style: "Classic Wool",
    category: "shawl",
    featured: true,
  },
  {
    id: "fringed-soft",
    name: "Pathan Fringed Soft",
    description:
      "Luxuriously soft fringed shawl with delicate craftsmanship. Ideal for those seeking comfort and style.",
    originalPrice: 4999,
    discountedPrice: 2500,
    discountPercentage: 50,
    images: ["/man-in-white-fringed-pathan-shawl-seated.jpg"],
    imageAlt: "Fringed Soft Pathan Shawl",
    style: "Fringed",
    category: "shawl",
    featured: true,
  },
  {
    id: "heritage-gray",
    name: "Pathan Heritage Gray",
    description:
      "Distinguished gray shawl with subtle patterns honoring Pashtun heritage. A versatile piece for any wardrobe.",
    originalPrice: 6500,
    discountedPrice: 4550,
    discountPercentage: 30,
    images: ["/man-in-gray-pathan-shawl-with-subtle-patterns.jpg"],
    imageAlt: "Heritage Gray Pathan Shawl",
    style: "Heritage Gray",
    category: "shawl",
    featured: false,
  },
  {
    id: "brown-earth",
    name: "Pathan Brown Earth",
    description:
      "Earthy brown tones reflecting the mountains of Khyber Pakhtunkhwa. Warm and inviting for all seasons.",
    originalPrice: 7200,
    discountedPrice: 5040,
    discountPercentage: 30,
    images: ["/brown-earth-tone-pathan-shawl-traditional.jpg"],
    imageAlt: "Brown Earth Pathan Shawl",
    style: "Brown Earth",
    category: "shawl",
    featured: false,
  },
  {
    id: "navy-wool",
    name: "Pathan Navy Wool",
    description: "Deep navy wool shawl combining sophistication with traditional craftsmanship. A modern classic.",
    originalPrice: 7500,
    discountedPrice: 5250,
    discountPercentage: 30,
    images: ["/navy-wool-pathan-shawl-sophisticated.jpg"],
    imageAlt: "Navy Wool Pathan Shawl",
    style: "Navy Wool",
    category: "shawl",
    featured: false,
  },
  {
    id: "camel-fringe",
    name: "Pathan Camel Fringe",
    description: "Warm camel tones with elegant fringe detailing. Perfect for layering and making a statement.",
    originalPrice: 6800,
    discountedPrice: 4760,
    discountPercentage: 30,
    images: ["/camel-tone-pathan-shawl-with-fringe.jpg"],
    imageAlt: "Camel Fringe Pathan Shawl",
    style: "Camel Fringe",
    category: "shawl",
    featured: false,
  },
  {
    id: "charcoal-luxe",
    name: "Pathan Charcoal Luxe",
    description:
      "Luxurious charcoal shawl with premium wool blend. The ultimate expression of refined Pashtun elegance.",
    originalPrice: 9200,
    discountedPrice: 6440,
    discountPercentage: 30,
    images: ["/charcoal-luxury-pathan-shawl-premium.jpg"],
    imageAlt: "Charcoal Luxe Pathan Shawl",
    style: "Charcoal Luxe",
    category: "shawl",
    featured: true,
  },
  {
    id: "khaddar-premium",
    name: "Premium Khaddar Suiting",
    description:
      "Finest handwoven khaddar fabric from Khyber Pakhtunkhwa. Perfect unstitched suiting for traditional and modern wear.",
    originalPrice: 5500,
    discountedPrice: 3850,
    discountPercentage: 30,
    images: [],
    imageAlt: "Premium Khaddar Suiting Cloth",
    style: "Khaddar",
    category: "cloth",
    featured: true,
  },
  {
    id: "cotton-blend-suiting",
    name: "Traditional Cotton Blend",
    description:
      "Soft cotton blend unstitched fabric with a traditional weave. Ideal for everyday shalwar kameez in all seasons.",
    originalPrice: 3800,
    discountedPrice: 2660,
    discountPercentage: 30,
    images: [],
    imageAlt: "Traditional Cotton Blend Fabric",
    style: "Cotton Blend",
    category: "cloth",
    featured: false,
  },
  {
    id: "peshawari-classic",
    name: "Peshawari Classic Chappal",
    description:
      "Iconic Peshawari chappal handcrafted from genuine leather. Lightweight, durable, and timelessly stylish.",
    originalPrice: 4500,
    discountedPrice: 3150,
    discountPercentage: 30,
    images: [],
    imageAlt: "Classic Peshawari Chappal",
    style: "Peshawari Classic",
    category: "chappal",
    featured: true,
  },
  {
    id: "norozi-chappal",
    name: "Norozi Chappal",
    description:
      "Traditional Norozi chappal with intricate leather work and brass details. A symbol of Pashtun heritage and pride.",
    originalPrice: 5200,
    discountedPrice: 3640,
    discountPercentage: 30,
    images: [],
    imageAlt: "Norozi Chappal Traditional",
    style: "Norozi",
    category: "chappal",
    featured: false,
  },
]
