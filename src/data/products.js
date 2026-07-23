const products = [
  {
    id: 1,
    slug: "large-eggs",
    name: "Large Eggs",
    category: "Large",
    quantityPerTray: 30,
    size: "30 Tray",
    price: 95,
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600",
    description:
      "Fresh large eggs collected daily from trusted local farms. Ideal for households, restaurants, bakeries, and everyday cooking.",
    featured: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Jumbo Eggs",
    slug: "Jumbo Eggs",
    category: "Jumbo",
    quantityPerTray: 30,
    size: "30 Tray",
    price: 110,
    image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=600",
    description:
      "Premium jumbo eggs with rich flavour and excellent quality. Perfect for families, catering, and baking.",
    featured: true,
    inStock: true,
  },
  {
    id: 3,
    slug: "medium-eggs",
    name: "Medium Eggs",
    category: "Medium",
    quantityPerTray: 30,
    size: "30 Tray",
    price: 85,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600",
    description:
      "Affordable medium-sized farm eggs, freshly collected and carefully packed for daily use.",
    featured: true,
    inStock: false,
  },
  {
    id: 4,
    slug: "half-tray",
    name: "Half Tray",
    category: "Half Tray",
    quantityPerTray: 15,
    size: "15 Eggs",
    price: 50,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600",
    description:
      "A convenient half tray of fresh eggs, perfect for smaller households or quick weekly shopping.",
    featured: true,
    inStock: false,
  },
];

export default products;