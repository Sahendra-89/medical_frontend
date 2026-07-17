const fs = require('fs');
const path = require('path');
const env = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...val] = line.split('=');
    if (key && val.length) acc[key.trim()] = val.join('=').trim();
    return acc;
  }, {});

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newProducts = [
  {
    name: 'A TO Z GOLD CAP (15 CAP)',
    brand: 'ALKEM',
    category_id: 'vitamin-store',
    mrp: 180.00,
    price: 150.00,
    discount_percent: 16,
    stock: 50,
    sku: 'PP-NEW-001',
    description: 'A to Z Gold Capsule is a nutritional supplement that helps improve immunity and overall health.',
    usage_instructions: 'Take 1 capsule daily after a meal.',
    side_effects: 'Generally safe. Mild nausea in rare cases.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    is_featured: true,
    is_bestseller: true,
  },
  {
    name: 'A TO Z NS SYP 200ML',
    brand: 'ALKEM',
    category_id: 'vitamin-store',
    mrp: 150.00,
    price: 135.00,
    discount_percent: 10,
    stock: 100,
    sku: 'PP-NEW-002',
    description: 'A to Z NS Syrup is a multivitamin and multimineral syrup for children and adults.',
    usage_instructions: '1-2 teaspoons daily.',
    side_effects: 'None typically.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400',
    is_featured: true,
    is_bestseller: false,
  },
  {
    name: 'A TO Z WOMAN CAP (15 CAP)',
    brand: 'ALKEM',
    category_id: 'vitamin-store',
    mrp: 195.00,
    price: 170.00,
    discount_percent: 12,
    stock: 75,
    sku: 'PP-NEW-003',
    description: 'Specially formulated multivitamin for women to support energy and bone health.',
    usage_instructions: 'Take 1 capsule daily after breakfast.',
    side_effects: 'None typically.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    is_featured: false,
    is_bestseller: true,
  },
  {
    name: 'AB PHYLLINE CAP (15 CAP)',
    brand: 'SUN PHARMA',
    category_id: 'prescription',
    mrp: 120.00,
    price: 100.00,
    discount_percent: 16,
    stock: 40,
    sku: 'PP-NEW-004',
    description: 'Bronchodilator and mucolytic agent used for asthma and COPD.',
    usage_instructions: 'Take as prescribed by a physician.',
    side_effects: 'Nausea, vomiting, stomach upset.',
    prescription_required: true,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    is_featured: false,
    is_bestseller: false,
  },
  {
    name: 'ACILOC 150MG TAB (30 TAB)',
    brand: 'CADILA PHARMA',
    category_id: 'otc',
    mrp: 45.00,
    price: 38.00,
    discount_percent: 15,
    stock: 200,
    sku: 'PP-NEW-005',
    description: 'Antacid used to treat acidity, heartburn, and stomach ulcers.',
    usage_instructions: 'Take 1 tablet before meals.',
    side_effects: 'Headache, diarrhea.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    is_featured: true,
    is_bestseller: true,
  },
  {
    name: 'ACUTRET 10MG CAP (10 CAP)',
    brand: 'MACLEODS PHARMA',
    category_id: 'prescription',
    mrp: 210.00,
    price: 180.00,
    discount_percent: 14,
    stock: 30,
    sku: 'PP-NEW-006',
    description: 'Used in the treatment of severe acne.',
    usage_instructions: 'Take strictly as prescribed by a dermatologist.',
    side_effects: 'Dry skin, chapped lips, sun sensitivity.',
    prescription_required: true,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
    is_featured: false,
    is_bestseller: false,
  }
];

async function insertData() {
  console.log("Inserting products...");
  for (const p of newProducts) {
    const { data, error } = await supabase
      .from('products')
      .upsert({ sku: p.sku, ...p }, { onConflict: 'sku' });
    
    if (error) {
      console.error("Error inserting", p.name, error);
    } else {
      console.log("Successfully inserted", p.name);
    }
  }
  console.log("Done!");
}

insertData();
