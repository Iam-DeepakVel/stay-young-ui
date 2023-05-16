const data = {
  products: [
    {
      name: "Brightening Toner",
      subName: "Radiance Boosting Toner",
      slug: "radiance-boosting-toner",
      category: "Toner",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 25.99,
      discountedPrice: 20,
      countInStock: 15,
      description: "This toner is designed to brighten and even out skin tone.",
    },
    {
      name: "Hydrating Serum",
      subName: "Intense Moisture Serum",
      slug: "intense-moisture-serum",
      category: "Serum",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 35.99,
      discountedPrice: 14,
      countInStock: 10,
      description:
        "This serum is formulated to deeply hydrate and plump the skin.",
    },
    {
      name: "Cleansing Oil",
      subName: "Pore Clearing Oil",
      slug: "pore-clearing-oil",
      category: "Cleanser",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 18.99,
      discountedPrice: 13,
      countInStock: 18,
      description:
        "This cleansing oil is designed to remove impurities and unclog pores.",
    },
    {
      name: "Gentle Cleansing Milk",
      subName: "Hydrating Formula",
      slug: "gentle-cleansing-milk",
      category: "Cleanser",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 24.99,
      discountedPrice: 20,
      countInStock: 15,
      description:
        "This gentle cleansing milk is perfect for removing dirt and impurities while also keeping skin hydrated and soft.",
    },
    {
      name: "Foaming Face Wash",
      subName: "Deep Clean Formula",
      slug: "foaming-face-wash",
      category: "Cleanser",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 19.99,
      discountedPrice: 14,
      countInStock: 18,
      description:
        "This foaming face wash creates a rich lather that deeply cleanses the skin, leaving it feeling fresh and revitalized.",
    },
    {
      name: "Charcoal Cleanser",
      subName: "Purifying Formula",
      slug: "charcoal-cleanser",
      category: "Cleanser",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 29.99,
      discountedPrice: 20,
      countInStock: 10,
      description:
        "This charcoal cleanser draws out impurities and toxins from the skin, leaving it feeling deeply cleansed and purified.",
    },
    {
      name: "Oil Cleanser",
      subName: "Makeup Remover",
      slug: "oil-cleanser",
      category: "Cleanser",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 26.99,
      discountedPrice: 22,
      countInStock: 12,
      description:
        "This oil cleanser is perfect for removing makeup and impurities while also nourishing and hydrating the skin.",
    },
    {
      name: "Moisturizing Cream",
      subName: "Deep Moisture Cream",
      slug: "deep-moisture-cream",
      category: "Moisturizer",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 29.99,
      discountedPrice: 25,
      countInStock: 12,
      description:
        "This cream is formulated to provide long-lasting hydration and nourishment to the skin.",
    },
    {
      name: "Ultra Hydrating Cream",
      subName: "24 Hour Moisture",
      slug: "ultra-hydrating-cream",
      category: "Moisturizer",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 32.99,
      discountedPrice: 25,
      countInStock: 10,
      description:
        "This cream provides intense hydration for up to 24 hours, leaving skin soft and supple.",
    },
    {
      name: "SPF 30 Moisturizer",
      subName: "Protective Day Cream",
      slug: "protective-day-cream",
      category: "Moisturizer",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 26.99,
      discountedPrice: 20,
      countInStock: 12,
      description:
        "This moisturizer provides SPF 30 protection while also keeping skin hydrated and nourished.",
    },
    {
      name: "Gel Moisturizer",
      subName: "Lightweight Hydration",
      slug: "lightweight-gel-moisturizer",
      category: "Moisturizer",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 21.99,
      discountedPrice: 20,
      countInStock: 20,
      description:
        "This gel moisturizer is perfect for those who want a lightweight, non-greasy hydration solution.",
    },
    {
      name: "Night Cream",
      subName: "Revitalizing Overnight Moisturizer",
      slug: "revitalizing-overnight-moisturizer",
      category: "Moisturizer",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 38.99,
      discountedPrice: 33,
      countInStock: 8,
      description:
        "This night cream works while you sleep to deeply nourish and revitalize the skin.",
    },
    {
      name: "Acne Cleanser",
      subName: "Oil Control Cleanser",
      slug: "oil-control-cleanser",
      category: "Cleanser",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 22.99,
      discountedPrice: 18,
      countInStock: 20,
      description:
        "This cleanser is designed to control oil production and prevent acne breakouts.",
    },
    {
      name: "Vitamin C Serum",
      subName: "Brightening and Firming Serum",
      slug: "vitamin-c-serum",
      category: "Serum",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 44.99,
      discountedPrice: 35,
      countInStock: 8,
      description:
        "This serum is packed with Vitamin C to brighten and firm the skin.",
    },
    {
      name: "Rose Water Toner",
      subName: "Hydrating Formula",
      slug: "rose-water-toner",
      category: "Toner",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 18.99,
      discountedPrice: 15,
      countInStock: 0,
      description:
        "This rose water toner helps to hydrate and soothe the skin while also reducing the appearance of pores.",
    },
    {
      name: "Hyaluronic Acid Toner",
      subName: "Plumping Formula",
      slug: "hyaluronic-acid-toner",
      category: "Toner",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 32.99,
      discountedPrice: 20,
      countInStock: 25,
      description:
        "This hyaluronic acid toner helps to plump and hydrate the skin, reducing the appearance of fine lines and wrinkles.",
    },
    {
      name: "Glycolic Acid Toner",
      subName: "Exfoliating Formula",
      slug: "glycolic-acid-toner",
      category: "Toner",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 29.99,
      discountedPrice: 25,
      countInStock: 26,
      description:
        "This glycolic acid toner helps to exfoliate and brighten the skin, leaving it looking smoother and more radiant.",
    },
    {
      name: "Retinol Serum",
      subName: "Anti-Aging Formula",
      slug: "retinol-serum",
      category: "Serum",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 45.99,
      discountedPrice: 40,
      countInStock: 25,
      description:
        "This retinol serum helps to reduce the appearance of fine lines and wrinkles, leaving the skin looking more youthful and radiant.",
    },
    {
      name: "Niacinamide Serum",
      subName: "Clarifying Formula",
      slug: "niacinamide-serum",
      category: "Serum",
      images: [
        "/assets/images/p1.jpg",
        "/assets/images/p2.jpg",
        "/assets/images/p3.jpg",
      ],
      price: 28.99,
      discountedPrice: 22,
      countInStock: 20,
      description:
        "This niacinamide serum helps to clarify and brighten the skin, reducing the appearance of pores and blemishes.",
    },
  ],
};

export default data;
