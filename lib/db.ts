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
    id: "cat-1",
    name: "Full Kit",
    slug: "full-kit",
    description: "Complete dual-action capsules, herbal tablets, and powder kits for maximum growth",
    image_url: "https://heightveda.com/wp-content/uploads/2026/10/Vati-Capsuel-Powder-2.webp",
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Combo",
    slug: "combo",
    description: "Synergistic pairs for accelerated bone mineral absorption and active posture support",
    image_url: "https://heightveda.com/wp-content/uploads/2026/09/HV-C-P-1.webp",
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Capsules",
    slug: "capsules",
    description: "Pure standardized herbal extract capsules for daily hormonal and tissue rejuvenation",
    image_url: "https://heightveda.com/wp-content/uploads/2026/09/Capsule-HV-1.webp",
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "Powder",
    slug: "powder",
    description: "Nutrient-rich calcium matrix powder mix for joint lubrication and bone density",
    image_url: "https://heightveda.com/wp-content/uploads/2026/09/Powder-HV-1.webp",
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Height Veda Kit",
    slug: "height-veda-kit",
    tagline: "Powder + 60 Capsules + 60 Tablets",
    sku: "HV-KIT-001",
    description: "Complete Ayurvedic Growth formulation with dual-action herbal capsules, vitalizing tablets, and nutrient-dense powder for maximum height growth potential. Enriched with classical Rasayana herbs that nourish the asthi dhatu (bone tissues), activate natural hormone synthesis, and improve spinal alignment.",
    description_sections: [
      {
        id: "sec-1",
        type: "heading",
        title: "Synergistic 3-Stage Growth Formulation",
      },
      {
        id: "sec-2",
        type: "text",
        content: "Height Veda Kit is crafted according to authentic Charaka Samhita Rasayana principles, combining micro-pulverized organic herbs that stimulate pituitary secretion, improve bone mineral density, and relax spinal compression.",
      },
      {
        id: "sec-3",
        type: "callout",
        title: "Clinical Safety & Certification",
        content: "Certified by the Ministry of Ayush, GMP certified, non-hormonal with zero chemical steroids or side effects. Suitable for men and women aged 12 to 35.",
      },
      {
        id: "sec-4",
        type: "list",
        title: "Kit Components & Daily Supply",
        items: [
          "1x 500g Nutrient Dense Growth Powder",
          "1x 60 Ayurvedic Hormonal Balancing Capsules",
          "1x 60 Vitalizing Bone Density Tablets",
          "Free Comprehensive Diet & Stretching Routine Chart",
        ],
      },
    ],
    description_images: [
      "https://heightveda.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-10-2026-12_39_01-PM.webp",
      "https://heightveda.com/wp-content/uploads/2026/09/safe-checkout-webp.webp",
      "https://heightveda.com/wp-content/uploads/2026/09/hv-review-10-scaled-1-150x150.webp",
    ],
    images: [
      "https://heightveda.com/wp-content/uploads/2026/10/Vati-Capsuel-Powder-2.webp",
      "https://heightveda.com/wp-content/uploads/2026/09/HV-C-P-1.webp",
      "https://heightveda.com/wp-content/uploads/2026/09/Capsule-HV-1.webp",
      "https://heightveda.com/wp-content/uploads/2026/09/Powder-HV-1.webp",
    ],
    highlights: [
      "Stimulates pituitary gland secretion naturally",
      "Accelerates bone mineralization and density",
      "Corrects spinal posture and stretches cartilage",
      "Non-hormonal & Ayush Certified pure herbs",
      "Includes daily herbal powder, 60 capsules & 60 tablets",
    ],
    dosage: "Mix 1 scoop of Height Veda Powder with 200ml warm milk in the morning. Take 1 capsule post-breakfast and 1 tablet after dinner with water. Continue for 45-90 days.",
    ingredients_list: [
      { name: "Ashwagandha", amount: "250mg", purpose: "Hormone stimulation & stress relief" },
      { name: "Shatavari", amount: "150mg", purpose: "Tissue rejuvenation & vitality" },
      { name: "Safed Musli", amount: "120mg", purpose: "Muscle & joint nourishment" },
      { name: "Amla", amount: "100mg", purpose: "Natural Vitamin C & absorption" },
      { name: "Moringa", amount: "100mg", purpose: "Bioavailable plant calcium" },
      { name: "Hadjod", amount: "100mg", purpose: "Bone fracture & density healer" },
    ],
    price: 2499,
    original_price: 6896,
    save_amount: 4397,
    discount_percent: 64,
    image_url: "https://heightveda.com/wp-content/uploads/2026/10/Vati-Capsuel-Powder-2.webp",
    badge: "★ Featured Kit",
    is_featured: true,
    in_stock: true,
    stock_quantity: 250,
    category: "Full Kit",
    category_id: "cat-1",
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Combo Pack",
    slug: "combo-pack",
    tagline: "Only For Today",
    sku: "HV-CMB-002",
    description: "Special synergistic dual-pack of Height Veda Powder and herbal booster capsules for accelerated bone and tissue development. Ideal for active teenagers and young adults looking for continuous nutritional support.",
    description_sections: [
      {
        id: "sec-1",
        type: "heading",
        title: "Accelerated Joint & Bone Development",
      },
      {
        id: "sec-2",
        type: "text",
        content: "Formulated specifically for athletes, teenagers, and young adults who want an easy dual-regimen to power daily height growth and postural support.",
      },
    ],
    description_images: [
      "https://heightveda.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-10-2026-12_39_01-PM.webp",
      "https://heightveda.com/wp-content/uploads/2026/09/safe-checkout-webp.webp",
    ],
    images: [
      "https://heightveda.com/wp-content/uploads/2026/09/HV-C-P-1.webp",
      "https://heightveda.com/wp-content/uploads/2026/09/Capsule-HV-1.webp",
    ],
    highlights: [
      "Dual action: Powder + Booster Capsules",
      "Promotes joint lubrication and spinal expansion",
      "Clinically evaluated Ayurvedic herbs",
      "Free express pan-India delivery",
    ],
    dosage: "1 scoop powder with milk in morning, 1 capsule at night after food.",
    ingredients_list: [
      { name: "Ashwagandha", amount: "200mg", purpose: "Endocrine balance" },
      { name: "Safed Musli", amount: "150mg", purpose: "Tissue strength" },
      { name: "Moringa", amount: "100mg", purpose: "Bone minerals" },
    ],
    price: 2199,
    original_price: 5897,
    save_amount: 3698,
    discount_percent: 63,
    image_url: "https://heightveda.com/wp-content/uploads/2026/09/HV-C-P-1.webp",
    badge: "Popular Combo",
    is_featured: false,
    in_stock: true,
    stock_quantity: 180,
    category: "Combo",
    category_id: "cat-2",
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Capsule",
    slug: "capsule",
    tagline: "60 Pure Ayurvedic Herbal Capsules",
    sku: "HV-CAP-003",
    description: "Pure concentrated herbal extract capsules enriched with Ashwagandha, Shatavari, and Safed Musli for hormonal balance and growth plate activation. Easy to carry and consume anytime.",
    description_sections: [
      {
        id: "sec-1",
        type: "heading",
        title: "Standardized 5:1 Extract Capsules",
      },
      {
        id: "sec-2",
        type: "text",
        content: "60 vegetarian capsules with zero synthetic binders or preservatives. Promotes restful sleep and natural pituitary function.",
      },
    ],
    description_images: [
      "https://heightveda.com/wp-content/uploads/2026/09/safe-checkout-webp.webp",
    ],
    images: [
      "https://heightveda.com/wp-content/uploads/2026/09/Capsule-HV-1.webp",
    ],
    highlights: [
      "60 vegetarian herbal capsules",
      "Standardized 5:1 full-spectrum herb extracts",
      "Enhances energy levels & metabolic rate",
    ],
    dosage: "Take 1 capsule twice daily after meals with lukewarm water.",
    ingredients_list: [
      { name: "Ashwagandha", amount: "250mg", purpose: "Cellular rejuvenation" },
      { name: "Gokhru", amount: "150mg", purpose: "Vitality & stamina" },
    ],
    price: 1899,
    original_price: 3898,
    save_amount: 1999,
    discount_percent: 51,
    image_url: "https://heightveda.com/wp-content/uploads/2026/09/Capsule-HV-1.webp",
    badge: "",
    is_featured: false,
    in_stock: true,
    stock_quantity: 320,
    category: "Capsules",
    category_id: "cat-3",
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-4",
    name: "Powder",
    slug: "powder",
    tagline: "45 Days Nourishment Formula",
    sku: "HV-PWD-004",
    description: "Easily digestible daily Ayurvedic powder mix rich in plant-based calcium, moringa, amla, and minerals for bone density.",
    description_sections: [
      {
        id: "sec-1",
        type: "heading",
        title: "Bioavailable Plant-Calcium Matrix",
      },
      {
        id: "sec-2",
        type: "text",
        content: "Fortified with moringa and amla to maximize bone mineral absorption and strengthen cartilage elasticity.",
      },
    ],
    description_images: [
      "https://heightveda.com/wp-content/uploads/2026/09/safe-checkout-webp.webp",
    ],
    images: [
      "https://heightveda.com/wp-content/uploads/2026/09/Powder-HV-1.webp",
    ],
    highlights: [
      "45 days full supply pack",
      "Delicious natural herbal taste",
      "Rich in natural plant calcium",
    ],
    dosage: "1 scoop daily with 200ml milk or water.",
    ingredients_list: [
      { name: "Moringa", amount: "200mg", purpose: "Calcium matrix" },
      { name: "Amla", amount: "150mg", purpose: "Immunity & absorption" },
    ],
    price: 1499,
    original_price: 1999,
    save_amount: 500,
    discount_percent: 25,
    image_url: "https://heightveda.com/wp-content/uploads/2026/09/Powder-HV-1.webp",
    badge: "",
    is_featured: false,
    in_stock: true,
    stock_quantity: 140,
    category: "Powder",
    category_id: "cat-4",
    created_at: new Date().toISOString(),
  },
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
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_FILE)) {
    const initial: LocalStore = {
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      admin_users: INITIAL_ADMIN_USERS,
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }

  try {
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
      fs.writeFileSync(STORE_FILE, JSON.stringify(parsed, null, 2), "utf-8");
    }

    return parsed as LocalStore;
  } catch {
    const initial: LocalStore = {
      categories: INITIAL_CATEGORIES,
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
}

function saveStore(data: LocalStore) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
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
  const store = ensureStore();

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

  return store.admin_users || INITIAL_ADMIN_USERS;
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
  const user = await getAdminUserByUsername(username);
  if (!user) return null;

  const isValid = verifyPassword(password, user.password_hash);
  if (isValid) {
    return user;
  }
  return null;
}

export async function updateAdminUserLastLogin(id: string): Promise<void> {
  const store = ensureStore();
  const now = new Date().toISOString();
  store.admin_users = (store.admin_users || INITIAL_ADMIN_USERS).map((u) =>
    u.id === id ? { ...u, last_login: now } : u
  );
  saveStore(store);

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("admin_users").update({ last_login: now }).eq("id", id);
    } catch {
      // silent fallback
    }
  }
}

export async function updateAdminPassword(
  id: string,
  newPassword: string
): Promise<boolean> {
  const store = ensureStore();
  const newHash = hashPassword(newPassword);

  store.admin_users = (store.admin_users || INITIAL_ADMIN_USERS).map((u) =>
    u.id === id ? { ...u, password_hash: newHash } : u
  );
  saveStore(store);

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
  return true;
}
