// Verification test script for CRUD, admin auth, and persistence layer
// Run with: node scripts/test-crud.js

const assert = require("assert");

async function runTests() {
  console.log("🧪 Running Verification Tests for Database, CRUD & Admin Auth...\n");

  // Load modules
  const {
    slugify,
    hashPassword,
    verifyPassword,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    getOrders,
    createOrder,
    updateOrderStatus,
    getSalesStats,
    verifyAdminCredentials,
    updateAdminUserLastLogin,
    updateAdminPassword,
  } = require("../lib/db.ts");

  const { signAdminToken, verifyAdminToken } = require("../lib/auth.ts");

  // Test 1: Slugify & Crypto helpers
  console.log("1. Testing Helpers...");
  assert.strictEqual(slugify("Josh 1000 Capsule (30 Caps)"), "josh-1000-capsule-30-caps");
  const testHash = hashPassword("soumya!nSUPA09");
  assert.strictEqual(verifyPassword("soumya!nSUPA09", testHash), true);
  assert.strictEqual(verifyPassword("wrongpass", testHash), false);
  console.log("   ✓ slugify, hashPassword, verifyPassword passed.");

  // Test 2: Admin Auth & JWT Token
  console.log("2. Testing Admin Auth & Token Verification...");
  const adminUser = await verifyAdminCredentials("admin", "soumya!nSUPA09");
  assert.ok(adminUser, "Admin login should succeed with correct credentials");
  assert.strictEqual(adminUser.username, "admin");

  const badUser = await verifyAdminCredentials("admin", "invalid_password");
  assert.strictEqual(badUser, null, "Admin login should reject invalid credentials");

  const token = signAdminToken("admin");
  const verified = verifyAdminToken(token);
  assert.strictEqual(verified.valid, true);
  assert.strictEqual(verified.username, "admin");

  const invalidToken = verifyAdminToken("invalid.token.structure");
  assert.strictEqual(invalidToken.valid, false);

  // Update last login (should not throw EROFS)
  await updateAdminUserLastLogin(adminUser.id);
  console.log("   ✓ Admin authentication, JWT signing/verification, and last login update passed.");

  // Test 3: Categories CRUD
  console.log("3. Testing Categories CRUD...");
  const initialCats = await getCategories();
  assert.ok(Array.isArray(initialCats) && initialCats.length >= 3, "Categories should load");

  const newCat = await createCategory({
    name: "Test Wellness Category",
    slug: "test-wellness",
    description: "Automated test category",
  });
  assert.ok(newCat.id, "Category ID should be generated");
  assert.strictEqual(newCat.name, "Test Wellness Category");

  const updatedCat = await updateCategory(newCat.id, {
    description: "Updated description for automated test",
  });
  assert.strictEqual(updatedCat.description, "Updated description for automated test");

  const deleteCatResult = await deleteCategory(newCat.id);
  assert.strictEqual(deleteCatResult, true);
  console.log("   ✓ Category create, read, update, and delete passed.");

  // Test 4: Products CRUD
  console.log("4. Testing Products CRUD & Auto-calculation...");
  const initialProducts = await getProducts();
  assert.ok(Array.isArray(initialProducts) && initialProducts.length >= 4, "Initial products should load");

  const productBySlug = await getProductBySlug("josh-1000-capsule");
  assert.ok(productBySlug, "Product should be found by slug");
  assert.strictEqual(productBySlug.id, "prod-josh-1000");

  const newProd = await createProduct({
    name: "Test Herbal Immunity Tonic",
    tagline: "Pure Herbal Shield",
    price: 999,
    original_price: 2999,
    image_url: "/products/josh-1000.jpg",
    category: "Men's Vitality & Stamina",
    stock_quantity: 50,
    in_stock: true,
  });
  assert.ok(newProd.id, "Product ID should be generated");
  assert.strictEqual(newProd.save_amount, 2000);
  assert.strictEqual(newProd.discount_percent, 67);

  const updatedProd = await updateProduct(newProd.id, {
    price: 1499,
    stock_quantity: 45,
  });
  assert.ok(updatedProd, "Product should update");
  assert.strictEqual(updatedProd.price, 1499);
  assert.strictEqual(updatedProd.save_amount, 1500); // 2999 - 1499 = 1500
  assert.strictEqual(updatedProd.discount_percent, 50); // 1500 / 2999 ~ 50%

  const deleteProdResult = await deleteProduct(newProd.id);
  assert.strictEqual(deleteProdResult, true);
  console.log("   ✓ Product create, read, update, discount calculation, and delete passed.");

  // Test 5: Orders & Inventory Decrement
  console.log("5. Testing Orders & Stock Decrement...");
  const testStockProd = await createProduct({
    name: "Stock Tracking Test Bottle",
    tagline: "Test",
    price: 500,
    original_price: 1000,
    image_url: "/products/stop-sugar.jpg",
    stock_quantity: 10,
    in_stock: true,
  });

  const order = await createOrder({
    customer_name: "Test Customer",
    customer_phone: "9898989898",
    customer_email: "test@example.com",
    address: "123 Test Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    product_id: testStockProd.id,
    product_name: testStockProd.name,
    quantity: 2,
    total_amount: 1000,
    payment_method: "COD",
    status: "Pending",
  });
  assert.ok(order.order_number, "Order number should be generated");

  // Check that stock was decremented: 10 - 2 = 8
  const checkedProd = await getProductById(testStockProd.id);
  assert.strictEqual(checkedProd.stock_quantity, 8, "Stock should be decremented after order");

  const updatedOrder = await updateOrderStatus(order.id, "Shipped", {
    tracking_number: "TEST-TRACK-1234",
    courier_partner: "BlueDart Express",
  });
  assert.strictEqual(updatedOrder.status, "Shipped");
  assert.strictEqual(updatedOrder.tracking_number, "TEST-TRACK-1234");

  // Clean up test product
  await deleteProduct(testStockProd.id);
  console.log("   ✓ Order creation, stock decrement, and order tracking update passed.");

  // Test 6: Sales Stats Dashboard
  console.log("6. Testing Sales Dashboard Analytics...");
  const stats = await getSalesStats();
  assert.ok(stats.totalOrders >= 4, "Total orders count should be accurate");
  assert.ok(stats.totalRevenue > 0, "Total revenue should be calculated");
  assert.ok(Array.isArray(stats.topSellingProducts), "Top selling products should be an array");
  console.log("   ✓ Sales stats calculation passed.");

  console.log("\n🎉 All 6 Test Suites Passed Successfully! Zero EROFS file errors!");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
