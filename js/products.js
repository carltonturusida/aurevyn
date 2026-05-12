/* ============ Aurevyn — product data ============ */
const PRODUCTS = [
  {id:1,name:"Atrium Runner 03",cat:"Sneakers",price:1999,old:3999,rating:4.8,reviews:212,tag:"New",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80"],desc:"Modern red runner sneaker with cushioned sole and clean streetwear design."},
  {id:2,name:"Halo Wireless Earbuds",cat:"Electronics",price:2199,rating:4.7,reviews:489,tag:"Best seller",img:"https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80"],desc:"Active noise-cancelling earbuds with 32-hour battery and aptX Lossless audio."},
  {id:3,name:"Linen Overshirt — Sand",cat:"Fashion",sizes:["S","M","L","XL","XXL"],price:1599,rating:4.6,reviews:84,img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"],desc:"Breathable European linen, relaxed fit. Made for warm Highveld afternoons."},
  {id:4,name:"Aero Smartwatch S5",cat:"Smart Devices",price:5499,rating:4.9,reviews:341,tag:"Hot",img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"],desc:"Titanium case, sapphire crystal, ECG and SpO2. 7-day battery life."},
  {id:5,name:"Minimal Everyday Leather Backpack",cat:"Accessories",price:2899,rating:4.8,reviews:127,img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"],desc:"Sleek everyday backpack designed for style, comfort, and daily essentials."},
  {id:6,name:"Mono Ceramic Mug Set",cat:"Lifestyle",price:649,rating:4.5,reviews:58,img:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80"],desc:"Modern ceramic mugs with a clean minimalist design."},
  {id:7,name:"Vans Men's Old Skool",cat:"Sneakers",price:1099,rating:4.7,reviews:174,img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80"],desc:"Classic Vans sneaker with iconic side stripe and everyday comfort."},
  {id:8,name:"JBL Pulse Portable Bluetooth Speaker",cat:"Electronics",price:3299,rating:4.6,reviews:233,img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80"],desc:"Portable waterproof speaker with deep bass and 360° immersive sound."},
  {id:9,name:"Essential Lightweight Street Jacket",cat:"Fashion",sizes:["S","M","L","XL","XXL"],price:4699,old:5499,rating:4.8,reviews:96,tag:"Sale",img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80"],desc:"Clean lightweight jacket designed for everyday streetwear and comfort."},
  {id:10,name:"Compact Voice-Control Smart Speaker",cat:"Smart Devices",price:1799,rating:4.5,reviews:201,img:"assets/products/smart-speaker.jpg",gallery:["assets/products/smart-speaker.jpg"],desc:"Compact smart speaker with clear audio and built-in voice assistant for everyday use."},
  {id:11,name:"Ray-Ban Sunglasses",cat:"Accessories",price:1299,rating:4.7,reviews:142,img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80"],desc:"Classic sunglasses with everyday style and UV protection."},
  {id:12,name:"Yves Saint Laurent Black Opium Eau de Parfum",cat:"Lifestyle",price:2500,rating:4.6,reviews:73,img:"https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=900&q=80"],desc:"Bold floral fragrance with warm vanilla and coffee notes."},
  {id:13,name:"Cognac Trail Leather Boot",cat:"Sneakers",price:3899,rating:4.7,reviews:64,img:"https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80"],desc:"Durable waterproof trail boot built for outdoor comfort and support."},
  {id:14,name:"4K Ultra Webcam Pro",cat:"Electronics",price:2599,rating:4.6,reviews:118,img:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80"],desc:"AI-tracking 4K webcam with studio-grade microphones."},
  {id:15,name:"Essential White Hoodie",cat:"Fashion",sizes:["S","M","L","XL","XXL"],price:2499,rating:4.8,reviews:89,tag:"New",img:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80"],desc:"Clean oversized hoodie with soft everyday comfort."},
  {id:16,name:"Minimalist Desk Lamp",cat:"Lifestyle",price:1199,rating:4.7,reviews:67,img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"],desc:"Adjustable warm-LED desk lamp with USB-C charging base."},
  {id:17,name:"Urban Utility Crossbody Sling Bag",cat:"Accessories",price:1499,rating:4.5,reviews:54,img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",gallery:["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80"],desc:"Compact crossbody bag with lightweight build and secure hidden compartments."},
  {id:18,name:"Fitness Ring Gen2",cat:"Smart Devices",price:3999,rating:4.7,reviews:188,tag:"New",img:"assets/products/fitness-ring.jpg",gallery:["assets/products/fitness-ring.jpg"],desc:"Sleep, recovery and HRV tracking in a 4g titanium ring."}
];

const CATEGORIES = [
  {name:"Sneakers",img:"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&q=80"},
  {name:"Fashion",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"},
  {name:"Electronics",img:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=600&q=80"},
  {name:"Smart Devices",img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"},
  {name:"Accessories",img:"https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80"},
  {name:"Lifestyle",img:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80"}
];

const TESTIMONIALS = [
  {q:"Genuinely the best online shopping experience I've had in South Africa. Packaging was a moment.",a:"Naledi M., Sandton"},
  {q:"My Atrium Runners arrived the next morning in Cape Town. The leather, the box, the little thank-you card — everything felt considered.",a:"Sipho K., Cape Town"},
  {q:"Support replied in under five minutes and arranged a free pick-up for my exchange. Honestly, world-class service from a local brand.",a:"Aisha P., Durban"},
  {q:"The Aero smartwatch is stunning, and the linen overshirt is now my Friday uniform. Aurevyn's curation feels like a friend with great taste.",a:"Ruan v.d. Berg, Pretoria"}
];

const FAQS = [
  {q:"How long does delivery take?",a:"Orders placed before 13:00 SAST ship the same day. Most metros receive parcels within 48 hours; outlying areas 3–5 working days."},
  {q:"Do you offer free shipping?",a:"Yes — free nationwide shipping on every order over R 1 500. Standard fee under that is a flat R 75."},
  {q:"What is your returns policy?",a:"30-day no-questions returns on unworn items. We collect from your door at no charge."},
  {q:"Are products authentic?",a:"Every product is sourced directly from the brand or its authorised distributor. We guarantee authenticity in writing."},
  {q:"Can I pay on delivery?",a:"We accept credit/debit cards, Instant EFT, SnapScan and Zapper. Cash on delivery is available in select metros."}
];

// helpers
const ZAR = n => "R " + Math.round(n).toLocaleString("en-ZA").replace(/,/g," ");
const byId = id => PRODUCTS.find(p=>p.id===id);
