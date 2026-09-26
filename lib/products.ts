import type { Product, Review } from "./types";

/**
 * All LUMI products are fictional and created for this portfolio demo.
 * No real brand, formulation or clinical claim is represented here.
 */

const r = (
  id: string,
  author: string,
  rating: number,
  title: string,
  body: string,
  date: string,
  skinType: string
): Review => ({ id, author, rating, title, body, date, skinType, verified: true });

export const products: Product[] = [
  {
    id: "lumi-01",
    slug: "daily-glow-cleanser",
    name: "LUMI Daily Glow Cleanser",
    subtitle: "Amino acid gel cleanser",
    price: 34,
    compareAtPrice: 42,
    category: "Cleansers",
    concerns: ["texture", "sensitive", "oil-control"],
    skinTypes: ["All skin types", "Sensitive", "Combination"],
    size: "150 ml / 5.07 fl oz",
    shortDescription:
      "A low-foam, pH-balanced gel that lifts the day away without taking your comfort with it.",
    description:
      "A soft, cushioned gel cleanser built around a trio of amino acid surfactants. It removes sunscreen, makeup and daily buildup while respecting the delicate acid mantle. Skin is left fresh — never tight, never squeaky.",
    story:
      "The first step of every LUMI ritual. We wanted a cleanser that could be used twice a day, by people who wear makeup and people who do not, without a second product in the bathroom. It took eleven formula revisions to land on this one.",
    ingredients: [
      { name: "Coco-glucoside", benefit: "A gentle sugar-based cleanser that removes buildup without stripping." },
      { name: "Betaine", benefit: "Natural osmolyte that helps skin hold onto moisture while cleansing." },
      { name: "Panthenol", benefit: "Calms and supports a comfortable, non-stripped finish." },
      { name: "White water lily extract", benefit: "A soft botanical soother for reactive skin." },
    ],
    howToUse: [
      "Massage a small amount onto damp skin for 30 seconds.",
      "Rinse with lukewarm water and pat dry.",
      "Use morning and evening. Follow with essence or serum.",
    ],
    rating: 4.8,
    reviewCount: 412,
    stock: 42,
    inStock: true,
    isBestseller: true,
    isNew: false,
    shape: "tube",
    tones: ["#e6ddd2", "#cfc0ae"],
    reviews: [
      r("d1", "Aria N.", 5, "The only cleanser I can use twice a day", "My cheeks used to feel tight after washing. Two weeks in with LUMI and the tightness is gone entirely. It removes my SPF properly too.", "2026-07-14", "Dry / sensitive"),
      r("d2", "Priya S.", 5, "Gentle but effective", "It takes off a full day of makeup without dragging. The gel texture feels cool and calming in the evening.", "2026-08-02", "Combination"),
      r("d3", "Dana K.", 4, "Lovely, wish the tube were bigger", "No stinging at all and the scent is very subtle. Only note is that I go through the tube quite quickly.", "2026-06-21", "Normal"),
    ],
  },
  {
    id: "lumi-02",
    slug: "hydrating-essence",
    name: "LUMI Hydrating Essence",
    subtitle: "Milky layering essence",
    price: 48,
    category: "Serums",
    concerns: ["hydration", "sensitive", "texture"],
    skinTypes: ["Dry", "Normal", "Combination", "Sensitive"],
    size: "120 ml / 4.06 fl oz",
    shortDescription:
      "A cushiony, milk-water essence that preps the skin and holds hydration for hours.",
    description:
      "Think of this as a drink of water for the face. A light milky texture layers under anything, absorbs in seconds, and leaves a lasting, breathable hydration. Use it as a hydrating step, or as a sheet-mask soak.",
    story:
      "Layering is the quiet heart of the LUMI method. The Hydrating Essence exists so you can build water in the skin before you build anything else on top of it.",
    ingredients: [
      { name: "Snow mushroom", benefit: "A moisture-binding polysaccharide for immediate plumpness." },
      { name: "Beta-glucan", benefit: "Deeply hydrating and famously soothing for reactive skin." },
      { name: "Squalane (olive-derived)", benefit: "A featherlight emollient that seals comfort without grease." },
      { name: "Glycerin", benefit: "Draws and holds water in the upper layers of skin." },
    ],
    howToUse: [
      "Press two to three drops into freshly cleansed skin.",
      "Layer a second application on dry or tight areas.",
      "Follow with serum and moisturiser while skin is still slightly damp.",
    ],
    rating: 4.9,
    reviewCount: 356,
    stock: 30,
    inStock: true,
    isBestseller: true,
    isNew: false,
    shape: "pump",
    tones: ["#e3e6e0", "#bcc6ba"],
    reviews: [
      r("e1", "Nadia H.", 5, "My skin drinks it up", "This is the step I never knew I was missing. Skin looks bouncy straight after and the layers on top absorb far better.", "2026-08-19", "Dry"),
      r("e2", "Cleo M.", 5, "Perfect under makeup", "No pilling at all, even under a full base. I use two layers in the morning.", "2026-05-30", "Combination"),
      r("e3", "Ines R.", 4, "Very good, slightly sticky if overdone", "Stick to two drops and it is perfect. I love it as a soak for a quick mask.", "2026-07-08", "Oily"),
    ],
  },
  {
    id: "lumi-03",
    slug: "vitamin-c-serum",
    name: "LUMI Vitamin C Serum",
    subtitle: "Stabilised 12% vitamin C",
    price: 68,
    compareAtPrice: 78,
    category: "Serums",
    concerns: ["brightening", "texture", "oil-control"],
    skinTypes: ["Normal", "Combination", "Oily", "Dull skin"],
    size: "30 ml / 1.01 fl oz",
    shortDescription:
      "A stabilised 12% ascorbic acid serum for a brighter, more even-looking complexion.",
    description:
      "Twelve per cent stabilised vitamin C, buffered with ferulic acid and vitamin E so it stays potent and comfortable. Applied each morning, it visibly evens tone, softens the look of fine lines and brings back the kind of glow that no highlighter can fake.",
    story:
      "Stability was our obsession. Most vitamin C on the shelf oxidises into a brown bottle by month three. Ours is formulated at a pH that keeps the molecule active, in an air-minimised dropper, and tested for twelve weeks after opening.",
    ingredients: [
      { name: "12% stabilised ascorbic acid", benefit: "Targets dullness, uneven tone and the look of fine lines." },
      { name: "Ferulic acid", benefit: "A plant antioxidant that stabilises and multiplies vitamin C's effect." },
      { name: "Tocopherol (vitamin E)", benefit: "Works alongside vitamin C for broader antioxidant protection." },
      { name: "Licorice root extract", benefit: "Helps visibly calm any residual pinkness after application." },
    ],
    howToUse: [
      "Apply four to five drops to clean, dry skin each morning.",
      "Wait sixty seconds, then follow with moisturiser and SPF.",
      "Introduce every other day if your skin is sensitive, then build up.",
    ],
    rating: 4.7,
    reviewCount: 528,
    stock: 18,
    inStock: true,
    isBestseller: true,
    isNew: false,
    shape: "dropper",
    tones: ["#efe0c6", "#d8b98a"],
    reviews: [
      r("v1", "Marta L.", 5, "Real glow, no orange cast", "Six weeks in and the dark spots along my cheekbones have genuinely faded. It does not go orange on my medium skin tone.", "2026-08-05", "Combination"),
      r("v2", "Jo B.", 4, "Works, but start slow", "Effective and not irritating after the first two weeks. The first week it tingled a little — recommend building up gradually.", "2026-06-11", "Sensitive"),
      r("v3", "Sana A.", 5, "Worth the price", "A genuinely stabilised formula. Three months in, the serum is still pale yellow, not brown.", "2026-09-01", "Normal"),
    ],
  },
  {
    id: "lumi-04",
    slug: "barrier-repair-cream",
    name: "LUMI Barrier Repair Cream",
    subtitle: "Ceramide comfort cream",
    price: 58,
    category: "Moisturisers",
    concerns: ["hydration", "sensitive", "texture"],
    skinTypes: ["Dry", "Sensitive", "Normal", "Mature"],
    size: "50 ml / 1.69 fl oz",
    shortDescription:
      "A rich-but-weightless cream that rebuilds a compromised moisture barrier overnight.",
    description:
      "A ratio of three ceramides, cholesterol and fatty acids in a cushiony, non-waxy base. It absorbs to a soft matte finish, so it works under makeup as happily as it does on its own at night.",
    story:
      "Named after the most requested thing from our first customer letters: a cream that repairs without coating. We spent a year tuning the ratio until it stopped feeling like a mask.",
    ingredients: [
      { name: "Ceramide NP, AP, EOP", benefit: "A triple of lipids that reinforce the skin's own barrier structure." },
      { name: "Cholesterol", benefit: "Restores the lipid ratio healthy barrier function depends on." },
      { name: "Colloidal oatmeal", benefit: "Comforts visible redness and tightness on reactive skin." },
      { name: "Shea butter", benefit: "A rich emollient that softens rough, flaking patches." },
    ],
    howToUse: [
      "Warm a pea-sized amount between fingertips and press into skin.",
      "Apply as the final step of your evening ritual.",
      "In the morning, apply a lighter layer beneath SPF.",
    ],
    rating: 4.9,
    reviewCount: 604,
    stock: 9,
    inStock: true,
    isBestseller: true,
    isNew: false,
    shape: "jar",
    tones: ["#e8e2d8", "#cabfae"],
    reviews: [
      r("b1", "Tess W.", 5, "My winter skin finally settled", "I over-exfoliased for a month and my face was stinging. Six nights of this and the tightness was history.", "2026-08-25", "Sensitive"),
      r("b2", "Hana O.", 5, "Rich but never heavy", "The finish is genuinely matte which is rare for a cream this comforting. Sits beautifully under concealer.", "2026-07-19", "Combination"),
      r("b3", "Ruby D.", 5, "Bought a second jar", "I keep one on the desk and one by the bed. It rescued my hands too.", "2026-08-30", "Dry"),
    ],
  },
  {
    id: "lumi-05",
    slug: "night-recovery-serum",
    name: "LUMI Night Recovery Serum",
    subtitle: "Peptide overnight repair",
    price: 72,
    category: "Serums",
    concerns: ["texture", "hydration", "brightening"],
    skinTypes: ["All skin types", "Mature", "Dry", "Normal"],
    size: "30 ml / 1.01 fl oz",
    shortDescription:
      "A peptide-rich night serum that works on the look of fine lines while you sleep.",
    description:
      "A concentrated evening treatment of multi-weight peptides, bakuchiol and niacinamide. Skin wakes up looking smoother, firmer and more even — never coated, never sticky on the pillow.",
    story:
      "Retinol had a reputation we wanted to escape. Night Recovery delivers the visible results of a retinoid routine with a profile that suits sensitive skin and works alongside the rest of the LUMI evening steps.",
    ingredients: [
      { name: "Matrixyl 3000 (peptide complex)", benefit: "Visibly softens the appearance of fine lines and wrinkles." },
      { name: "Bakuchiol", benefit: "A gentle plant alternative that supports renewal overnight." },
      { name: "Niacinamide 4%", benefit: "Refines pores, evens tone and strengthens the barrier." },
      { name: "Copper peptides", benefit: "Firms and smooths the look of skin texture." },
    ],
    howToUse: [
      "Apply three to four drops to clean, dry skin at night.",
      "Do not layer with exfoliating acids in the same routine.",
      "Always finish with SPF the next morning.",
    ],
    rating: 4.8,
    reviewCount: 389,
    stock: 24,
    inStock: true,
    isBestseller: false,
    isNew: true,
    shape: "dropper",
    tones: ["#e2e0ea", "#b6b2c6"],
    reviews: [
      r("n1", "Elena P.", 5, "Sleeping my way to smoother skin", "Eight weeks and the fine lines around my mouth are noticeably softer. No peeling, no downtime.", "2026-08-11", "Mature / dry"),
      r("n2", "Yuki T.", 4, "Great, but start every other night", "I got slightly flushed the first few nights. Every other night from day three was perfect.", "2026-07-27", "Sensitive"),
    ],
  },
  {
    id: "lumi-06",
    slug: "gentle-exfoliant",
    name: "LUMI Gentle Exfoliant",
    subtitle: "5% lactic acid toner",
    price: 44,
    category: "Treatments",
    concerns: ["texture", "brightening", "oil-control"],
    skinTypes: ["Normal", "Combination", "Oily", "Dull skin"],
    size: "100 ml / 3.38 fl oz",
    shortDescription:
      "A slow-release lactic acid toner that resurfaces texture without a peel or a sting.",
    description:
      "Five per cent lactic acid in a buffered glycolic-free base, formulated for gradual release across ten minutes rather than a one-minute hit. Skin looks smoother and brighter in the morning, without the downtime.",
    story:
      "Most exfoliants ask you to choose between effective and comfortable. We built this one around a slow-release system so beginners have somewhere gentle to start.",
    ingredients: [
      { name: "5% lactic acid", benefit: "A larger-molecule AHA that resurfaces gently and hydrates as it works." },
      { name: "Aloe leaf water", benefit: "Cools and hydrates while the acid is working." },
      { name: "Rice water", benefit: "Softens the look of rough patches and boosts bounce." },
      { name: "Panthenol", benefit: "Keeps skin comfortable through regular exfoliation." },
    ],
    howToUse: [
      "Sweep over cleansed skin with a cotton pad or palms.",
      "Use two to three evenings per week to begin with.",
      "Always follow with moisturiser and daily SPF.",
    ],
    rating: 4.6,
    reviewCount: 271,
    stock: 0,
    inStock: false,
    isBestseller: false,
    isNew: false,
    shape: "bottle",
    tones: ["#dfe6e4", "#adc0bc"],
    reviews: [
      r("x1", "Maren F.", 5, "The only AHA I can actually keep up", "No stinging at all and the texture of my nose has smoothed out over a month.", "2026-08-08", "Combination"),
      r("x2", "Kayla J.", 4, "Slow and steady", "It took three weeks to see anything, which I actually appreciate. No flaking under makeup.", "2026-06-30", "Normal"),
    ],
  },
  {
    id: "lumi-07",
    slug: "eye-renewal-cream",
    name: "LUMI Eye Renewal Cream",
    subtitle: "Caffeine eye contour",
    price: 52,
    category: "Treatments",
    concerns: ["brightening", "hydration", "texture"],
    skinTypes: ["All skin types", "Dry", "Sensitive", "Mature"],
    size: "15 ml / 0.5 fl oz",
    shortDescription:
      "A light contour cream with 3% caffeine that softens the look of puffiness in minutes.",
    description:
      "The thinnest skin on the face meets the most demanding expectations, so this formula is deliberately light. Caffeine, peptides and a hint of light-reflective pearl give an immediate, rested look without shimmer fallout.",
    story:
      "Most eye creams are too heavy for the eye area. We set out to make one you could wear morning and night, under concealer, without creasing.",
    ingredients: [
      { name: "3% caffeine", benefit: "Visibly reduces the look of puffiness, especially in the morning." },
      { name: "Peptides", benefit: "Support firmer-looking skin around the orbital area." },
      { name: "Squalane", benefit: "Softens and hydrates this thinner, drier skin." },
      { name: "Fine mica", benefit: "A whisper of soft-focus reflection under concealer." },
    ],
    howToUse: [
      "Tap a rice-grain amount along the orbital bone with your ring finger.",
      "Use morning and evening, always on clean skin.",
      "Keep the product away from the lash line and the waterline.",
    ],
    rating: 4.5,
    reviewCount: 198,
    stock: 3,
    inStock: true,
    isBestseller: false,
    isNew: false,
    shape: "tube",
    tones: ["#eadfe6", "#c9b3c0"],
    reviews: [
      r("y1", "Farah I.", 5, "De-puffed by breakfast", "I use it first thing and the morning puffiness is genuinely gone. No mascara smudging either.", "2026-08-16", "Combination"),
      r("y2", "Lena V.", 4, "Light and non-greasy", "Absorbs instantly which is what I want in the morning. Took a while to notice anything on dark circles.", "2026-07-05", "Dry"),
    ],
  },
  {
    id: "lumi-08",
    slug: "daily-spf",
    name: "LUMI Daily SPF 50",
    subtitle: "Invisible mineral sunscreen",
    price: 46,
    category: "Sun Care",
    concerns: ["hydration", "brightening", "sensitive"],
    skinTypes: ["All skin types", "Sensitive", "Combination", "Oily"],
    size: "50 ml / 1.69 fl oz",
    shortDescription:
      "A weightless mineral SPF 50 that leaves no white cast, chalk or flashback.",
    description:
      "A modern non-nano zinc formula in a silky fluid, developed to disappear on every skin tone. It layers under makeup, wears well in humidity and leaves a smooth, slightly luminous finish rather than a matte one.",
    story:
      "Sunscreen is the step people skip, and it is the one that matters most. We reformulated ours four times to remove the cast, the pilling and the flashback — the three reasons people give up.",
    ingredients: [
      { name: "Non-nano zinc oxide 18%", benefit: "Broad-spectrum mineral protection with a low-white-cast profile." },
      { name: "Vitamin E", benefit: "Antioxidant support that helps offset daily oxidative stress." },
      { name: "Niacinamide", benefit: "Keeps the formula kind to sensitive, easily-irritated skin." },
      { name: "Silica", benefit: "Blurs the look of pores and smooths the finish under makeup." },
    ],
    howToUse: [
      "Apply two finger-lengths as the last step of your morning routine.",
      "Reapply every two hours when directly exposed to sunlight.",
      "Use a generous amount — most people under-apply, not over-apply.",
    ],
    rating: 4.7,
    reviewCount: 447,
    stock: 36,
    inStock: true,
    isBestseller: true,
    isNew: false,
    shape: "tube",
    tones: ["#eae4d6", "#cdc0a8"],
    reviews: [
      r("s1", "Amara O.", 5, "Finally no white cast", "Deep skin tone and completely invisible. I bought three more.", "2026-08-28", "Deep / combination"),
      r("s2", "Jules P.", 5, "My makeup slides better now", "No pilling at all, which was my constant problem. Dewy, not greasy.", "2026-07-22", "Combination"),
      r("s3", "Tori L.", 4, "Excellent, wish it were fragrance-free", "Truly elegant texture. I have a very reactive nose so I wish for a plain unscented version.", "2026-06-14", "Sensitive"),
    ],
  },
  {
    id: "lumi-09",
    slug: "hydration-mask",
    name: "LUMI Hydration Mask",
    subtitle: "Overnight water mask",
    price: 50,
    category: "Masks",
    concerns: ["hydration", "sensitive", "texture"],
    skinTypes: ["Dry", "Normal", "Sensitive", "Combination"],
    size: "75 ml / 2.53 fl oz",
    shortDescription:
      "A breathable sleeping mask that floods thirsty skin with water by morning.",
    description:
      "A gel-cream mask that works while you sleep. It sits comfortably through the night, never cracking or dragging at the pillow, and wakes skin up looking plump, rested and dewy rather than slick.",
    story:
      "A weekend mask that also works on a Tuesday. We wanted recovery to be an everyday option, not a treat reserved for a good mood and free time.",
    ingredients: [
      { name: "Hyaluronic acid (multi-weight)", benefit: "Pulls water into the upper layers of skin and holds it there." },
      { name: "Glycerin", benefit: "Works overnight to prevent overnight water loss." },
      { name: "Ceramides", benefit: "Seal the hydration in without a heavy occlusive feel." },
      { name: "Centella asiatica", benefit: "Calms the look of redness the next morning." },
    ],
    howToUse: [
      "Apply a generous layer as the final step at night.",
      "Leave on overnight and rinse in the morning.",
      "Use two or three nights a week, or whenever skin feels thirsty.",
    ],
    rating: 4.8,
    reviewCount: 297,
    stock: 27,
    inStock: true,
    isBestseller: false,
    isNew: false,
    shape: "jar",
    tones: ["#dfe7ec", "#aebfc9"],
    reviews: [
      r("m1", "Greta S.", 5, "The morning glow is real", "I wake up looking like I have slept nine hours. It never flakes or pulls at the pillowcase.", "2026-08-20", "Dry"),
      r("m2", "Nour Z.", 4, "Very comfortable overnight", "Only reason for four stars is that my partner is not a fan of the scent, but the skin result is excellent.", "2026-07-11", "Normal"),
    ],
  },
  {
    id: "lumi-10",
    slug: "cleansing-balm",
    name: "LUMI Cleansing Balm",
    subtitle: "Melting balm cleanser",
    price: 40,
    category: "Cleansers",
    concerns: ["texture", "oil-control", "sensitive"],
    skinTypes: ["All skin types", "Dry", "Combination", "Sensitive"],
    size: "90 ml / 3.04 fl oz",
    shortDescription:
      "A sherbet balm that melts makeup and SPF on contact, then rinses clean.",
    description:
      "The first double cleanse, or the only cleanse if you like. A sherbet-textured balm that emulsifies with water and rinses without a film. Effective on long-wear makeup and heavy sunscreens without any rubbing.",
    story:
      "Makeup removal should not be a negotiation. This balm was tested on full base, waterproof mascara and two layers of SPF — the trifecta that ruins most balms.",
    ingredients: [
      { name: "Sunflower seed oil", benefit: "Dissolves makeup and sunscreen with minimal disruption to skin." },
      { name: "Shea butter", benefit: "Dissolves long-wear formulas and prevents a tight after-feel." },
      { name: "Oat lipids", benefit: "Keeps the skin barrier comfortable through the melt-away." },
      { name: "Vitamin E", benefit: "Antioxidant support for daily pollution exposure." },
    ],
    howToUse: [
      "Massage over dry skin for one minute to melt everything away.",
      "Add water to emulsify and massage again — the balm turns milky.",
      "Rinse thoroughly, then follow with Daily Glow Cleanser if you like a double cleanse.",
    ],
    rating: 4.8,
    reviewCount: 334,
    stock: 21,
    inStock: true,
    isBestseller: false,
    isNew: true,
    shape: "jar",
    tones: ["#f0e7dc", "#d8c3ab"],
    reviews: [
      r("c1", "Bea T.", 5, "Removes everything, one pass", "Waterproof mascara, full base, SPF — gone in a minute with zero dragging. My lashes survived.", "2026-08-14", "Combination"),
      r("c2", "Sasha L.", 5, "My first cleansing oil I like", "Rinses completely clean with no film. The sherbet texture is a genuine delight.", "2026-07-30", "Dry"),
    ],
  },
  {
    id: "lumi-11",
    slug: "facial-oil",
    name: "LUMI Facial Oil",
    subtitle: "Botanical face oil",
    price: 62,
    category: "Moisturisers",
    concerns: ["hydration", "texture", "sensitive"],
    skinTypes: ["Dry", "Normal", "Mature", "Sensitive"],
    size: "30 ml / 1.01 fl oz",
    shortDescription:
      "A fast-absorbing botanical oil that softens without a heavy shine.",
    description:
      "Rosehip, camellia and marula oils cut with a fast-absorbing ester so the last step of your evening ritual is nourishment, not shine. Four to five drops is all it takes.",
    story:
      "Facial oils have a reputation for breaking out some skin and dazzling others. This one is formulated for both — a ratio of botanical oils with an ester that carries them in before they pool.",
    ingredients: [
      { name: "Rosehip seed oil", benefit: "Traditionally used to even tone and soften the look of scarring." },
      { name: "Camellia japonica oil", benefit: "A light, fast-absorbing oil that softens and smooths." },
      { name: "Marula oil", benefit: "Rich in antioxidants, nourishes without feeling heavy." },
      { name: "Squalane", benefit: "Carries the oils in while adding a silky, non-greasy slip." },
    ],
    howToUse: [
      "Warm three to five drops in your palms and press onto damp skin.",
      "Use as the final evening step, after moisturiser.",
      "One or two drops in the morning beneath SPF for extra glow.",
    ],
    rating: 4.7,
    reviewCount: 219,
    stock: 15,
    inStock: true,
    isBestseller: false,
    isNew: false,
    shape: "dropper",
    tones: ["#f2e6cd", "#d3b483"],
    reviews: [
      r("o1", "Ivy C.", 5, "Absorbs in seconds", "Genuinely an oil that does not sit on top. My winter cheeks stopped flaking entirely.", "2026-08-09", "Dry"),
      r("o2", "Rosa M.", 4, "Beautiful oil, I use it at night", "Not my morning choice, but as a last evening step it is lovely and non-greasy.", "2026-06-26", "Combination"),
    ],
  },
  {
    id: "lumi-12",
    slug: "complete-glow-set",
    name: "LUMI Complete Glow Set",
    subtitle: "Four-step ritual set",
    price: 186,
    compareAtPrice: 218,
    category: "Sets",
    concerns: ["hydration", "brightening", "texture", "oil-control", "sensitive"],
    skinTypes: ["All skin types", "Normal", "Combination", "Dry"],
    size: "4 pieces, full size",
    shortDescription:
      "The complete LUMI morning and evening ritual, full size, at a set price.",
    description:
      "Cleansing Balm, Hydrating Essence, Vitamin C Serum and Barrier Repair Cream — the four steps the LUMI method is built on, in full-size formats, saving you over a third against buying them separately.",
    story:
      "Everything we make, distilled into the shortest possible path. This is the set we give our own families, and the one we would suggest if you have never used LUMI before.",
    ingredients: [
      { name: "A complete four-step ritual", benefit: "Cleanse, hydrate, treat and seal — the whole LUMI method." },
      { name: "Full-size formats", benefit: "Nothing is a sample, so you can judge each texture properly." },
      { name: "A linen travel pouch", benefit: "Everything fits, including the 30 ml serums, without spillage." },
      { name: "A printed ritual card", benefit: "Order and layering guidance written by our formulator." },
    ],
    howToUse: [
      "Morning: Essence, Vitamin C Serum, Barrier Repair Cream, SPF.",
      "Evening: Cleansing Balm, Essence, Barrier Repair Cream.",
      "Each product is full size — nothing expires early or gets used too quickly.",
    ],
    rating: 4.9,
    reviewCount: 176,
    stock: 12,
    inStock: true,
    isBestseller: true,
    isNew: false,
    shape: "set",
    tones: ["#e9e1d4", "#c4b298"],
    reviews: [
      r("st1", "Alina V.", 5, "The perfect starting point", "Bought this instead of guessing. Four products, one routine, no nonsense. The pouch is lovely too.", "2026-08-27", "Combination"),
      r("st2", "Bridget F.", 5, "A genuinely great gift", "I gave this to my sister and she has since reordered two of the singles. Beautifully packaged.", "2026-07-18", "Normal"),
      r("st3", "Mina R.", 5, "Better value than I expected", "Full sizes for less than the sum of the parts, and the ritual card made the order obvious.", "2026-06-09", "Dry"),
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getBestsellers = (): Product[] => products.filter((p) => p.isBestseller);

export const getRelated = (product: Product, count = 4): Product[] =>
  products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      const shared = p.concerns.filter((c) => product.concerns.includes(c)).length;
      const sameCategory = p.category === product.category ? 2 : 0;
      return { p, score: shared + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.p);

/** Recommendations are ordered by rating so the strongest matches lead. */
export const getProductsByConcern = (concern: string): Product[] =>
  products
    .filter((p) => p.concerns.includes(concern as never))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

export const categories: string[] = Array.from(new Set(products.map((p) => p.category)));

