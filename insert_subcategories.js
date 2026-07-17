/**
 * insert_subcategories.js
 * Adds parent_id support to categories and inserts all subcategories
 * from the Healthcare mega menu.
 * Run: node insert_subcategories.js
 */

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
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY);

// ─── All subcategories from the Healthcare mega menu ──────────────────────────
const SUBCATEGORIES = [
  // Must Haves
  { id: 'diabetic-care',        name: 'Diabetic Care',           parent_id: 'must-haves',          icon: '🩸', description: 'Products for diabetic care management' },
  { id: 'feet-problem',         name: 'Feet Problem',            parent_id: 'must-haves',          icon: '🦶', description: 'Foot care and relief products' },
  { id: 'skin-hair-care',       name: 'Skin & Hair Care',        parent_id: 'must-haves',          icon: '💆', description: 'Skin and hair care essentials' },
  { id: 'deals',                name: 'Never Seen Before Deals', parent_id: 'must-haves',          icon: '🔥', description: 'Exclusive never-seen deals' },
  { id: 'vitamin',              name: 'Vitamin',                 parent_id: 'must-haves',          icon: '💊', description: 'Essential vitamin products' },
  { id: 'ortho-care',           name: 'Ortho Care',              parent_id: 'must-haves',          icon: '🦴', description: 'Orthopedic support and care products' },
  { id: 'therapy-others',       name: 'Therapy Others',          parent_id: 'must-haves',          icon: '🏥', description: 'Other therapy related products' },

  // Vitamin Store
  { id: 'vitamins-supplements', name: 'Vitamins and Supplements',parent_id: 'vitamin-store',       icon: '💊', description: 'All vitamins and dietary supplements' },
  { id: 'multivitamins',        name: 'Multi Vitamins',          parent_id: 'vitamin-store',       icon: '🌈', description: 'Comprehensive multivitamin formulas' },
  { id: 'biotin',               name: 'Biotin',                  parent_id: 'vitamin-store',       icon: '✨', description: 'Biotin for hair, skin and nails' },
  { id: 'collagen',             name: 'Collagen',                parent_id: 'vitamin-store',       icon: '🌟', description: 'Collagen supplements for skin health' },
  { id: 'gummies',              name: 'Gummies',                 parent_id: 'vitamin-store',       icon: '🍬', description: 'Vitamin gummies for all ages' },
  { id: 'supplements-skin',     name: 'Supplements for Skin',    parent_id: 'vitamin-store',       icon: '🧴', description: 'Skin-focused dietary supplements' },
  { id: 'supplements-sleep',    name: 'Supplements for Sleep',   parent_id: 'vitamin-store',       icon: '😴', description: 'Sleep support supplements' },
  { id: 'vitamins-heart',       name: 'Vitamins for Heart',      parent_id: 'vitamin-store',       icon: '❤️', description: 'Heart health vitamins and supplements' },
  { id: 'vitamins-diabetes',    name: 'Vitamins for Diabetes',   parent_id: 'vitamin-store',       icon: '🩺', description: 'Supplements for diabetic health management' },

  // Sexual Wellness
  { id: 'sexual-wellness-otc',  name: 'Sexual Wellness OTC',     parent_id: 'sexual-wellness',     icon: '❤️', description: 'Over-the-counter sexual wellness products' },
  { id: 'condoms',              name: 'Condoms',                 parent_id: 'sexual-wellness',     icon: '🛡️', description: 'Condoms and contraceptives' },
  { id: 'vigor-vitality',       name: 'Vigor & Vitality',        parent_id: 'sexual-wellness',     icon: '💪', description: 'Vigor and vitality supplements' },
  { id: 'shilajit',             name: 'Shilajit',                parent_id: 'sexual-wellness',     icon: '🌿', description: 'Shilajit supplements for male health' },
  { id: 'pregnancy-support',    name: 'Pregnancy Support',       parent_id: 'sexual-wellness',     icon: '🤰', description: 'Supplements and products for pregnancy support' },
  { id: 'oral-contraceptives',  name: 'Oral Contraceptives',     parent_id: 'sexual-wellness',     icon: '💊', description: 'Oral contraceptive pills' },
  { id: 'sexual-devices',       name: 'Sexual Devices',          parent_id: 'sexual-wellness',     icon: '🔒', description: 'Personal sexual wellness devices' },

  // Personal Care
  { id: 'skin-care',            name: 'Skin Care',               parent_id: 'personal-care',       icon: '🧴', description: 'Face and body skin care products' },
  { id: 'face-wash',            name: 'Face Wash',               parent_id: 'personal-care',       icon: '🫧', description: 'Face cleansers and washes' },
  { id: 'moisturizers',         name: 'Moisturizers',            parent_id: 'personal-care',       icon: '💧', description: 'Face and body moisturizers' },
  { id: 'hair-care',            name: 'Hair Care',               parent_id: 'personal-care',       icon: '💇', description: 'Shampoos, conditioners, and hair treatments' },
  { id: 'shampoo',              name: 'Shampoo',                 parent_id: 'personal-care',       icon: '🧼', description: 'All types of shampoos' },
  { id: 'conditioners',         name: 'Conditioners',            parent_id: 'personal-care',       icon: '✨', description: 'Hair conditioners and masks' },

  // Homeopathy Care
  { id: 'homeo-health-needs',   name: 'Explore by Health Needs', parent_id: 'homeopathy',          icon: '🔬', description: 'Homeopathic remedies by health condition' },
  { id: 'homeo-skin-hair',      name: 'Skin & Hair (Homeo)',     parent_id: 'homeopathy',          icon: '🌿', description: 'Homeopathic skin and hair care' },
  { id: 'homeo-diabetes',       name: 'Diabetes Care (Homeo)',   parent_id: 'homeopathy',          icon: '🩸', description: 'Homeopathic diabetes care' },
  { id: 'homeo-cold-cough',     name: 'Cold Cough & Fever',      parent_id: 'homeopathy',          icon: '🤧', description: 'Homeopathic cold and cough remedies' },
  { id: 'homeo-stomach',        name: 'Stomach & Liver Care',    parent_id: 'homeopathy',          icon: '🫀', description: 'Homeopathic digestive and liver care' },
  { id: 'homeo-immunity',       name: 'Immunity & Wellness',     parent_id: 'homeopathy',          icon: '🛡️', description: 'Homeopathic immunity boosters' },
  { id: 'homeo-womens',         name: "Women's Health (Homeo)",  parent_id: 'homeopathy',          icon: '🌸', description: "Homeopathic women's health products" },
  { id: 'homeo-specific',       name: 'Care for Conditions',     parent_id: 'homeopathy',          icon: '💊', description: 'Homeopathic remedies for specific conditions' },

  // Summer Store
  { id: 'summer-essentials',    name: 'Summer Essentials',       parent_id: 'summer-store',        icon: '☀️', description: 'Must-have products for summer season' },
  { id: 'sunscreen',            name: 'Sunscreen',               parent_id: 'summer-store',        icon: '🌞', description: 'SPF sunscreens for all skin types' },
  { id: 'vitamin-c',            name: 'Vitamin C',               parent_id: 'summer-store',        icon: '🍋', description: 'Vitamin C supplements and serums' },
  { id: 'roll-on',              name: 'Roll-On',                 parent_id: 'summer-store',        icon: '🧴', description: 'Roll-on deodorants and applicators' },
  { id: 'glucose',              name: 'Glucose',                 parent_id: 'summer-store',        icon: '⚡', description: 'Glucose drinks and energy boosters' },
  { id: 'ors',                  name: 'ORS',                     parent_id: 'summer-store',        icon: '💧', description: 'Oral rehydration salts for hydration' },
  { id: 'juices',               name: 'Juices',                  parent_id: 'summer-store',        icon: '🥤', description: 'Health juices and drinks' },
  { id: 'anti-fungal',          name: 'Anti-Fungal Care',        parent_id: 'summer-store',        icon: '🦠', description: 'Anti-fungal treatments and powders' },

  // Health Food & Drinks
  { id: 'health-drinks',        name: 'Health Drinks',           parent_id: 'health-food',         icon: '🥤', description: 'Nutritional and health drinks' },
  { id: 'protein-powders',      name: 'Protein Powders',         parent_id: 'health-food',         icon: '💪', description: 'Whey and plant-based protein powders' },
  { id: 'energy-drinks',        name: 'Energy Drinks',           parent_id: 'health-food',         icon: '⚡', description: 'Sports and energy drinks' },

  // Diabetes Essentials
  { id: 'glucose-monitors',     name: 'Glucose Monitors',        parent_id: 'diabetes-essentials', icon: '📊', description: 'Blood glucose monitoring devices' },
  { id: 'test-strips',          name: 'Test Strips',             parent_id: 'diabetes-essentials', icon: '🩺', description: 'Glucose test strips for monitors' },
  { id: 'diabetic-supplements', name: 'Diabetic Supplements',    parent_id: 'diabetes-essentials', icon: '💊', description: 'Supplements formulated for diabetics' },

  // Ayurvedic Care
  { id: 'chyawanprash',         name: 'Chyawanprash',            parent_id: 'ayurvedic',           icon: '🌿', description: 'Traditional chyawanprash formulations' },
  { id: 'herbal-juices',        name: 'Herbal Juices',           parent_id: 'ayurvedic',           icon: '🌱', description: 'Herbal and ayurvedic juices' },
  { id: 'ayurvedic-tablets',    name: 'Ayurvedic Tablets',       parent_id: 'ayurvedic',           icon: '🍃', description: 'Classical ayurvedic tablet formulations' },

  // Mother & Baby Care
  { id: 'baby-care',            name: 'Baby Care',               parent_id: 'mother-baby',         icon: '👶', description: 'Baby care essentials and products' },
  { id: 'diapers',              name: 'Diapers',                 parent_id: 'mother-baby',         icon: '🧷', description: 'Diapers and rash creams for babies' },
  { id: 'baby-food',            name: 'Baby Food',               parent_id: 'mother-baby',         icon: '🍼', description: 'Nutritional food for infants and toddlers' },
  { id: 'mother-nutrition',     name: 'Mother Nutrition',        parent_id: 'mother-baby',         icon: '🌸', description: 'Nutritional supplements for mothers' },

  // Mobility & Elderly Care
  { id: 'walking-aids',         name: 'Walking Aids',            parent_id: 'elderly-care',        icon: '🦯', description: 'Walking sticks, crutches, and rollators' },
  { id: 'adult-diapers',        name: 'Adult Diapers',           parent_id: 'elderly-care',        icon: '🧷', description: 'Adult incontinence care products' },
  { id: 'ortho-support',        name: 'Ortho Support',           parent_id: 'elderly-care',        icon: '🦴', description: 'Knee caps, braces, and ortho support products' },
  { id: 'senior-supplements',   name: 'Senior Supplements',      parent_id: 'elderly-care',        icon: '💊', description: 'Vitamins and supplements for senior health' },
];

// ─── Sample products for subcategories ────────────────────────────────────────
const SUBCATEGORY_PRODUCTS = [
  {
    name: 'OneTouch Select Plus Glucometer Kit',
    brand: 'Johnson & Johnson',
    category_id: 'glucose-monitors',
    mrp: 1299.00, price: 999.00, discount_percent: 23,
    stock: 60, sku: 'PP-GM-001',
    description: 'Easy to use blood glucose monitoring system with 10 free test strips.',
    usage_instructions: 'Follow the device manual. Prick fingertip, apply blood to strip.',
    side_effects: 'None.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    is_featured: true, is_bestseller: true, rating: 4.7, review_count: 2301,
  },
  {
    name: 'Accu-Chek Active Test Strips (25 Strips)',
    brand: 'Accu-Chek',
    category_id: 'test-strips',
    mrp: 799.00, price: 699.00, discount_percent: 12,
    stock: 150, sku: 'PP-TS-001',
    description: 'Compatible test strips for Accu-Chek Active glucometer.',
    usage_instructions: 'Insert strip into meter and apply blood drop.',
    side_effects: 'None.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    is_featured: false, is_bestseller: true, rating: 4.6, review_count: 1850,
  },
  {
    name: 'Lotus Herbals Sunscreen SPF 70 PA+++ 50g',
    brand: 'Lotus Herbals',
    category_id: 'sunscreen',
    mrp: 425.00, price: 349.00, discount_percent: 17,
    stock: 200, sku: 'PP-SC-001',
    description: 'Broad-spectrum SPF 70 sunscreen lotion with matte finish for oily skin.',
    usage_instructions: 'Apply generously 20 min before sun exposure. Reapply every 2 hours.',
    side_effects: 'None. Patch test before first use.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    is_featured: true, is_bestseller: true, rating: 4.5, review_count: 3102,
  },
  {
    name: 'Electral ORS Orange Flavour (5 Sachets)',
    brand: 'Electral',
    category_id: 'ors',
    mrp: 85.00, price: 72.00, discount_percent: 15,
    stock: 500, sku: 'PP-ORS-001',
    description: 'WHO-recommended oral rehydration salt sachets for dehydration.',
    usage_instructions: 'Dissolve 1 sachet in 1 litre of water. Sip throughout the day.',
    side_effects: 'None.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    is_featured: false, is_bestseller: true, rating: 4.8, review_count: 4210,
  },
  {
    name: 'Himalaya Nourishing Skin Cream 50ml',
    brand: 'Himalaya',
    category_id: 'moisturizers',
    mrp: 120.00, price: 99.00, discount_percent: 17,
    stock: 300, sku: 'PP-MOIS-001',
    description: 'Gentle herbal moisturizing cream for soft and supple skin all day.',
    usage_instructions: 'Apply twice daily on clean skin.',
    side_effects: 'None for normal skin.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e68fc?w=400',
    is_featured: true, is_bestseller: true, rating: 4.6, review_count: 5670,
  },
  {
    name: 'Pantene Anti-Hair Fall Shampoo 340ml',
    brand: 'P&G',
    category_id: 'shampoo',
    mrp: 349.00, price: 299.00, discount_percent: 14,
    stock: 180, sku: 'PP-SHMP-001',
    description: 'Strengthens weak hair from roots to tips to fight hair fall.',
    usage_instructions: 'Apply to wet hair, lather, and rinse. Repeat if necessary.',
    side_effects: 'None for normal use.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    is_featured: false, is_bestseller: true, rating: 4.4, review_count: 2104,
  },
  {
    name: 'Ensure Gold Vanilla 400g (Senior Nutrition)',
    brand: 'Abbott',
    category_id: 'senior-supplements',
    mrp: 1299.00, price: 1099.00, discount_percent: 15,
    stock: 90, sku: 'PP-SEN-001',
    description: 'Complete nutrition formula specially designed for the elderly.',
    usage_instructions: 'Mix 5 level scoops in 180ml water. Take twice daily.',
    side_effects: 'None. Consult doctor if diabetic.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    is_featured: true, is_bestseller: false, rating: 4.7, review_count: 870,
  },
  {
    name: 'Tynor Wrist Splint Medium',
    brand: 'Tynor',
    category_id: 'ortho-support',
    mrp: 599.00, price: 479.00, discount_percent: 20,
    stock: 65, sku: 'PP-OS-001',
    description: 'Wrist splint for carpal tunnel syndrome, sprains, and post-fracture support.',
    usage_instructions: 'Wear snugly around the wrist as needed.',
    side_effects: 'None.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    is_featured: false, is_bestseller: true, rating: 4.4, review_count: 1237,
  },
  {
    name: 'Mama Earth Vitamin C Face Wash 100ml',
    brand: 'Mamaearth',
    category_id: 'face-wash',
    mrp: 249.00, price: 199.00, discount_percent: 20,
    stock: 220, sku: 'PP-FW-001',
    description: 'Brightening face wash with Vitamin C and turmeric for radiant skin.',
    usage_instructions: 'Apply on wet face, massage gently, and rinse.',
    side_effects: 'None.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e68fc?w=400',
    is_featured: true, is_bestseller: true, rating: 4.5, review_count: 6500,
  },
  {
    name: 'MuscleBlaze Whey Gold 1kg Chocolate',
    brand: 'MuscleBlaze',
    category_id: 'protein-powders',
    mrp: 2099.00, price: 1699.00, discount_percent: 19,
    stock: 70, sku: 'PP-PP-001',
    description: '25g whey protein per serving for lean muscle growth and recovery.',
    usage_instructions: 'Mix 1 scoop in 200ml cold water or milk post workout.',
    side_effects: 'None at recommended dosage.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    is_featured: true, is_bestseller: true, rating: 4.6, review_count: 4320,
  },
  {
    name: 'Himalaya Chyawanprasha 500g',
    brand: 'Himalaya',
    category_id: 'chyawanprash',
    mrp: 349.00, price: 299.00, discount_percent: 14,
    stock: 150, sku: 'PP-CHP-001',
    description: 'Traditional Chyawanprash with 40+ herbs for immunity and vitality.',
    usage_instructions: 'Take 1-2 teaspoons twice daily with warm milk.',
    side_effects: 'None.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    is_featured: true, is_bestseller: true, rating: 4.7, review_count: 3890,
  },
  {
    name: 'Pampers Active Baby Diapers Size M (64 Count)',
    brand: 'Pampers',
    category_id: 'diapers',
    mrp: 1299.00, price: 1049.00, discount_percent: 19,
    stock: 100, sku: 'PP-DIAP-001',
    description: 'Super soft diapers with up to 12-hour protection for your baby.',
    usage_instructions: 'Secure firmly around baby waist. Change every 4-6 hours.',
    side_effects: 'None.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    is_featured: false, is_bestseller: true, rating: 4.6, review_count: 5101,
  },
  {
    name: 'Manforce Extra Pleasure Condoms (10s)',
    brand: 'Mankind',
    category_id: 'condoms',
    mrp: 199.00, price: 159.00, discount_percent: 20,
    stock: 400, sku: 'PP-CON-001',
    description: 'Lubricated dotted condoms for enhanced pleasure and comfort.',
    usage_instructions: 'Use one per session as directed on pack.',
    side_effects: 'None for non-latex allergy users.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    is_featured: false, is_bestseller: true, rating: 4.3, review_count: 2109,
  },
  {
    name: 'Baidyanath Shilajit Gold 20 Capsules',
    brand: 'Baidyanath',
    category_id: 'shilajit',
    mrp: 599.00, price: 489.00, discount_percent: 18,
    stock: 120, sku: 'PP-SHI-001',
    description: 'Shilajit gold capsules with Ashwagandha for stamina and vitality.',
    usage_instructions: 'Take 1 capsule twice daily with warm milk.',
    side_effects: 'None at recommended dosage.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
    is_featured: false, is_bestseller: true, rating: 4.4, review_count: 1780,
  },
  {
    name: 'Glucose D Powder Orange 500g',
    brand: 'Heinz',
    category_id: 'glucose',
    mrp: 149.00, price: 119.00, discount_percent: 20,
    stock: 350, sku: 'PP-GLU-001',
    description: 'Glucose with essential vitamins for instant energy during summer.',
    usage_instructions: 'Mix 2-3 teaspoons in a glass of cold water and drink.',
    side_effects: 'None for normal intake.',
    prescription_required: false,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    is_featured: false, is_bestseller: true, rating: 4.5, review_count: 3210,
  },
];

async function run() {
  console.log('\n🚀 Starting subcategory setup...\n');

  // ── Step 1: Insert subcategories ──────────────────────────────────────────
  console.log('Step 1: Inserting subcategories...');
  let inserted = 0, failed = 0;
  for (const cat of SUBCATEGORIES) {
    const { error } = await supabase
      .from('categories')
      .upsert({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      }, { onConflict: 'id' });

    if (error) {
      console.log(`  ❌ Failed: ${cat.name} — ${error.message}`);
      failed++;
    } else {
      console.log(`  ✅ ${cat.name} (parent: ${cat.parent_id})`);
      inserted++;
    }
  }
  console.log(`\n  📊 Subcategories: ${inserted} inserted, ${failed} failed`);

  // ── Step 2: Insert sample products ───────────────────────────────────────
  console.log('\nStep 2: Inserting sample products for subcategories...');
  let prodInserted = 0, prodFailed = 0;
  for (const p of SUBCATEGORY_PRODUCTS) {
    const { error } = await supabase
      .from('products')
      .upsert({ sku: p.sku, ...p }, { onConflict: 'sku' });

    if (error) {
      console.log(`  ❌ Failed: ${p.name} — ${error.message}`);
      prodFailed++;
    } else {
      console.log(`  ✅ ${p.name} → ${p.category_id}`);
      prodInserted++;
    }
  }
  console.log(`\n  📊 Products: ${prodInserted} inserted, ${prodFailed} failed`);

  console.log('\n✅ All done!\n');
}

run().catch(console.error);
