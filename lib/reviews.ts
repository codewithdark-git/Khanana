export interface Review {
  id: string
  name: string
  rating: number
  text: string
  text: string
  date: string
  verified: boolean
  photo?: string
  location?: string
}

// Sample reviews - admin will manage these
export const reviews: Review[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    rating: 5,
    text: "Exceptional quality and authentic craftsmanship. The shawl arrived perfectly packaged and exceeded my expectations. A true piece of Pashtun heritage.",
    date: "2025-01-15",
    verified: true,
    location: "Peshawar",
  },
  {
    id: "2",
    name: "Fatima Khan",
    rating: 5,
    text: "Beautiful design and premium material. I've received many compliments on this shawl. The maroon color is absolutely stunning!",
    date: "2025-01-10",
    verified: true,
    location: "Islamabad",
  },
  {
    id: "3",
    name: "Muhammad Ali",
    rating: 5,
    text: "Great product with fast delivery. The color is exactly as shown in the pictures. Will definitely order again.",
    textUr: "بہترین مصنوعات فوری ترسیل کے ساتھ۔ رنگ بالکل ویسا ہی ہے جیسا تصویروں میں دکھایا گیا ہے۔",
    date: "2025-01-05",
    verified: true,
    location: "Lahore",
  },
  {
    id: "4",
    name: "Zainab Afridi",
    rating: 5,
    text: "The craftsmanship is impeccable. You can feel the quality and tradition in every thread. Highly recommended for anyone seeking authentic Pathan shawls.",
    textUr: "کاریگری بے مثال ہے۔ آپ ہر دھاگے میں معیار اور روایت محسوس کر سکتے ہیں۔",
    date: "2024-12-28",
    verified: true,
    location: "Quetta",
  },
  {
    id: "5",
    name: "Bilal Khan",
    rating: 4,
    text: "Wonderful shawl for winter. The wool is soft yet warm. Perfect for both casual and formal occasions.",
    textUr: "سردیوں کے لیے شاندار شال۔ اون نرم مگر گرم ہے۔",
    date: "2024-12-20",
    verified: true,
    location: "Karachi",
  },
]
