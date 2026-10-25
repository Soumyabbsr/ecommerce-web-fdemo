-- ==============================================================================
-- Production Shopify-Grade E-Commerce & Admin Database Schema for Supabase
-- Brand: Leafora Herbal Private Limited (Healing Naturally)
-- ==============================================================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Products Table with SKU, Stock, Multi-Images, Rich Sections
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    sku TEXT,
    description TEXT,
    description_sections JSONB DEFAULT '[]'::jsonb,
    description_images TEXT[] DEFAULT ARRAY[]::TEXT[],
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
    dosage TEXT,
    ingredients_list JSONB DEFAULT '[]'::jsonb,
    price NUMERIC NOT NULL,
    original_price NUMERIC NOT NULL,
    save_amount NUMERIC NOT NULL DEFAULT 0,
    discount_percent NUMERIC DEFAULT 0,
    image_url TEXT NOT NULL,
    badge TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 100,
    category TEXT DEFAULT 'General',
    category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Orders Table with Tracking & Payment Status
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    total_amount NUMERIC NOT NULL,
    discount_amount NUMERIC DEFAULT 0,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('COD', 'Prepaid')),
    payment_status TEXT NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled')),
    tracking_number TEXT,
    courier_partner TEXT,
    estimated_delivery TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Super Admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 6. Safe Policies (Public Read/Write for Storefront & Admin)
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public Read Categories" ON categories;
    DROP POLICY IF EXISTS "Public Manage Categories" ON categories;
    DROP POLICY IF EXISTS "Public Read Products" ON products;
    DROP POLICY IF EXISTS "Public Manage Products" ON products;
    DROP POLICY IF EXISTS "Public Create Orders" ON orders;
    DROP POLICY IF EXISTS "Public Read Orders" ON orders;
    DROP POLICY IF EXISTS "Public Update Orders" ON orders;
    DROP POLICY IF EXISTS "Public Read Admin Users" ON admin_users;
    DROP POLICY IF EXISTS "Public Manage Admin Users" ON admin_users;
END $$;

CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Manage Categories" ON categories FOR ALL USING (true);

CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Manage Products" ON products FOR ALL USING (true);

CREATE POLICY "Public Create Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public Update Orders" ON orders FOR UPDATE USING (true);

CREATE POLICY "Public Read Admin Users" ON admin_users FOR SELECT USING (true);
CREATE POLICY "Public Manage Admin Users" ON admin_users FOR ALL USING (true);

-- 7. Clean Legacy Height Veda Products/Categories (if present)
DELETE FROM products WHERE id IN ('prod-1', 'prod-2', 'prod-3', 'prod-4') OR sku LIKE 'HV-%';
DELETE FROM categories WHERE id IN ('cat-1', 'cat-2', 'cat-3', 'cat-4') OR slug IN ('full-kit', 'combo', 'capsules', 'powder');

-- 8. Seed Leafora Herbal Categories
INSERT INTO categories (id, name, slug, description, image_url)
VALUES
(
    'cat-vitality',
    'Men''s Vitality & Stamina',
    'mens-vitality',
    'Ayurvedic formulations for strength, endurance, cellular stamina, and peak performance',
    '/products/josh-1000.jpg'
),
(
    'cat-diabetes',
    'Diabetes & Sugar Care',
    'diabetes-care',
    'Time-tested herbal botanicals for healthy glycemic control, insulin sensitivity, and pancreatic support',
    '/products/stop-sugar.jpg'
),
(
    'cat-combos',
    'Complete Regimen Packs',
    'combos',
    'Synergistic oral capsules and topical herbal oils for comprehensive wellness',
    '/products/time-master-combo.jpg'
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- 9. Seed Leafora Herbal Products (4 Real Formulas)
INSERT INTO products (
    id, name, slug, tagline, sku, description,
    price, original_price, save_amount, discount_percent,
    image_url, images, badge, is_featured, in_stock, stock_quantity,
    category, category_id, highlights, dosage, ingredients_list
)
VALUES
(
    'prod-josh-1000',
    'Josh 1000 Capsule',
    'josh-1000-capsule',
    'Boost Stamina · Increase Energy · Improve Vitality (30 Capsules)',
    'LEA-JOSH-1000',
    'Josh 1000 is Leafora Herbal Private Limited''s flagship vitality formula designed for modern active men. Formulated with 100% pure standardized herbal extracts including Shuddha Shilajit, Ashwagandha, Safed Musli, and Kaunch Beej, it naturally restores stamina, revitalizes cellular ATP energy, reduces stress fatigue, and enhances physical vigor without steroids or side effects.',
    899,
    2999,
    2100,
    70,
    '/products/josh-1000.jpg',
    ARRAY['/products/josh-1000.jpg'],
    '🔥 70% OFF · Best Seller',
    TRUE,
    TRUE,
    320,
    'Men''s Vitality & Stamina',
    'cat-vitality',
    ARRAY[
        'Pure Shuddha Shilajit with 60%+ Fulvic Acid for cellular ATP endurance',
        'Clinically proven Ashwagandha & Safed Musli for vigor and stress control',
        '100% Natural Ayurvedic botanical extracts, non-hormonal, non-habit forming',
        'Zero synthetic steroids or artificial chemicals, Ayush Certified',
        'Visible results within 2 to 3 weeks of consistent daily usage'
    ],
    'Take 1 capsule twice daily with warm milk or lukewarm water, 30 minutes after meals. Minimum 60 days recommended for best results.',
    '[
        {"name": "Shuddha Shilajit", "amount": "150mg", "purpose": "ATP energy, testosterone support & cellular stamina"},
        {"name": "Ashwagandha (Withania Somnifera)", "amount": "150mg", "purpose": "Lowers cortisol, boosts endurance & strength"},
        {"name": "Safed Musli (Chlorophytum Borivilianum)", "amount": "100mg", "purpose": "Deep tissue nourishment & vitality"},
        {"name": "Kaunch Beej & Gokshura", "amount": "100mg", "purpose": "Microcirculation & muscle recovery"}
    ]'::jsonb
),
(
    'prod-time-master',
    'Time Master Performance Combo (Oil + Capsule)',
    'time-master-combo',
    'Instant Topical Action Oil (80ml) + 60 Stamina Capsules · Complete Regimen',
    'LEA-TM-COMBO',
    'Time Master by Leafora Herbal Private Limited is a specialized dual-action regimen uniting internal Rasayana nourishment and external Ayurvedic herbal oil application. The 60 herbal capsules work internally to rebuild nerve vigor and tissue strength, while the 80ml concentrated herbal oil provides instant local circulation and vitality without numbness or synthetic chemicals.',
    1499,
    4999,
    3500,
    70,
    '/products/time-master-combo.jpg',
    ARRAY['/products/time-master-combo.jpg'],
    '👑 70% OFF · Complete Dual Regimen',
    TRUE,
    TRUE,
    180,
    'Men''s Vitality & Stamina',
    'cat-vitality',
    ARRAY[
        'Dual-action internal capsules + external therapeutic herbal oil',
        'Topical herbal oil enhances local microvascular circulation safely',
        'Deep nervous system tonic: calms anxiety while multiplying endurance',
        'Enriched with Jyotishmati, Malkangani, Jaiphal, Akarkara & Clove oil',
        '100% Ayurvedic, Non-sticky, Fast absorbing, Zero numbness'
    ],
    'Capsules: 1 capsule morning and night with warm milk. Oil: Massage 5-7 drops gently for 3-5 minutes daily before bedtime.',
    '[
        {"name": "Jyotishmati & Malkangani Oil", "amount": "30%", "purpose": "Nerve stimulation and tissue tone"},
        {"name": "Jaiphal & Akarkara Extract", "amount": "25%", "purpose": "Microvascular circulation & sensory control"},
        {"name": "Shilajit & Ashwagandha (Capsules)", "amount": "300mg", "purpose": "Systemic stamina and vigor"},
        {"name": "Sesame & Clove Herbal Base", "amount": "20%", "purpose": "Deep dermal penetration"}
    ]'::jsonb
),
(
    'prod-stop-sugar',
    'Stop Sugar Anti-Diabetic Powder',
    'stop-sugar-powder',
    'मधुमेह विनाशक चूर्ण · Natural Blood Sugar & Pancreatic Care',
    'LEA-STOP-SUGAR',
    'Stop Sugar (मधुमेह विनाशक चूर्ण) is an authentic time-tested Ayurvedic botanical formulation by Leafora Herbal Private Limited. Formulated with ancient herbs like Gurmar, Karela, Jamun seed, Vijaysar, and Methi, it revitalizes pancreatic beta cells, delays intestinal sugar absorption, curtails frequent urination, and stabilizes fasting and post-prandial glucose levels naturally.',
    799,
    2699,
    1900,
    70,
    '/products/stop-sugar.jpg',
    ARRAY['/products/stop-sugar.jpg'],
    '🌿 70% OFF · Proven Sugar Support',
    TRUE,
    TRUE,
    260,
    'Diabetes & Sugar Care',
    'cat-diabetes',
    ARRAY[
        'Helps maintain healthy fasting & post-meal blood sugar levels',
        'Gurmar extract naturally diminishes sugar cravings and absorption',
        'Rejuvenates pancreatic beta cells to support healthy insulin response',
        'Alleviates chronic diabetic lethargy, fatigue and excessive thirst',
        '100% Pure micro-pulverized organic herbs, no chemicals'
    ],
    'Mix 1 teaspoon (3-5g) with a glass of lukewarm water twice daily, 30 minutes before breakfast and dinner.',
    '[
        {"name": "Gurmar (Gymnema Sylvestre)", "amount": "25%", "purpose": "Blocks sugar receptors & supports pancreas"},
        {"name": "Jamun Seed (Syzygium Cumini)", "amount": "20%", "purpose": "Retards starch-to-sugar conversion"},
        {"name": "Karela (Momordica Charantia)", "amount": "20%", "purpose": "Plant polypeptide-P for glucose uptake"},
        {"name": "Vijaysar (Pterocarpus Marsupium)", "amount": "15%", "purpose": "Restores pancreatic beta-cell health"},
        {"name": "Methi & Neem", "amount": "20%", "purpose": "Insulin sensitivity & blood purification"}
    ]'::jsonb
),
(
    'prod-diasure-powder',
    'Diasure Herb Powder',
    'diasure-herb-powder',
    'Blend of 15 Potent Herbs for Managing Sugar Levels & Pancreatic Health (200g)',
    'LEA-DIASURE-200',
    'Diasure Herb Powder is Leafora Herbal Private Limited''s clinical-grade botanical complex combining 15 potent Ayurvedic herbs. Engineered specifically for individuals with borderline or chronic high sugar levels, it optimizes carbohydrate metabolism, defends kidney and liver microvasculature from diabetic complications, and restores daily physical energy.',
    899,
    2999,
    2100,
    70,
    '/products/diasure-powder.jpg',
    ARRAY['/products/diasure-powder.jpg'],
    '⭐ 70% OFF · 15 Herb Formula',
    TRUE,
    TRUE,
    210,
    'Diabetes & Sugar Care',
    'cat-diabetes',
    ARRAY[
        'Master synergy of 15 sacred Ayurvedic herbs for glucose metabolism',
        'Improves HbA1c levels and stabilizes glycemic fluctuations',
        'Protects renal and ocular health from chronic high glucose damage',
        'Natural bitter tonics enhance digestive Agni and metabolic rate',
        'GMP Quality certified, lab-tested for heavy metals and purity'
    ],
    '1 scoop (approx 5g) dissolved in warm water once in the morning on empty stomach and once at night before bedtime.',
    '[
        {"name": "Gudmar & Jamun Seed", "amount": "30%", "purpose": "Targeted pancreatic islet stimulation"},
        {"name": "Vijaysar Bark & Giloy", "amount": "25%", "purpose": "Glycemic moderation & immune protection"},
        {"name": "Karela & Daruharidra", "amount": "20%", "purpose": "Hepatic glucose management"},
        {"name": "Methi, Bilva & Triphala", "amount": "25%", "purpose": "Gut absorption & metabolic balance"}
    ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    tagline = EXCLUDED.tagline,
    sku = EXCLUDED.sku,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    save_amount = EXCLUDED.save_amount,
    discount_percent = EXCLUDED.discount_percent,
    image_url = EXCLUDED.image_url,
    images = EXCLUDED.images,
    badge = EXCLUDED.badge,
    highlights = EXCLUDED.highlights,
    dosage = EXCLUDED.dosage,
    ingredients_list = EXCLUDED.ingredients_list,
    category = EXCLUDED.category,
    category_id = EXCLUDED.category_id;

-- 10. Seed Default Admin User (username: admin / password: soumya!nSUPA09)
INSERT INTO admin_users (id, username, password_hash, name, role)
VALUES (
    'admin-1',
    'admin',
    'c787d3dc84f0f16dba3521d9e3ac82e8c8b189335e790be5bee43dc342eb193d',
    'Leafora Herbal Administrator',
    'Super Admin'
)
ON CONFLICT (id) DO UPDATE SET
    name = 'Leafora Herbal Administrator',
    password_hash = EXCLUDED.password_hash;
