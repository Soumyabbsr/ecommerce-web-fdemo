import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  Category,
  Product,
  Order,
  Customer,
  SalesStats,
  OrderStatus,
  PaymentStatus,
  AdminUser,
} from "./types";
import { supabase, isSupabaseConfigured } from "./supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-vitality",
    name: "Men's Vitality & Stamina",
    slug: "mens-vitality",
    description: "Ayurvedic formulations for strength, endurance, cellular stamina, and peak performance",
    image_url: "/products/josh-1000.jpg",
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-diabetes",
    name: "Diabetes & Sugar Care",
    slug: "diabetes-care",
    description: "Time-tested herbal botanicals for healthy glycemic control, insulin sensitivity, and pancreatic support",
    image_url: "/products/stop-sugar.jpg",
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-combos",
    name: "Complete Regimen Packs",
    slug: "combos",
    description: "Synergistic oral capsules and topical herbal oils for comprehensive wellness",
    image_url: "/products/time-master-combo.jpg",
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-josh-1000",
    "name": "Josh 1000 Capsule",
    "slug": "josh-1000-capsule",
    "tagline": "Boost Stamina · Increase Energy · Improve Vitality (30 Capsules)",
    "sku": "LEA-JOSH-1000",
    "description": "Josh 1000 is Leafora Herbal Private Limited's flagship vitality formula designed for modern active men. Formulated with 100% pure standardized herbal extracts including Shuddha Shilajit, Ashwagandha, Safed Musli, and Kaunch Beej, it naturally restores stamina, revitalizes cellular ATP energy, reduces stress fatigue, and enhances physical vigor without steroids or side effects.",
    "description_sections": [
      {
        "id": "sec-1",
        "type": "heading",
        "title": "Triple-Action Male Performance & Vigour Formula"
      },
      {
        "id": "sec-2",
        "type": "text",
        "content": "Crafted according to authentic Charaka Samhita Rasayana principles, Josh 1000 provides bioavailable bioactive withanolides and fulvic acid minerals to optimize endurance and vitality."
      },
      {
        "id": "sec-3",
        "type": "callout",
        "title": "100% Natural, Ayush Certified & Safe",
        "content": "Zero steroids, zero synthetic stimulants, heavy-metal tested, and certified by the Ministry of Ayush. Safe for long-term daily consumption."
      }
    ],
    "description_images": [],
    "images": [
      "/products/josh-1000.jpg"
    ],
    "highlights": [
      "Boosts physical stamina and fights daily fatigue",
      "Enhances natural vigor, endurance and strength",
      "Standardized Ashwagandha, Shuddha Shilajit & Safed Musli",
      "Non-hormonal, 100% Ayurvedic & Ayush Certified",
      "30 Concentrated vegetarian capsules"
    ],
    "dosage": "Take 1 capsule twice daily with warm milk or water, preferably 30 minutes after meals. Consistent usage for 60-90 days gives optimal enduring results.",
    "ingredients_list": [
      {
        "name": "Ashwagandha",
        "amount": "200mg",
        "purpose": "Stress reduction & natural vitality"
      },
      {
        "name": "Shuddha Shilajit",
        "amount": "150mg",
        "purpose": "Mitochondrial energy & cellular stamina"
      },
      {
        "name": "Safed Musli",
        "amount": "100mg",
        "purpose": "Muscle nourishment & strength"
      },
      {
        "name": "Kaunch Beej",
        "amount": "100mg",
        "purpose": "Endurance & neuromuscular vitality"
      },
      {
        "name": "Gokshura",
        "amount": "100mg",
        "purpose": "Micro-circulation & stamina support"
      }
    ],
    "price": 899,
    "original_price": 2999,
    "save_amount": 2100,
    "discount_percent": 70,
    "image_url": "/products/josh-1000.jpg",
    "badge": "🔥 70% OFF · Best Seller",
    "is_featured": true,
    "in_stock": true,
    "stock_quantity": 320,
    "category": "Men's Vitality & Stamina",
    "category_id": "cat-vitality",
    "created_at": "2026-10-25T09:33:29.140Z"
  },
  {
    "id": "prod-time-master",
    "name": "Time Master Performance Combo (Oil + Capsule)",
    "slug": "time-master-combo",
    "tagline": "Instant Topical Action Oil (80ml) + 60 Stamina Capsules",
    "sku": "LEA-TM-COMBO",
    "description": "The Time Master Complete Performance System by Leafora Herbal Private Limited is a specialized dual-therapy designed for maximum confidence and peak vigor. It includes an 80ml rapid-action herbal massage oil for intense local blood warmth and stimulation, paired with 60 potent Ayurvedic capsules that deliver deep internal endurance and strength.",
    "description_sections": [
      {
        "id": "sec-1",
        "type": "heading",
        "title": "Synergistic Dual-System: Topical Oil + Daily Oral Capsules"
      },
      {
        "id": "sec-2",
        "type": "text",
        "content": "While the herbal oil provides direct micro-vascular circulation and sensory revitalization, the capsules nourish deeper tissues with concentrated Shilajit and revitalizing herbs."
      }
    ],
    "description_images": [],
    "images": [
      "/products/time-master-combo.jpg"
    ],
    "highlights": [
      "Dual pack: 80ml specialized massage oil + 60 vitality capsules",
      "Fast-acting topical formula boosts blood flow and sensitivity",
      "Internal capsules build long-lasting stamina and endurance",
      "Non-greasy, pleasant natural herbal aroma",
      "Clinically tested Ayush certified botanical ingredients"
    ],
    "dosage": "Capsules: Take 1 capsule morning and night with water or milk. Oil: Massage 5 to 7 drops gently once daily at night. Safe for consistent daily use.",
    "ingredients_list": [
      {
        "name": "Malkangani & Clove Oil (Topical)",
        "amount": "80ml blend",
        "purpose": "Vascular stimulation & warmth"
      },
      {
        "name": "Shilajit & Ashwagandha (Capsules)",
        "amount": "350mg",
        "purpose": "Endurance & systemic stamina"
      },
      {
        "name": "Safed Musli & Akarkara",
        "amount": "200mg",
        "purpose": "Nerve revitalization & strength"
      }
    ],
    "price": 1499,
    "original_price": 4999,
    "save_amount": 3500,
    "discount_percent": 70,
    "image_url": "/products/time-master-combo.jpg",
    "badge": "👑 70% OFF · Complete Dual Regimen",
    "is_featured": true,
    "in_stock": true,
    "stock_quantity": 180,
    "category": "Men's Vitality & Stamina",
    "category_id": "cat-vitality",
    "created_at": "2026-10-25T09:33:29.140Z"
  },
  {
    "id": "prod-stop-sugar",
    "name": "Stop Sugar Anti-Diabetic Powder",
    "slug": "stop-sugar-powder",
    "tagline": "मधुमेह विनाशक चूर्ण · Natural Blood Sugar & Pancreatic Care",
    "sku": "LEA-STOP-SUGAR",
    "description": "Stop Sugar (मधुमेह विनाशक चूर्ण) is an authentic time-tested Ayurvedic botanical formulation by Leafora Herbal Private Limited. Formulated with ancient herbs like Gurmar, Karela, Jamun seed, Vijaysar, and Methi, it revitalizes pancreatic beta cells, delays intestinal sugar absorption, curtails frequent urination, and stabilizes fasting and post-prandial glucose levels naturally.",
    "description_sections": [
      {
        "id": "sec-1",
        "type": "heading",
        "title": "Authentic Ayurvedic Blood Sugar Management"
      },
      {
        "id": "sec-2",
        "type": "text",
        "content": "Works naturally to rejuvenate pancreatic function, boost peripheral glucose uptake, and safeguard vital organs from diabetic oxidative stress."
      }
    ],
    "description_images": [],
    "images": [
      "/products/stop-sugar.jpg"
    ],
    "highlights": [
      "Helps maintain healthy fasting & post-meal blood sugar levels",
      "Gurmar extract naturally diminishes sugar cravings and absorption",
      "Rejuvenates pancreatic beta cells to support healthy insulin response",
      "Alleviates chronic diabetic lethargy, fatigue and excessive thirst",
      "100% Pure micro-pulverized organic herbs, no chemicals"
    ],
    "dosage": "Mix 1 teaspoon (3-5g) with a glass of lukewarm water twice daily, 30 minutes before breakfast and dinner.",
    "ingredients_list": [
      {
        "name": "Gurmar (Gymnema Sylvestre)",
        "amount": "25%",
        "purpose": "Blocks sugar receptors & supports pancreas"
      },
      {
        "name": "Jamun Seed (Syzygium Cumini)",
        "amount": "20%",
        "purpose": "Retards starch-to-sugar conversion"
      },
      {
        "name": "Karela (Momordica Charantia)",
        "amount": "20%",
        "purpose": "Plant polypeptide-P for glucose uptake"
      },
      {
        "name": "Vijaysar (Pterocarpus Marsupium)",
        "amount": "15%",
        "purpose": "Restores pancreatic beta-cell health"
      },
      {
        "name": "Methi & Neem",
        "amount": "20%",
        "purpose": "Insulin sensitivity & blood purification"
      }
    ],
    "price": 799,
    "original_price": 2699,
    "save_amount": 1900,
    "discount_percent": 70,
    "image_url": "/products/stop-sugar.jpg",
    "badge": "🌿 70% OFF · Proven Sugar Support",
    "is_featured": true,
    "in_stock": true,
    "stock_quantity": 260,
    "category": "Diabetes & Sugar Care",
    "category_id": "cat-diabetes",
    "created_at": "2026-10-25T09:33:29.140Z"
  },
  {
    "id": "prod-diasure-powder",
    "name": "Diasure Herb Powder",
    "slug": "diasure-herb-powder",
    "tagline": "Blend of 15 Potent Herbs for Managing Sugar (Net Wt. 200g)",
    "sku": "LEA-DIASURE-200",
    "description": "Diasure Herb Powder by Leafora Herbal Private Limited brings together 15 powerhouse Ayurvedic botanicals in an advanced synergistic blend. Crafted with Neem, Karela, Jamun, Vijaysar, Ashwagandha, and Methi, this 200g nutrient-rich powder revitalizes glucose metabolism, relieves diabetic neuropathic tingling, protects kidneys and eyes, and restores all-day vitality.",
    "description_sections": [
      {
        "id": "sec-1",
        "type": "heading",
        "title": "Comprehensive 15-Botanical Metabolic Defense"
      },
      {
        "id": "sec-2",
        "type": "text",
        "content": "Formulated to target the root metabolic imbalances behind unstable blood sugar while protecting kidney and heart wellness."
      }
    ],
    "description_images": [],
    "images": [
      "/products/diasure-powder.jpg"
    ],
    "highlights": [
      "Advanced synergy of 15 standardized Ayurvedic botanicals",
      "Balances HbA1c levels and prevents post-meal energy slumps",
      "Relieves nerve numbness, burning sensation in hands and feet",
      "Protects renal and cardiovascular health from sugar oxidation",
      "Net weight 200g, Ayush certified and 100% vegetarian"
    ],
    "dosage": "Take 1 level scoop (approx. 5g) with lukewarm water twice daily before meals.",
    "ingredients_list": [
      {
        "name": "Neem & Karela Extract",
        "amount": "30%",
        "purpose": "Deep detox & insulin mimic"
      },
      {
        "name": "Jamun & Vijaysar",
        "amount": "25%",
        "purpose": "Glucose equilibrium & pancreas support"
      },
      {
        "name": "Ashwagandha & Pippali",
        "amount": "20%",
        "purpose": "Vitality, nerve strength & bioavailability"
      },
      {
        "name": "Methi, Bilva & Triphala",
        "amount": "25%",
        "purpose": "Gut absorption & metabolic balance"
      }
    ],
    "price": 899,
    "original_price": 2999,
    "save_amount": 2100,
    "discount_percent": 70,
    "image_url": "/products/diasure-powder.jpg",
    "badge": "⭐ 70% OFF · 15 Herb Formula",
    "is_featured": true,
    "in_stock": true,
    "stock_quantity": 210,
    "category": "Diabetes & Sugar Care",
    "category_id": "cat-diabetes",
    "created_at": "2026-10-25T09:33:29.140Z"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    order_number: "HV-10821",
    customer_name: "Rahul Sharma",
    customer_phone: "9876543210",
    customer_email: "rahul.sharma@example.com",
    address: "Flat 402, Green Valley Apartments, Sector 14",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302017",
    product_id: "prod-1",
    product_name: "Height Veda Kit",
    quantity: 1,
    total_amount: 2099,
    discount_amount: 400,
    payment_method: "Prepaid",
    payment_status: "Paid",
    status: "Delivered",
    tracking_number: "BLUEDART-8829103",
    courier_partner: "BlueDart Express",
    estimated_delivery: "Delivered on 16 Oct 2026",
    notes: "Leave with security if not available",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "ord-2",
    order_number: "HV-10822",
    customer_name: "Pooja Verma",
    customer_phone: "9811223344",
    customer_email: "pooja.v@example.com",
    address: "H.No. 54, Model Town Phase 2",
    city: "Ludhiana",
    state: "Punjab",
    pincode: "141002",
    product_id: "prod-2",
    product_name: "Combo Pack",
    quantity: 1,
    total_amount: 2199,
    discount_amount: 0,
    payment_method: "COD",
    payment_status: "Pending",
    status: "Shipped",
    tracking_number: "DELHIVERY-7749102",
    courier_partner: "Delhivery Surface",
    estimated_delivery: "Expected by 21 Oct 2026",
    notes: "Call before delivery",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "ord-3",
    order_number: "HV-10823",
    customer_name: "Amit Patel",
    customer_phone: "9922334455",
    customer_email: "amit.p@example.com",
    address: "B-12 Nilkanth Society, Near Ring Road",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380015",
    product_id: "prod-1",
    product_name: "Height Veda Kit",
    quantity: 1,
    total_amount: 2499,
    discount_amount: 0,
    payment_method: "COD",
    payment_status: "Pending",
    status: "Processing",
    tracking_number: "",
    courier_partner: "Ekart Logistics",
    notes: "Standard order",
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "ord-4",
    order_number: "HV-10824",
    customer_name: "Siddharth Rao",
    customer_phone: "9731234567",
    customer_email: "siddharth.rao@example.com",
    address: "42 Indiranagar 100ft Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    product_id: "prod-3",
    product_name: "Capsule",
    quantity: 2,
    total_amount: 3398,
    discount_amount: 400,
    payment_method: "Prepaid",
    payment_status: "Paid",
    status: "Out for Delivery",
    tracking_number: "SHADOWFAX-382910",
    courier_partner: "Shadowfax Express",
    notes: "Deliver before 5 PM",
    created_at: new Date(Date.now() - 86400000 * 0.5).toISOString(),
  },
];

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password.trim()).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash || password.trim() === hash.trim();
}

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "admin-1",
    username: "admin",
    password_hash: hashPassword("soumya!nSUPA09"),
    name: "Height Veda Administrator",
    role: "Super Admin",
    created_at: new Date().toISOString(),
  },
];

interface LocalStore {
  categories: Category[];
  products: Product[];
  orders: Order[];
  admin_users?: AdminUser[];
}

export function ensureStore(): LocalStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch {
        // Read-only serverless filesystem
      }
    }

    if (!fs.existsSync(STORE_FILE)) {
      const initial: LocalStore = {
        categories: INITIAL_CATEGORIES,
        products: INITIAL_PRODUCTS,
        orders: INITIAL_ORDERS,
        admin_users: INITIAL_ADMIN_USERS,
      };
      try {
        fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf-8");
      } catch {
        // Read-only serverless filesystem
      }
      return initial;
    }

    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<LocalStore>;
    let modified = false;

    // ensure admin users exist
    if (!parsed.admin_users || !Array.isArray(parsed.admin_users) || parsed.admin_users.length === 0) {
      parsed.admin_users = INITIAL_ADMIN_USERS;
      modified = true;
    }

    // ensure categories exist
    if (!parsed.categories || !Array.isArray(parsed.categories) || parsed.categories.length === 0) {
      parsed.categories = INITIAL_CATEGORIES;
      modified = true;
    }

    // ensure products have all modern fields
    if (!parsed.products || !Array.isArray(parsed.products)) {
      parsed.products = INITIAL_PRODUCTS;
      modified = true;
    } else {
      parsed.products = parsed.products.map((p) => {
        const initMatch = INITIAL_PRODUCTS.find((ip) => ip.id === p.id);
        const descImages =
          p.description_images && p.description_images.length > 0
            ? p.description_images
            : initMatch?.description_images || [];
        const mainImages =
          p.images && p.images.length > 0
            ? p.images
            : initMatch?.images || [p.image_url];
        const highlights =
          p.highlights && p.highlights.length > 0
            ? p.highlights
            : initMatch?.highlights || [];
        const dosage = p.dosage || initMatch?.dosage || "";
        const ingredients =
          p.ingredients_list && p.ingredients_list.length > 0
            ? p.ingredients_list
            : initMatch?.ingredients_list || [];
        const sections =
          p.description_sections && p.description_sections.length > 0
            ? p.description_sections
            : initMatch?.description_sections || [];
        const sku = p.sku || initMatch?.sku || `HV-${p.id.toUpperCase()}`;
        const stockQty = p.stock_quantity ?? initMatch?.stock_quantity ?? 100;

        const saveAmt = Math.max(0, p.original_price - p.price);
        const discPct =
          p.original_price > 0 ? Math.round((saveAmt / p.original_price) * 100) : 0;

        const slug = p.slug || initMatch?.slug || slugify(p.name);
        if (!p.slug) {
          modified = true;
        }

        return {
          ...p,
          slug,
          sku,
          stock_quantity: stockQty,
          description_sections: sections,
          description_images: descImages,
          images: mainImages,
          highlights,
          dosage,
          ingredients_list: ingredients,
          save_amount: saveAmt,
          discount_percent: discPct,
          category: p.category || initMatch?.category || "General",
        };
      });
    }

    // ensure orders have payment_status and valid delivery fields
    if (!parsed.orders || !Array.isArray(parsed.orders)) {
      parsed.orders = INITIAL_ORDERS;
      modified = true;
    } else {
      parsed.orders = parsed.orders.map((o) => ({
        ...o,
        payment_status: o.payment_status || (o.payment_method === "Prepaid" ? "Paid" : "Pending"),
        status: o.status || "Pending",
        tracking_number: o.tracking_number || "",
        courier_partner: o.courier_partner || "Delhivery Surface",
      }));
    }

    if (modified) {
      try {
        fs.writeFileSync(STORE_FILE, JSON.stringify(parsed, null, 2), "utf-8");
      } catch {
        // Read-only serverless filesystem
      }
    }

    return parsed as LocalStore;
  } catch {
    return {
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      admin_users: INITIAL_ADMIN_USERS,
    };
  }
}

function saveStore(data: LocalStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch {
        // Read-only serverless filesystem
      }
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // Normal in serverless environments like Vercel with read-only root
    console.warn("Local storage write skipped in read-only environment:", err);
  }
}

/* =========================================================
   1. CATEGORIES API
========================================================= */

export async function getCategories(): Promise<Category[]> {
  const store = ensureStore();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((c) => ({
          ...c,
          product_count: store.products.filter((p) => p.category === c.name || p.category_id === c.id).length,
        })) as Category[];
      }
    } catch (e) {
      console.warn("Supabase categories fetch failed:", e);
    }
  }

  // Calculate live product counts for each category
  return store.categories.map((c) => ({
    ...c,
    product_count: store.products.filter((p) => p.category === c.name || p.category_id === c.id).length,
  }));
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.id === id || c.slug === id) || null;
}

export async function createCategory(
  categoryData: Omit<Category, "id" | "created_at">
): Promise<Category> {
  const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newCategory: Category = {
    ...categoryData,
    slug,
    id: `cat-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([newCategory])
        .select()
        .single();

      if (!error && data) {
        return data as Category;
      }
    } catch (e) {
      console.warn("Supabase category insert failed:", e);
    }
  }

  const store = ensureStore();
  store.categories.push(newCategory);
  saveStore(store);
  return newCategory;
}

export async function updateCategory(
  id: string,
  updates: Partial<Category>
): Promise<Category | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return data as Category;
      }
    } catch (e) {
      console.warn("Supabase category update failed:", e);
    }
  }

  const store = ensureStore();
  const idx = store.categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  store.categories[idx] = {
    ...store.categories[idx],
    ...updates,
  };
  saveStore(store);
  return store.categories[idx];
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase category delete failed:", e);
    }
  }

  const store = ensureStore();
  const initLen = store.categories.length;
  store.categories = store.categories.filter((c) => c.id !== id);
  saveStore(store);
  return store.categories.length < initLen;
}

/* =========================================================
   2. PRODUCTS API WITH SEARCH, FILTERING & PAGINATION
========================================================= */

export interface GetProductsOptions {
  search?: string;
  category?: string;
  inStock?: boolean;
  limit?: number;
  offset?: number;
}

export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  const store = ensureStore();
  let list = store.products;

  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from("products").select("*").order("created_at", { ascending: false });

      if (options.category && options.category !== "All") {
        query = query.eq("category", options.category);
      }
      if (options.inStock !== undefined) {
        query = query.eq("in_stock", options.inStock);
      }
      if (options.search) {
        query = query.ilike("name", `%${options.search}%`);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        list = data as Product[];
      }
    } catch (e) {
      console.warn("Supabase products fetch failed:", e);
    }
  }

  // Filter in memory for maximum search coverage (search name, sku, category, tagline)
  if (options.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.tagline && p.tagline.toLowerCase().includes(q))
    );
  }

  if (options.category && options.category !== "All") {
    list = list.filter((p) => p.category === options.category);
  }

  if (options.inStock !== undefined) {
    list = list.filter((p) => p.in_stock === options.inStock);
  }

  if (options.offset !== undefined && options.limit !== undefined) {
    return list.slice(options.offset, options.offset + options.limit);
  }

  return list;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as Product;
      }
    } catch (e) {
      console.warn("Supabase product fetch failed:", e);
    }
  }

  const store = ensureStore();
  return store.products.find((p) => p.id === id) || null;
}

export async function getProductBySlug(slugOrId: string): Promise<Product | null> {
  const store = ensureStore();
  const normalized = decodeURIComponent(slugOrId).toLowerCase().trim();

  // 1. Direct ID match
  const byId = store.products.find((p) => p.id.toLowerCase() === normalized);
  if (byId) return byId;

  // 2. Direct slug match
  const bySlug = store.products.find(
    (p) => p.slug && p.slug.toLowerCase() === normalized
  );
  if (bySlug) return bySlug;

  // 3. Slugified name match
  const bySlugName = store.products.find(
    (p) => slugify(p.name) === normalized
  );
  if (bySlugName) return bySlugName;

  // 4. Exact lowercase name match
  const byName = store.products.find(
    (p) => p.name.toLowerCase() === normalized
  );
  if (byName) return byName;

  // 5. Partial / fuzzy match
  const byFuzzy = store.products.find((p) => {
    const s = slugify(p.name);
    return s.includes(normalized) || normalized.includes(s);
  });
  if (byFuzzy) return byFuzzy;

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data } = await supabase
        .from("products")
        .select("*")
        .or(`slug.eq.${normalized},id.eq.${normalized}`)
        .limit(1)
        .maybeSingle();
      if (data) return data as Product;
    } catch (e) {
      console.warn("Supabase getProductBySlug failed:", e);
    }
  }

  return null;
}

export async function createProduct(
  productData: Omit<Product, "id" | "created_at">
): Promise<Product> {
  const saveAmount = Math.max(0, productData.original_price - productData.price);
  const discountPercent =
    productData.original_price > 0
      ? Math.round((saveAmount / productData.original_price) * 100)
      : 0;

  const slug = productData.slug ? slugify(productData.slug) : slugify(productData.name);

  const newProduct: Product = {
    ...productData,
    id: `prod-${Date.now()}`,
    slug,
    sku: productData.sku || `HV-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    save_amount: saveAmount,
    discount_percent: discountPercent,
    stock_quantity: productData.stock_quantity ?? 100,
    images: productData.images && productData.images.length > 0 ? productData.images : [productData.image_url],
    description_sections: productData.description_sections || [],
    description_images: productData.description_images || [],
    highlights: productData.highlights || [],
    ingredients_list: productData.ingredients_list || [],
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([newProduct])
        .select()
        .single();

      if (!error && data) {
        return data as Product;
      }
    } catch (e) {
      console.warn("Supabase product insert failed:", e);
    }
  }

  const store = ensureStore();
  store.products.unshift(newProduct);
  saveStore(store);
  return newProduct;
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const store = ensureStore();
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = store.products[index];
  const finalPrice = updates.price !== undefined ? Number(updates.price) : current.price;
  const finalOriginal =
    updates.original_price !== undefined ? Number(updates.original_price) : current.original_price;
  const saveAmount = Math.max(0, finalOriginal - finalPrice);
  const discountPercent =
    finalOriginal > 0 ? Math.round((saveAmount / finalOriginal) * 100) : 0;

  const finalSlug = updates.slug
    ? slugify(updates.slug)
    : updates.name
    ? slugify(updates.name)
    : current.slug || slugify(current.name);

  const finalUpdates: Partial<Product> = {
    ...updates,
    slug: finalSlug,
    price: finalPrice,
    original_price: finalOriginal,
    save_amount: saveAmount,
    discount_percent: discountPercent,
    stock_quantity: updates.stock_quantity !== undefined ? Number(updates.stock_quantity) : current.stock_quantity,
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(finalUpdates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return data as Product;
      }
    } catch (e) {
      console.warn("Supabase product update failed:", e);
    }
  }

  store.products[index] = {
    ...current,
    ...finalUpdates,
  };
  saveStore(store);
  return store.products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase product delete failed:", e);
    }
  }

  const store = ensureStore();
  const initialLen = store.products.length;
  store.products = store.products.filter((p) => p.id !== id);
  saveStore(store);
  return store.products.length < initialLen;
}

/* =========================================================
   3. ORDERS & DELIVERY MANAGEMENT API
========================================================= */

export interface GetOrdersOptions {
  status?: string;
  search?: string;
  paymentMethod?: string;
  limit?: number;
  offset?: number;
}

export async function getOrders(options: GetOrdersOptions | string = {}): Promise<Order[]> {
  const store = ensureStore();
  let ordersList = store.orders;

  const statusFilter = typeof options === "string" ? options : options.status;
  const searchQuery = typeof options === "object" ? options.search : undefined;

  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from("orders").select("*").order("created_at", { ascending: false });

      if (statusFilter && statusFilter !== "All") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        ordersList = data as Order[];
      }
    } catch (e) {
      console.warn("Supabase orders fetch failed:", e);
    }
  }

  if (statusFilter && statusFilter !== "All") {
    ordersList = ordersList.filter((o) => o.status === statusFilter);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    ordersList = ordersList.filter(
      (o) =>
        o.order_number.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_phone.includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.product_name.toLowerCase().includes(q)
    );
  }

  return ordersList;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await getOrders();
  return orders.find((o) => o.id === id || o.order_number === id) || null;
}

export async function createOrder(
  orderData: Omit<Order, "id" | "order_number" | "created_at">
): Promise<Order> {
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    order_number: `HV-${Math.floor(10000 + Math.random() * 90000)}`,
    payment_status: orderData.payment_status || (orderData.payment_method === "Prepaid" ? "Paid" : "Pending"),
    status: orderData.status || "Pending",
    courier_partner: orderData.courier_partner || "Delhivery Surface",
    tracking_number: orderData.tracking_number || "",
    created_at: new Date().toISOString(),
  };

  // Decrement inventory stock on product
  if (orderData.product_id) {
    try {
      const product = await getProductById(orderData.product_id);
      if (product && product.stock_quantity !== undefined) {
        const updatedStock = Math.max(0, product.stock_quantity - (orderData.quantity || 1));
        await updateProduct(product.id, {
          stock_quantity: updatedStock,
          in_stock: updatedStock > 0,
        });
      }
    } catch (err) {
      console.warn("Failed to update product stock on order:", err);
    }
  }

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([newOrder])
        .select()
        .single();

      if (!error && data) {
        return data as Order;
      }
    } catch (e) {
      console.warn("Supabase order insert failed:", e);
    }
  }

  const store = ensureStore();
  store.orders.unshift(newOrder);
  saveStore(store);
  return newOrder;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  tracking?: {
    courier_partner?: string;
    tracking_number?: string;
    estimated_delivery?: string;
    payment_status?: PaymentStatus;
  }
): Promise<Order | null> {
  const updates: Partial<Order> = {
    status,
    ...(tracking || {}),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return data as Order;
      }
    } catch (e) {
      console.warn("Supabase order update failed:", e);
    }
  }

  const store = ensureStore();
  const order = store.orders.find((o) => o.id === id);
  if (!order) return null;

  Object.assign(order, updates);
  saveStore(store);
  return order;
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return data as Order;
      }
    } catch (e) {
      console.warn("Supabase order update failed:", e);
    }
  }

  const store = ensureStore();
  const order = store.orders.find((o) => o.id === id);
  if (!order) return null;

  Object.assign(order, updates);
  saveStore(store);
  return order;
}

export async function deleteOrder(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase order delete failed:", e);
    }
  }

  const store = ensureStore();
  const initialLen = store.orders.length;
  store.orders = store.orders.filter((o) => o.id !== id);
  saveStore(store);
  return store.orders.length < initialLen;
}

/* =========================================================
   4. CUSTOMER MANAGEMENT API
========================================================= */

export async function getCustomers(searchQuery?: string): Promise<Customer[]> {
  const orders = await getOrders();

  // Aggregate orders by phone number (primary unique key for e-commerce)
  const map = new Map<string, Customer>();

  for (const order of orders) {
    const key = order.customer_phone.trim();
    if (!key) continue;

    if (!map.has(key)) {
      map.set(key, {
        id: `cust-${key}`,
        name: order.customer_name,
        phone: order.customer_phone,
        email: order.customer_email || "",
        address: order.address,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        total_orders: 1,
        total_spent: order.status !== "Cancelled" ? order.total_amount : 0,
        first_order_date: order.created_at,
        last_order_date: order.created_at,
        recent_orders: [order],
      });
    } else {
      const cust = map.get(key)!;
      cust.total_orders += 1;
      if (order.status !== "Cancelled") {
        cust.total_spent += order.total_amount;
      }
      if (new Date(order.created_at) < new Date(cust.first_order_date || "")) {
        cust.first_order_date = order.created_at;
      }
      if (new Date(order.created_at) > new Date(cust.last_order_date || "")) {
        cust.last_order_date = order.created_at;
        // update latest address
        cust.address = order.address;
        cust.city = order.city;
        cust.state = order.state;
        cust.pincode = order.pincode;
      }
      cust.recent_orders?.push(order);
    }
  }

  let customers = Array.from(map.values()).sort(
    (a, b) => new Date(b.last_order_date || "").getTime() - new Date(a.last_order_date || "").getTime()
  );

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    customers = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        c.city.toLowerCase().includes(q)
    );
  }

  return customers;
}

export async function getCustomerByPhone(phone: string): Promise<Customer | null> {
  const customers = await getCustomers();
  return customers.find((c) => c.phone === phone.trim()) || null;
}

/* =========================================================
   5. DEEP REALTIME ANALYTICS & DASHBOARD METRICS
========================================================= */

export async function getSalesStats(): Promise<SalesStats> {
  const orders = await getOrders();
  const products = await getProducts();
  const customers = await getCustomers();

  const totalOrders = orders.length;
  const totalCustomers = customers.length;

  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const processingOrders = orders.filter((o) => o.status === "Processing" || o.status === "Confirmed").length;
  const shippedOrders = orders.filter((o) => o.status === "Shipped" || o.status === "Out for Delivery").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

  const validOrders = orders.filter((o) => o.status !== "Cancelled");
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total_amount, 0);
  const averageOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;

  const totalRefunds = orders
    .filter((o) => o.payment_status === "Refunded")
    .reduce((sum, o) => sum + o.total_amount, 0);

  const lowStockCount = products.filter((p) => (p.stock_quantity ?? 100) <= 20).length;

  // Top Selling Products Calculation
  const productSalesMap = new Map<string, { count: number; revenue: number }>();
  for (const o of validOrders) {
    const pid = o.product_id || o.product_name;
    const existing = productSalesMap.get(pid) || { count: 0, revenue: 0 };
    productSalesMap.set(pid, {
      count: existing.count + (o.quantity || 1),
      revenue: existing.revenue + o.total_amount,
    });
  }

  const topSellingProducts = Array.from(productSalesMap.entries())
    .map(([pid, data]) => {
      const product = products.find((p) => p.id === pid || p.name === pid);
      return {
        id: pid,
        name: product?.name || pid,
        salesCount: data.count,
        revenue: data.revenue,
        image_url: product?.image_url || "https://heightveda.com/wp-content/uploads/2026/10/Vati-Capsuel-Powder-2.webp",
        category: product?.category || "General",
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Category Performance Calculation
  const categoryMap = new Map<string, { count: number; revenue: number }>();
  for (const o of validOrders) {
    const prod = products.find((p) => p.id === o.product_id || p.name === o.product_name);
    const cat = prod?.category || "General";
    const existing = categoryMap.get(cat) || { count: 0, revenue: 0 };
    categoryMap.set(cat, {
      count: existing.count + (o.quantity || 1),
      revenue: existing.revenue + o.total_amount,
    });
  }

  const categoryPerformance = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    count: data.count,
    revenue: data.revenue,
  }));

  // Daily Revenue (last 14 days timeline)
  const daysMap = new Map<string, { revenue: number; orders: number }>();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    daysMap.set(dateStr, { revenue: 0, orders: 0 });
  }

  for (const o of validOrders) {
    const d = new Date(o.created_at);
    const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    if (daysMap.has(dateStr)) {
      const entry = daysMap.get(dateStr)!;
      entry.revenue += o.total_amount;
      entry.orders += 1;
    }
  }

  const dailyRevenue = Array.from(daysMap.entries()).map(([date, val]) => ({
    date,
    revenue: val.revenue,
    orders: val.orders,
  }));

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    averageOrderValue,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalRefunds,
    lowStockCount,
    topSellingProducts,
    categoryPerformance,
    dailyRevenue,
    recentOrders: orders.slice(0, 10),
  };
}

/* =========================================================
   6. ADMIN USERS & AUTHENTICATION API (DATABASE PERSISTENCE)
========================================================= */

export async function getAdminUsers(): Promise<AdminUser[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from("admin_users").select("*");
      if (!error && data && data.length > 0) {
        return data as AdminUser[];
      }
    } catch (e) {
      console.warn("Supabase admin_users fetch fallback to local store:", e);
    }
  }

  try {
    const store = ensureStore();
    if (store.admin_users && store.admin_users.length > 0) {
      return store.admin_users;
    }
  } catch (e) {
    console.warn("Local store admin_users fetch fallback:", e);
  }

  return INITIAL_ADMIN_USERS;
}

export async function getAdminUserByUsername(username: string): Promise<AdminUser | null> {
  if (!username) return null;
  const users = await getAdminUsers();
  return users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase()) || null;
}

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<AdminUser | null> {
  if (!username || !password) return null;
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  // 1. Master Admin Passcode fallback (matches ADMIN_PASSCODE env or default)
  const masterPasscode = (process.env.ADMIN_PASSCODE || "soumya!nSUPA09").trim();
  if (cleanUsername === "admin" && cleanPassword === masterPasscode) {
    try {
      const user = await getAdminUserByUsername(cleanUsername);
      return user || INITIAL_ADMIN_USERS[0];
    } catch {
      return INITIAL_ADMIN_USERS[0];
    }
  }

  // 2. Database verification against password_hash
  const user = await getAdminUserByUsername(cleanUsername);
  if (!user) return null;

  const isValid = verifyPassword(cleanPassword, user.password_hash);
  if (isValid) {
    return user;
  }
  return null;
}

export async function updateAdminUserLastLogin(id: string): Promise<void> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("admin_users").update({ last_login: now }).eq("id", id);
    } catch {
      // silent fallback
    }
  }

  try {
    const store = ensureStore();
    store.admin_users = (store.admin_users || INITIAL_ADMIN_USERS).map((u) =>
      u.id === id ? { ...u, last_login: now } : u
    );
    saveStore(store);
  } catch {
    // Non-fatal if local write fails on read-only serverless filesystem
  }
}

export async function updateAdminPassword(
  id: string,
  newPassword: string
): Promise<boolean> {
  const newHash = hashPassword(newPassword);

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from("admin_users")
        .update({ password_hash: newHash })
        .eq("id", id);
    } catch {
      // silent fallback
    }
  }

  try {
    const store = ensureStore();
    store.admin_users = (store.admin_users || INITIAL_ADMIN_USERS).map((u) =>
      u.id === id ? { ...u, password_hash: newHash } : u
    );
    saveStore(store);
  } catch {
    // Non-fatal if local write fails on read-only serverless filesystem
  }

  return true;
}
