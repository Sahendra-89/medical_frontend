-- =====================================================================
-- Paridhi Pharma – Supabase Schema
-- Run this entire file in your Supabase SQL Editor
-- =====================================================================

-- ── 1. profiles (extends auth.users) ─────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  phone       text,
  role        text not null default 'user',   -- 'user' | 'admin' | 'b2b'
  status      text not null default 'active',
  created_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile"  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admin full access on profiles" on public.profiles for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ── 2. categories ─────────────────────────────────────────────────────
create table if not exists public.categories (
  id          text primary key,
  name        text not null,
  description text,
  icon        text,
  image       text,
  created_at  timestamptz not null default now()
);
alter table public.categories enable row level security;
create policy "Anyone can read categories" on public.categories for select using (true);
create policy "Admin can manage categories" on public.categories for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ── 3. products ────────────────────────────────────────────────────────
create table if not exists public.products (
  id                  serial primary key,
  name                text not null,
  brand               text,
  category_id         text references public.categories(id),
  mrp                 numeric(10,2),
  discount_percent    numeric(5,2) default 0,
  price               numeric(10,2),
  stock               integer default 0,
  sku                 text unique,
  description         text,
  usage_instructions  text,
  side_effects        text,
  prescription_required boolean default false,
  image               text,
  is_featured         boolean default false,
  is_bestseller       boolean default false,
  rating              numeric(3,1) default 0,
  review_count        integer default 0,
  created_at          timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "Anyone can read products" on public.products for select using (true);
create policy "Admin can manage products" on public.products for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ── 4. medicines ───────────────────────────────────────────────────────
create table if not exists public.medicines (
  id              serial primary key,
  medicine_name   text not null,
  company_name    text,
  price           numeric(10,2),
  category        text,
  description     text,
  usage           text,
  dosage          text,
  side_effects    text,
  precautions     text,
  stock_quantity  integer default 0,
  image_url       text,
  slug            text unique,
  created_at      timestamptz not null default now()
);
alter table public.medicines enable row level security;
create policy "Anyone can read medicines" on public.medicines for select using (true);
create policy "Admin can manage medicines" on public.medicines for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ── 5. orders ──────────────────────────────────────────────────────────
create table if not exists public.orders (
  id              text primary key default ('ORD-' || upper(substring(gen_random_uuid()::text, 1, 8))),
  user_id         uuid references auth.users(id),
  customer_name   text,
  customer_email  text,
  customer_phone  text,
  address         jsonb,
  items           jsonb,
  subtotal        numeric(10,2),
  discount        numeric(10,2) default 0,
  delivery_fee    numeric(10,2) default 0,
  total           numeric(10,2),
  coupon_code     text,
  payment_method  text,
  payment_status  text default 'pending',
  status          text default 'pending',
  notes           text,
  created_at      timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can create orders" on public.orders for insert with check (true);
create policy "Admin full access on orders" on public.orders for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ── 6. prescriptions ───────────────────────────────────────────────────
create table if not exists public.prescriptions (
  id                text primary key default ('RX-' || upper(substring(gen_random_uuid()::text, 1, 8))),
  user_id           uuid references auth.users(id),
  patient_name      text,
  doctor_name       text,
  hospital          text,
  image_url         text,
  image_data        text,  -- base64 for small uploads
  notes             text,
  medicines_needed  text,
  approval_status   text default 'pending',  -- pending | approved | rejected
  created_at        timestamptz not null default now()
);
alter table public.prescriptions enable row level security;
create policy "Users can view own prescriptions" on public.prescriptions for select using (auth.uid() = user_id);
create policy "Anyone can upload prescriptions" on public.prescriptions for insert with check (true);
create policy "Admin full access on prescriptions" on public.prescriptions for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ── 7. blogs ───────────────────────────────────────────────────────────
create table if not exists public.blogs (
  id          text primary key,
  title       text not null,
  excerpt     text,
  content     text,
  category    text,
  author      text,
  date        text,
  read_time   text,
  image       text,
  created_at  timestamptz not null default now()
);
alter table public.blogs enable row level security;
create policy "Anyone can read blogs" on public.blogs for select using (true);
create policy "Admin can manage blogs" on public.blogs for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ── 8. coupons ─────────────────────────────────────────────────────────
create table if not exists public.coupons (
  code              text primary key,
  type              text not null,  -- 'percent' | 'flat'
  discount_value    numeric(10,2),
  min_order_value   numeric(10,2),
  max_discount      numeric(10,2),
  is_active         boolean default true,
  created_at        timestamptz not null default now()
);
alter table public.coupons enable row level security;
create policy "Anyone can read active coupons" on public.coupons for select using (true);
create policy "Admin can manage coupons" on public.coupons for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ── 9. inquiries ───────────────────────────────────────────────────────
create table if not exists public.inquiries (
  id          text primary key default ('INQ-' || upper(substring(gen_random_uuid()::text, 1, 6))),
  name        text,
  email       text,
  phone       text,
  subject     text,
  message     text,
  status      text default 'pending',
  created_at  timestamptz not null default now()
);
alter table public.inquiries enable row level security;
create policy "Anyone can submit inquiries" on public.inquiries for insert with check (true);
create policy "Admin can manage inquiries" on public.inquiries for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- =====================================================================
-- SEED DATA
-- =====================================================================

-- Categories
insert into public.categories (id, name, description, icon, image) values
  ('must-haves',       'Must Haves',               'Daily essentials and top-selling health products',         '⭐', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'),
  ('vitamin-store',    'Vitamin Store',             'Vitamins, multivitamins, Biotin & supplements',            '💊', 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400'),
  ('sexual-wellness',  'Sexual Wellness',           'Sexual health & wellness products',                        '❤️', 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400'),
  ('personal-care',    'Personal Care',             'Skincare, haircare & daily hygiene essentials',            '🧴', 'https://images.unsplash.com/photo-1556228720-195a672e68fc?w=400'),
  ('homeopathy',       'Homeopathy Care',           'Homeopathic medicines & natural remedies',                 '🔬', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400'),
  ('summer-store',     'Summer Store',              'Sunscreens, electrolytes & summer health essentials',      '☀️', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'),
  ('health-food',      'Health Food & Drinks',      'Protein, nutrition drinks & healthy snacks',               '🥤', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400'),
  ('diabetes-essentials','Diabetes Essentials',     'Glucometers, test strips & diabetic care products',        '🩸', 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400'),
  ('ayurvedic',        'Ayurvedic Care',            'Authentic Ayurvedic medicines & herbal products',          '🌱', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'),
  ('mother-baby',      'Mother & Baby Care',        'Baby nutrition, diapers & mother wellness products',       '👶', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400'),
  ('elderly-care',     'Mobility & Elderly Care',   'Mobility aids, orthopaedic & senior care products',        '🦯', 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400'),
  ('otc',              'OTC Medicines',             'Over-the-counter medicines for common ailments',           '💉', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'),
  ('prescription',     'Prescription Drugs',        'Prescription medicines — doctor verification required',    '📋', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'),
  ('devices',          'Medical Devices',           'BP monitors, glucometers & health monitoring devices',     '🩺', 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400'),
  ('wellness',         'Wellness & Nutrition',      'General wellness supplements & nutrition products',         '🌿', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400')
on conflict (id) do nothing;

-- Products
insert into public.products (id, name, brand, category_id, mrp, discount_percent, price, stock, sku, description, usage_instructions, side_effects, prescription_required, image, is_featured, is_bestseller, rating, review_count) values
  (1,  'Crocin Advance 500mg (15 Tablets)',         'GSK',              'otc',              42.00,   15, 35.70,   250, 'PP-OTC-001', 'Crocin Advance contains Paracetamol 500mg for fast relief from fever and pain.', 'Take 1-2 tablets every 4-6 hours.', 'Rare nausea.', false, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', true,  true,  4.5, 234),
  (2,  'Vicks VapoRub 50g',                         'P&G',              'otc',             145.00,   10, 130.50,  300, 'PP-OTC-002', 'Vicks VapoRub provides multi-symptom relief from cold and cough.', 'Apply gently on chest and throat.', 'Mild skin irritation.', false, 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', true,  true,  4.7, 567),
  (3,  'Digene Antacid Gel Mint 200ml',             'Abbott',           'otc',             115.00,   12, 101.20,  150, 'PP-OTC-003', 'Fast-acting antacid gel providing quick relief from acidity.', 'Take 1-2 teaspoons after meals.', 'None.', false, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400', false, true,  4.3, 189),
  (5,  'Amoxicillin 500mg (Strip of 10)',           'Cipla',            'prescription',     85.00,   20, 68.00,   120, 'PP-RX-001',  'Broad-spectrum antibiotic used to treat bacterial infections.', 'Take as prescribed by doctor.', 'Nausea, skin rash.', true, 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400', true,  false, 4.5, 156),
  (6,  'Metformin 500mg (Strip of 15)',             'USV',              'prescription',     42.00,   25, 31.50,   350, 'PP-RX-002',  'Oral anti-diabetic medicine for Type 2 diabetes management.', 'Take with meals as prescribed.', 'Stomach upset.', true, 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400', false, true,  4.3, 298),
  (9,  'Omron HEM-7120 Automatic BP Monitor',      'Omron',            'devices',        1999.00,   25, 1499.25, 45,  'PP-DEV-001', 'Automatic upper arm blood pressure monitor.', 'Wrap cuff securely around upper arm.', 'None.', false, 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400', true,  true,  4.7, 892),
  (12, 'Himalaya Liv.52 Tablets (100 Tablets)',     'Himalaya',         'wellness',        175.00,   15, 148.75,  400, 'PP-WEL-001', 'Ayurvedic hepatoprotective supplement for liver care.', 'Take 2 tablets twice daily.', 'None.', false, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', true,  true,  4.4, 1567),
  (15, 'Cetaphil Gentle Skin Cleanser 250ml',       'Cetaphil',         'personal-care',   545.00,   15, 463.25,  90,  'PP-PC-001',  'Gentle, non-irritating skin cleanser for sensitive skin.', 'Apply to skin and rinse.', 'None.', false, 'https://images.unsplash.com/photo-1556228720-195a672e68fc?w=400', true,  true,  4.7, 1234),
  (17, 'Johnson''s Baby Powder 400g',               'Johnson & Johnson', 'mother-baby',    299.00,   12, 263.12,  180, 'PP-BC-001',  'Mild baby powder that absorbs excess moisture.', 'Smooth onto baby skin.', 'Avoid inhalation.', false, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', true,  false, 4.4, 987),
  (20, 'HealthKart Multivitamin for Men 60 Tablets','HealthKart',       'vitamin-store',   799.00,   25, 599.25,  200, 'PP-VIT-001', 'Complete multivitamin formula with 25+ vitamins & minerals for daily wellness.', 'Take 1 tablet daily with meals.', 'None known.', false, 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400', true,  true,  4.5, 892),
  (21, 'Himalaya Biotin 10000mcg 60 Tablets',       'Himalaya',         'vitamin-store',   649.00,   20, 519.20,  150, 'PP-VIT-002', 'High-potency Biotin supplement for healthy hair, skin and nails.', 'Take 1 tablet daily.', 'None.', false, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', true,  true,  4.6, 1456),
  (22, 'GNC Vitamin C 500mg 60 Tablets',            'GNC',              'vitamin-store',   449.00,   18, 368.18,  300, 'PP-VIT-003', 'Vitamin C 500mg with Rose Hips for immune system support.', 'Take 1-2 tablets daily with water.', 'None at recommended dosage.', false, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400', false, true,  4.4, 673),
  (23, 'HealthKart Vitamin D3 2000 IU 60 Softgels', 'HealthKart',       'vitamin-store',   599.00,   22, 467.22,  180, 'PP-VIT-004', 'Vitamin D3 softgels for bone health, immunity and mood regulation.', 'Take 1 softgel daily with a fat-containing meal.', 'None at recommended dosage.', false, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', true,  false, 4.7, 1102),
  (24, 'Now Foods Omega-3 Fish Oil 180 Softgels',   'Now Foods',        'vitamin-store',  1299.00,   15, 1104.15, 90,  'PP-VIT-005', 'Premium Omega-3 fish oil with EPA & DHA for heart and brain health.', 'Take 2 softgels daily with meals.', 'Mild fishy aftertaste.', false, 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400', false, true,  4.5, 543),
  (25, 'Himalaya Liv.52 DS 60 Tablets',             'Himalaya',         'ayurvedic',       299.00,   10, 269.10,  500, 'PP-AYU-001', 'Double-strength Liv.52 for liver protection and appetite improvement.', 'Take 1-2 tablets twice daily.', 'None.', false, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', true,  true,  4.6, 2341),
  (26, 'Accu-Chek Active Glucometer Kit',           'Accu-Chek',        'diabetes-essentials', 1195.00, 20, 956.00, 65, 'PP-DIA-001', 'Complete blood glucose monitoring kit with 10 free test strips.', 'Follow device manual for testing.', 'None.', false, 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400', true, true, 4.8, 3412),
  (27, 'Dettol Antiseptic Liquid 250ml',            'Dettol',           'must-haves',      125.00,   10, 112.50,  500, 'PP-MH-001',  'Dettol Antiseptic Liquid for first aid, wound care and household disinfection.', 'Dilute 1:20 with water for skin use.', 'None.', false, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', true,  true,  4.8, 5432),
  (28, 'Crocin Pain Relief Tablet 15s',             'GSK',              'must-haves',       45.00,   12, 39.60,   800, 'PP-MH-002',  'Fast pain relief tablet for headache, body ache and fever.', 'Take 1-2 tablets every 4-6 hours.', 'None.', false, 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400', true,  true,  4.6, 4321),
  (29, 'Manforce Extra Dotted Condoms (10s)',        'Mankind',          'sexual-wellness', 199.00,   20, 159.20,  300, 'PP-SW-001',  'Extra dotted condoms for enhanced pleasure. Lubricated for comfort and safety.', 'Use as directed on pack.', 'None.', false, 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400', false, true,  4.4, 1876),
  (30, 'Banana Boat SPF 50 Sunscreen Lotion 200ml', 'Banana Boat',      'summer-store',    649.00,   18, 532.18,  120, 'PP-SS-001',  'Broad spectrum SPF 50 sunscreen lotion for all-day sun protection.', 'Apply generously 15 mins before sun exposure.', 'None.', false, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', true,  true,  4.5, 987),
  (31, 'Enerzal Electrolyte Drink Powder (5 sachets)','Enerzal',        'summer-store',    125.00,   10, 112.50,  400, 'PP-SS-002',  'ORS electrolyte powder for rapid hydration during summer heat.', 'Mix 1 sachet in 200ml water.', 'None.', false, 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400', false, true,  4.6, 2134),
  (32, 'Ensure Complete Nutrition Vanilla 400g',     'Abbott',           'health-food',     899.00,   12, 791.12,  150, 'PP-HF-001',  'Complete balanced nutrition supplement with 32 essential nutrients for adults.', 'Mix 6 scoops in 200ml water. Take twice daily.', 'None.', false, 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400', true, true, 4.7, 3241),
  (33, 'MuscleBlaze Whey Protein 1kg Chocolate',    'MuscleBlaze',      'health-food',    1599.00,   22, 1247.22, 80,  'PP-HF-002',  '24g whey protein per serving for muscle recovery and growth.', 'Mix 1 scoop in 200ml cold water. Take post-workout.', 'None at recommended intake.', false, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', false, true, 4.5, 2109),
  (34, 'Himalaya Baby Powder 400g',                 'Himalaya',         'mother-baby',     245.00,   10, 220.50,  200, 'PP-MB-001',  'Gentle baby powder with natural herbs to keep baby skin soft and dry.', 'Apply gently to baby skin after bathing.', 'Avoid inhalation.', false, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', true, true, 4.7, 1543),
  (35, 'Enfamil A+ Follow-On Formula Stage 2 (400g)','Mead Johnson',   'mother-baby',     799.00,    8, 735.08,   90, 'PP-MB-002',  'Follow-on formula for infants 6-12 months with DHA for brain development.', 'As directed by paediatrician.', 'None.', false, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', false, true, 4.6, 876),
  (36, 'Tynor Knee Cap (Medium)',                   'Tynor',            'elderly-care',    449.00,   15, 381.65,   75, 'PP-EC-001',  'Neoprene knee cap for joint support, pain relief and injury prevention.', 'Wear snugly around the knee joint.', 'None.', false, 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400', true, true, 4.5, 1234),
  (37, 'Dr. Morepen Walking Stick Foldable',        'Dr. Morepen',      'elderly-care',    699.00,   20, 559.20,   40, 'PP-EC-002',  'Lightweight foldable aluminium walking stick for elderly mobility support.', 'Adjust to comfortable height before use.', 'None.', false, 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400', false, false, 4.3, 456)
on conflict (id) do nothing;

-- Reset serial sequence so new inserts don't collide
select setval('public.products_id_seq', (select max(id) from public.products));

-- Blogs
insert into public.blogs (id, title, excerpt, content, category, author, date, read_time, image) values
  ('understanding-generic-vs-branded-medicines',
   'Understanding Generic vs. Branded Medicines: What You Need to Know',
   'Are generic medicines as effective as their branded counterparts? Learn how the FDA and Indian regulatory authorities ensure quality and bioequivalence.',
   'When your doctor prescribes a medicine, you often have a choice between a well-known brand and a generic alternative. Many people wonder: Are generic medicines really as effective as branded ones?

The short answer is yes. Regulatory bodies like the FDA and Indian drug control authorities require generic medicines to have the exact same active pharmaceutical ingredient (API), dosage form, safety profile, strength, and intended use as the branded product.

Why are generics cheaper? Branded pharmaceutical companies invest billions in research, clinical trials, and marketing. Once their patent expires, other manufacturers can produce the medicine without these massive overhead costs, passing the savings directly to the consumer.

At Paridhi Pharma, we ensure all our generic and branded medicines are sourced directly from verified, licensed manufacturers to guarantee 100% bioequivalence and therapeutic success.',
   'Medicine Education', 'Harsh (B.Pharm)', 'May 14, 2026', '4 min read', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600'),

  ('managing-blood-pressure-at-home',
   'How to Accurately Measure & Manage Blood Pressure at Home',
   'A comprehensive guide on using automatic digital BP monitors, avoiding common measurement errors, and maintaining a healthy cardiovascular lifestyle.',
   'High blood pressure (hypertension) is often called the silent killer because it rarely exhibits noticeable symptoms. Regular home monitoring using a reliable automatic digital BP monitor is essential for effective cardiovascular management.

Follow these best practices for an accurate reading:
1. Rest for 5 minutes before taking a measurement. Avoid caffeine, exercise, or smoking for 30 minutes prior.
2. Sit with your back straight, feet flat on the floor, and arm supported on a table at heart level.
3. Wrap the cuff securely around your upper bare arm, about 1 inch above the bend of your elbow.
4. Take two readings 1-2 minutes apart and average the results.

Always log your readings and share them with your healthcare provider during checkups.',
   'Medical Devices', 'Dr. R. Mehta (MBBS)', 'May 10, 2026', '6 min read', 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=600'),

  ('essential-vitamins-for-immune-support',
   'Top 5 Essential Vitamins & Minerals for Year-Round Immune Support',
   'Explore the scientifically backed benefits of Vitamin C, Zinc, Vitamin D3, and Ayurvedic supplements like Liv.52 for boosting your immune system.',
   'Maintaining a robust immune system requires a balanced diet, adequate sleep, and the right micronutrients. Here are the top 5 essential vitamins and minerals supported by clinical research:

1. Vitamin C: A powerful antioxidant that supports cellular immune response and protects against oxidative stress.
2. Vitamin D3: Crucial for activating immune defenses. Many individuals have suboptimal levels and benefit from daily supplementation.
3. Zinc: Essential for normal immune cell function and inflammatory response modulation.
4. B-Complex Vitamins: Support energy metabolism and overall cellular health.
5. Herbal & Ayurvedic Supplements: Time-tested formulations like Himalaya Liv.52 provide excellent hepatoprotective and detoxifying support.

Explore our complete Wellness & Nutrition catalog at Paridhi Pharma to find genuine, high-quality supplements for your family.',
   'Wellness & Nutrition', 'Priya Sharma (Nutritionist)', 'May 2, 2026', '5 min read', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600')
on conflict (id) do nothing;

-- Coupons
insert into public.coupons (code, type, discount_value, min_order_value, max_discount, is_active) values
  ('PARIDHI10', 'percent', 10, 500, 200, true),
  ('FIRST20',   'percent', 20, 300, 300, true),
  ('FLAT100',   'flat',   100, 999, null, true),
  ('HEALTH50',  'flat',    50, 499, null, true)
on conflict (code) do nothing;

-- =====================================================================
-- Auto-create profile row when a new user signs up
-- =====================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'role', 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
