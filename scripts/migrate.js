// Standalone idempotent migration script to migrate store.json data to Supabase
// Run with: node scripts/migrate.js

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// 1. Load environment variables from .env or .env.local
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const [key, ...values] = trimmed.split("=");
        const val = values.join("=").trim().replace(/^['"]|['"]$/g, "");
        if (key && !process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project-id") || supabaseKey.includes("your-anon-key")) {
  console.error("❌ Error: Valid Supabase environment variables are missing.");
  console.error("Please configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env or .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function runMigration() {
  console.log("🚀 Starting Leafora Herbal Supabase Data Migration...");
  console.log(`Connecting to: ${supabaseUrl}`);

  const storePath = path.join(process.cwd(), "data", "store.json");
  if (!fs.existsSync(storePath)) {
    console.error("❌ data/store.json not found!");
    process.exit(1);
  }

  const raw = fs.readFileSync(storePath, "utf-8");
  const store = JSON.parse(raw);

  // 1. Categories
  console.log(`\n📦 Migrating ${store.categories?.length || 0} Categories...`);
  for (const cat of store.categories || []) {
    const { error } = await supabase.from("categories").upsert(
      {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "",
        image_url: cat.image_url || "",
        created_at: cat.created_at || new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (error) {
      console.error(`  ❌ Failed category ${cat.id}:`, error.message);
    } else {
      console.log(`  ✓ Category: ${cat.name} (${cat.id})`);
    }
  }

  // 2. Products
  console.log(`\n🌿 Migrating ${store.products?.length || 0} Products...`);
  for (const prod of store.products || []) {
    const price = Number(prod.price || 0);
    const originalPrice = Number(prod.original_price || price);
    const saveAmount =
      prod.save_amount !== undefined ? Number(prod.save_amount) : Math.max(0, originalPrice - price);
    const discountPercent =
      prod.discount_percent !== undefined
        ? Number(prod.discount_percent)
        : originalPrice > 0
        ? Math.round((saveAmount / originalPrice) * 100)
        : 0;

    const { error } = await supabase.from("products").upsert(
      {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        tagline: prod.tagline || "",
        sku: prod.sku || `LEA-${prod.id.toUpperCase()}`,
        description: prod.description || "",
        description_sections: prod.description_sections || [],
        description_images: prod.description_images || [],
        images: prod.images || (prod.image_url ? [prod.image_url] : []),
        highlights: prod.highlights || [],
        dosage: prod.dosage || "",
        ingredients_list: prod.ingredients_list || [],
        price,
        original_price: originalPrice,
        save_amount: saveAmount,
        discount_percent: discountPercent,
        image_url: prod.image_url || "",
        badge: prod.badge || "",
        is_featured: prod.is_featured !== undefined ? Boolean(prod.is_featured) : true,
        in_stock: prod.in_stock !== undefined ? Boolean(prod.in_stock) : true,
        stock_quantity: prod.stock_quantity !== undefined ? Number(prod.stock_quantity) : 100,
        category: prod.category || "Men's Vitality & Stamina",
        category_id: prod.category_id || null,
        created_at: prod.created_at || new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (error) {
      console.error(`  ❌ Failed product ${prod.id}:`, error.message);
    } else {
      console.log(`  ✓ Product: ${prod.name} (${prod.slug})`);
    }
  }

  // 3. Orders
  console.log(`\n📋 Migrating ${store.orders?.length || 0} Orders...`);
  for (const order of store.orders || []) {
    const { error } = await supabase.from("orders").upsert(
      {
        id: order.id,
        order_number: order.order_number,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        customer_email: order.customer_email || "",
        address: order.address,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        product_id: order.product_id,
        product_name: order.product_name,
        quantity: Number(order.quantity || 1),
        total_amount: Number(order.total_amount || 0),
        discount_amount: Number(order.discount_amount || 0),
        payment_method: order.payment_method === "Prepaid" ? "Prepaid" : "COD",
        payment_status: order.payment_status || (order.payment_method === "Prepaid" ? "Paid" : "Pending"),
        status: order.status || "Pending",
        tracking_number: order.tracking_number || "",
        courier_partner: order.courier_partner || "Delhivery Surface",
        estimated_delivery: order.estimated_delivery || "",
        notes: order.notes || "",
        created_at: order.created_at || new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (error) {
      console.error(`  ❌ Failed order ${order.order_number}:`, error.message);
    } else {
      console.log(`  ✓ Order: ${order.order_number} (${order.customer_name})`);
    }
  }

  // 4. Admin Users
  console.log(`\n🔐 Migrating Admin Users...`);
  for (const user of store.admin_users || []) {
    const { error } = await supabase.from("admin_users").upsert(
      {
        id: user.id,
        username: user.username,
        password_hash: user.password_hash,
        name: user.name,
        role: user.role || "Super Admin",
        created_at: user.created_at || new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (error) {
      console.error(`  ❌ Failed admin user ${user.username}:`, error.message);
    } else {
      console.log(`  ✓ Admin user: ${user.username}`);
    }
  }

  console.log("\n✨ Supabase Migration Complete!");
}

runMigration().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
