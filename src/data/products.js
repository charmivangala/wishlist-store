// Product shape: { id, name, price, category, image }
// Prices are plain numbers (USD). Images are royalty-free Unsplash source images
// sized for card thumbnails — swap these URLs for your own product photography.
import wateringCan from '../assets/wateringCan.jpg'

const products = [
  {
    id: 'p01',
    name: 'Canvas Field Tote',
    price: 48,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop',
  },
  {
    id: 'p02',
    name: 'Ridge Wool Sweater',
    price: 89,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=600&fit=crop',
  },
  {
    id: 'p03',
    name: 'Ceramic Pour-Over Set',
    price: 62,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
  },
  {
    id: 'p04',
    name: 'Cedar Desk Lamp',
    price: 74,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop',
  },
  {
    id: 'p05',
    name: 'Trail Runner Sneaker',
    price: 118,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
  },
  {
    id: 'p06',
    name: 'Linen Weekender Shirt',
    price: 56,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop',
  },
  {
    id: 'p07',
    name: 'Leather Card Wallet',
    price: 34,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop',
  },
  {
    id: 'p08',
    name: 'Stoneware Mug Duo',
    price: 29,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop',
  },
  {
    id: 'p09',
    name: 'Aviator Sunglasses',
    price: 95,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
  },
  {
    id: 'p10',
    name: 'Merino Beanie',
    price: 26,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=600&fit=crop',
  },
  {
    id: 'p11',
    name: 'Brass Watering Can',
    price: 41,
    category: 'Home',
    image: wateringCan,
  },
  {
    id: 'p12',
    name: 'Suede Chelsea Boot',
    price: 142,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop',
  },
]

export default products
