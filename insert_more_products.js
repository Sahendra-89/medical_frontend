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

const supabase = createClient(supabaseUrl, supabaseKey);

const newProducts = [
  { name: 'ALERID TAB (10 TAB)', brand: 'CIPLA', category_id: 'otc', mrp: 40.00, price: 34.00, discount_percent: 15, stock: 150, sku: 'PP-NEW-007', description: 'Anti-allergic medicine used to treat cold and allergy symptoms.', usage_instructions: '1 tablet daily.', prescription_required: false, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', is_featured: false, is_bestseller: true },
  { name: 'AMARYL 1MG TAB (15 TAB)', brand: 'SANOFI', category_id: 'prescription', mrp: 135.00, price: 115.00, discount_percent: 15, stock: 80, sku: 'PP-NEW-008', description: 'Used to treat type 2 diabetes mellitus.', usage_instructions: 'Take strictly as prescribed.', prescription_required: true, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', is_featured: false, is_bestseller: false },
  { name: 'AMLOVAS 5MG TAB (15 TAB)', brand: 'MACLEODS PHARMA', category_id: 'prescription', mrp: 45.00, price: 38.00, discount_percent: 15, stock: 120, sku: 'PP-NEW-009', description: 'Used to treat high blood pressure (hypertension).', usage_instructions: 'Take strictly as prescribed.', prescription_required: true, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', is_featured: false, is_bestseller: true },
  { name: 'BECOSULES CAP (20 CAP)', brand: 'PFIZER', category_id: 'vitamin-store', mrp: 48.00, price: 40.00, discount_percent: 16, stock: 300, sku: 'PP-NEW-010', description: 'Vitamin B complex capsules for mouth ulcers and fatigue.', usage_instructions: '1 capsule daily.', prescription_required: false, image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400', is_featured: true, is_bestseller: true },
  { name: 'CALPOL 500MG TAB (15 TAB)', brand: 'GSK', category_id: 'otc', mrp: 15.00, price: 13.00, discount_percent: 13, stock: 500, sku: 'PP-NEW-011', description: 'Paracetamol tablets for fever and pain relief.', usage_instructions: '1 tablet when required for fever.', prescription_required: false, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400', is_featured: true, is_bestseller: true },
  { name: 'DOLO 650 TAB (15 TAB)', brand: 'MICRO LABS', category_id: 'must-haves', mrp: 30.00, price: 26.00, discount_percent: 13, stock: 600, sku: 'PP-NEW-012', description: 'Paracetamol 650mg for high fever and pain relief.', usage_instructions: '1 tablet when required for fever.', prescription_required: false, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', is_featured: true, is_bestseller: true },
  { name: 'EVION 400 CAP (10 CAP)', brand: 'P&G', category_id: 'vitamin-store', mrp: 35.00, price: 30.00, discount_percent: 14, stock: 250, sku: 'PP-NEW-013', description: 'Vitamin E capsules for skin, hair, and muscle health.', usage_instructions: '1 capsule daily.', prescription_required: false, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', is_featured: true, is_bestseller: true },
  { name: 'FOLVITE TAB (45 TAB)', brand: 'PFIZER', category_id: 'vitamin-store', mrp: 75.00, price: 65.00, discount_percent: 13, stock: 150, sku: 'PP-NEW-014', description: 'Folic acid supplement for anemia and pregnancy support.', usage_instructions: '1 tablet daily.', prescription_required: false, image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400', is_featured: false, is_bestseller: true }
];

async function insertData() {
  console.log("Inserting more products...");
  for (const p of newProducts) {
    const { data, error } = await supabase.from('products').upsert({ sku: p.sku, ...p }, { onConflict: 'sku' });
    if (error) console.error("Error inserting", p.name, error);
    else console.log("Successfully inserted", p.name);
  }
  console.log("Done!");
}

insertData();
