import eggsImage from "../assets/images/eggs images.jpg";

const products = [
  {
    id: 1,
    slug: "large-eggs",
    name: "Large Eggs",
    category: "Large",
    quantityPerTray: 30,
    size: "30 Tray",
    price: 70,
    image: eggsImage,
    description:
      "Fresh large eggs collected daily from trusted local farms. Ideal for households, restaurants, bakeries, and everyday cooking.",
    featured: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Extra Large Eggs",
    slug: "Jumbo Eggs",
    category: "Jumbo",
    quantityPerTray: 30,
    size: "30 Tray",
    price: 80,
    image: eggsImage,
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
    price: 60,
    image: eggsImage,
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
    price: 45,
    image: eggsImage,
    description:
      "A convenient half tray of fresh eggs, perfect for smaller households or quick weekly shopping.",
    featured: true,
    inStock: false,
  },
];

export default products;