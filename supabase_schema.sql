-- ==============================================================================
-- Production Shopify-Grade E-Commerce & Admin Database Schema for Supabase
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

-- 3. Create Orders / Bookings Table with Full Tracking & Payment Status
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

-- 4. Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 5. Policies
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Manage Categories" ON categories FOR ALL USING (true);

CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Manage Products" ON products FOR ALL USING (true);

CREATE POLICY "Public Create Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public Update Orders" ON orders FOR UPDATE USING (true);

-- 6. Seed Default Categories
INSERT INTO categories (id, name, slug, description, image_url)
VALUES
('cat-1', 'Full Kit', 'full-kit', 'Complete dual-action capsules, herbal tablets, and powder kits for maximum growth', 'https://heightveda.com/wp-content/uploads/2026/10/Vati-Capsuel-Powder-2.webp'),
('cat-2', 'Combo', 'combo', 'Synergistic pairs for accelerated bone mineral absorption and active posture support', 'https://heightveda.com/wp-content/uploads/2026/09/HV-C-P-1.webp'),
('cat-3', 'Capsules', 'capsules', 'Pure standardized herbal extract capsules for daily hormonal and tissue rejuvenation', 'https://heightveda.com/wp-content/uploads/2026/09/Capsule-HV-1.webp'),
('cat-4', 'Powder', 'powder', 'Nutrient-rich calcium matrix powder mix for joint lubrication and bone density', 'https://heightveda.com/wp-content/uploads/2026/09/Powder-HV-1.webp')
ON CONFLICT (id) DO NOTHING;

-- 7. Seed Initial Height Veda Products
INSERT INTO products (id, name, tagline, sku, description, price, original_price, save_amount, discount_percent, image_url, badge, is_featured, in_stock, stock_quantity, category, category_id)
VALUES
(
    'prod-1',
    'Height Veda Kit',
    'Powder + 60 Capsules + 60 Tablets',
    'HV-KIT-001',
    'Complete Ayurvedic Growth formulation with dual-action herbal capsules, vitalizing tablets, and nutrient-dense powder for maximum height growth potential. Enriched with classical Rasayana herbs that nourish the asthi dhatu, activate natural hormone synthesis, and improve spinal alignment.',
    2499,
    6896,
    4397,
    64,
    'https://heightveda.com/wp-content/uploads/2026/10/Vati-Capsuel-Powder-2.webp',
    '★ Featured Kit',
    TRUE,
    TRUE,
    250,
    'Full Kit',
    'cat-1'
),
(
    'prod-2',
    'Combo Pack',
    'Only For Today',
    'HV-CMB-002',
    'Special synergistic dual-pack of Height Veda Powder and herbal booster capsules for accelerated bone and tissue development. Ideal for active teenagers and young adults.',
    2199,
    5897,
    3698,
    63,
    'https://heightveda.com/wp-content/uploads/2026/09/HV-C-P-1.webp',
    'Popular Combo',
    FALSE,
    TRUE,
    180,
    'Combo',
    'cat-2'
),
(
    'prod-3',
    'Capsule',
    '60 Pure Ayurvedic Herbal Capsules',
    'HV-CAP-003',
    'Pure concentrated herbal extract capsules enriched with Ashwagandha, Shatavari, and Safed Musli for hormonal balance and growth plate activation.',
    1899,
    3898,
    1999,
    51,
    'https://heightveda.com/wp-content/uploads/2026/09/Capsule-HV-1.webp',
    '',
    FALSE,
    TRUE,
    320,
    'Capsules',
    'cat-3'
),
(
    'prod-4',
    'Powder',
    '45 Days Nourishment Formula',
    'HV-PWD-004',
    'Easily digestible daily Ayurvedic powder mix rich in plant-based calcium, moringa, amla, and minerals for bone density.',
    1499,
    1999,
    500,
    25,
    'https://heightveda.com/wp-content/uploads/2026/09/Powder-HV-1.webp',
    '',
    FALSE,
    TRUE,
    140,
    'Powder',
    'cat-4'
)
ON CONFLICT (id) DO NOTHING;

-- 8. Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Super Admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Admin Users" ON admin_users FOR SELECT USING (true);
CREATE POLICY "Public Manage Admin Users" ON admin_users FOR ALL USING (true);

-- Seed Default Admin User (username: admin / password: soumya!nSUPA09)
INSERT INTO admin_users (id, username, password_hash, name, role)
VALUES (
    'admin-1',
    'admin',
    'c787d3dc84f0f16dba3521d9e3ac82e8c8b189335e790be5bee43dc342eb193d',
    'Height Veda Administrator',
    'Super Admin'
)
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash;

