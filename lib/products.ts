export interface Product {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  image: string
  imageAlt: string
  style: string
  tiktokUrl?: string
  featured: boolean
}

export const products: Product[] = [
  {
    id: "jet-black",
    name: "Pathan Jet Black",
    nameAr: "باتھان جیٹ بلیک",
    description:
      "Premium handwoven Pathan shawl in deep jet black. Features intricate fringes and authentic Pashtun craftsmanship.",
    descriptionAr: "پریمیم ہاتھ سے بنی پاتھان شال گہری جیٹ بلیک میں۔ پیچیدہ فرنجز اور اصل پشتون کاریگری کی خصوصیات۔",
    originalPrice: 8550,
    discountedPrice: 5985,
    discountPercentage: 30,
    image: "/black-pathan-shawl-elegant-box.jpg",
    imageAlt: "Jet Black Pathan Shawl",
    style: "Jet Black",
    featured: true,
  },
  {
    id: "classic-wool",
    name: "Pathan Classic Wool",
    nameAr: "پاتھان کلاسک اون",
    description:
      "Timeless classic wool shawl draped in traditional style. Perfect for formal occasions and everyday elegance.",
    descriptionAr: "بے وقت کلاسک اون کی شال روایتی انداز میں۔ رسمی مواقع اور روزمرہ کی شان و شوکت کے لیے بہترین۔",
    originalPrice: 7000,
    discountedPrice: 4900,
    discountPercentage: 30,
    image: "/man-in-blue-attire-with-black-pathan-shawl-draped.jpg",
    imageAlt: "Classic Wool Pathan Shawl",
    style: "Classic Wool",
    featured: true,
  },
  {
    id: "fringed-soft",
    name: "Pathan Fringed Soft",
    nameAr: "پاتھان فرنجڈ سافٹ",
    description:
      "Luxuriously soft fringed shawl with delicate craftsmanship. Ideal for those seeking comfort and style.",
    descriptionAr: "شاندار نرم فرنجڈ شال نازک کاریگری کے ساتھ۔ آرام اور انداز کی تلاش میں ان کے لیے موزوں۔",
    originalPrice: 4999,
    discountedPrice: 2500,
    discountPercentage: 50,
    image: "/man-in-white-fringed-pathan-shawl-seated.jpg",
    imageAlt: "Fringed Soft Pathan Shawl",
    style: "Fringed",
    featured: true,
  },
  {
    id: "heritage-gray",
    name: "Pathan Heritage Gray",
    nameAr: "پاتھان ہیریٹیج گرے",
    description:
      "Distinguished gray shawl with subtle patterns honoring Pashtun heritage. A versatile piece for any wardrobe.",
    descriptionAr: "نمایاں گرے شال ہلکے نمونوں کے ساتھ پشتون ورثے کو سلام۔ کسی بھی وارڈروب کے لیے ایک ورسٹائل ٹکڑا۔",
    originalPrice: 6500,
    discountedPrice: 4550,
    discountPercentage: 30,
    image: "/man-in-gray-pathan-shawl-with-subtle-patterns.jpg",
    imageAlt: "Heritage Gray Pathan Shawl",
    style: "Heritage Gray",
    featured: false,
  },
  {
    id: "brown-earth",
    name: "Pathan Brown Earth",
    nameAr: "پاتھان براؤن ارتھ",
    description:
      "Earthy brown tones reflecting the mountains of Khyber Pakhtunkhwa. Warm and inviting for all seasons.",
    descriptionAr:
      "خیبر پختونخوا کے پہاڑوں کو ظاہر کرتے ہوئے زمینی براؤن رنگ۔ تمام موسموں کے لیے گرم اور دعوت دینے والا۔",
    originalPrice: 7200,
    discountedPrice: 5040,
    discountPercentage: 30,
    image: "/brown-earth-tone-pathan-shawl-traditional.jpg",
    imageAlt: "Brown Earth Pathan Shawl",
    style: "Brown Earth",
    featured: false,
  },
  {
    id: "navy-wool",
    name: "Pathan Navy Wool",
    nameAr: "پاتھان نیوی اون",
    description: "Deep navy wool shawl combining sophistication with traditional craftsmanship. A modern classic.",
    descriptionAr: "گہری نیوی اون کی شال نفاست کو روایتی کاریگری کے ساتھ ملاتی ہے۔ ایک جدید کلاسک۔",
    originalPrice: 7500,
    discountedPrice: 5250,
    discountPercentage: 30,
    image: "/navy-wool-pathan-shawl-sophisticated.jpg",
    imageAlt: "Navy Wool Pathan Shawl",
    style: "Navy Wool",
    featured: false,
  },
  {
    id: "camel-fringe",
    name: "Pathan Camel Fringe",
    nameAr: "پاتھان اونٹ فرنج",
    description: "Warm camel tones with elegant fringe detailing. Perfect for layering and making a statement.",
    descriptionAr: "گرم اونٹ کے رنگ خوبصورت فرنج کی تفصیل کے ساتھ۔ تہہ کاری اور بیان دینے کے لیے بہترین۔",
    originalPrice: 6800,
    discountedPrice: 4760,
    discountPercentage: 30,
    image: "/camel-tone-pathan-shawl-with-fringe.jpg",
    imageAlt: "Camel Fringe Pathan Shawl",
    style: "Camel Fringe",
    featured: false,
  },
  {
    id: "charcoal-luxe",
    name: "Pathan Charcoal Luxe",
    nameAr: "پاتھان چارکول لکس",
    description:
      "Luxurious charcoal shawl with premium wool blend. The ultimate expression of refined Pashtun elegance.",
    descriptionAr: "پریمیم اون کے مرکب کے ساتھ شاندار چارکول شال۔ پشتون نفاست کا حتمی اظہار۔",
    originalPrice: 9200,
    discountedPrice: 6440,
    discountPercentage: 30,
    image: "/charcoal-luxury-pathan-shawl-premium.jpg",
    imageAlt: "Charcoal Luxe Pathan Shawl",
    style: "Charcoal Luxe",
    featured: true,
  },
]
