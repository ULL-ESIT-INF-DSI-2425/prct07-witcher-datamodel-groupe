// import { describe, it, expect, beforeEach } from "vitest";
// import { Inventory } from "../src/inventory";
// import { Product } from "../src/product";
// import { Client } from "../src/client";
// import { Merchant } from "../src/merchant";
// import { Transaction } from "../src/transaction";
// import { Material, Ubication, Type } from "../src/enums";

// // Clases concretas que extienden EntityCollection
// class ProductCollection extends EntityCollection<Product> {}
// class ClientCollection extends EntityCollection<Client> {}
// class MerchantCollection extends EntityCollection<Merchant> {}

// describe("Inventory Class test", () => {
//   let inventory: Inventory;
//   let products: ProductCollection;
//   let clients: ClientCollection;
//   let merchants: MerchantCollection;
//   let transactions: Transaction;
//   let product1: Product;
//   let product2: Product;
//   let client: Client;
//   let merchant: Merchant;

//   beforeEach(() => {
//     products = new ProductCollection();
//     clients = new ClientCollection();
//     merchants = new MerchantCollection();
//     transactions = new Transaction();

//     product1 = new Product(1, "Sword", "A sharp steel sword", Material.Steel, 3.5, 150);
//     product2 = new Product(2, "Shield", "A sturdy wooden shield", Material.Wood, 5.0, 200);

//     client = new Client(1, "Geralt", "Witcher", Ubication.Novigrado);
//     merchant = new Merchant(1, "Hattori", Type.Mercader_g, Ubication.Novigrado);

//     products.addEntity(product1);
//     products.addEntity(product2);

//     inventory = new Inventory(merchants, products, clients, transactions);
//   });

//   it("Should get and set merchants collection", () => {
//     const newMerchants = new MerchantCollection();
//     inventory.setMerchants(newMerchants);

//     expect(inventory.getMerchants()).toBe(newMerchants);
//   });

//   it("Should get and set products collection", () => {
//     const newProducts = new ProductCollection();
//     inventory.setProducts(newProducts);

//     expect(inventory.getProducts()).toBe(newProducts);
//   });

//   it("Should get and set clients collection", () => {
//     const newClients = new ClientCollection();
//     inventory.setClients(newClients);

//     expect(inventory.getClients()).toBe(newClients);
//   });

//   it("Should check if a product exists in the inventory", () => {
//     expect(inventory.stock(product1)).toBe(true);
//     const nonExistentProduct = new Product(99, "NonExistent", "Does not exist", Material.Wood, 1.0, 50);
//     expect(inventory.stock(nonExistentProduct)).toBe(false);
//   });

//   it("Should return the most famous products", () => {
//     transactions.registerSale(client, [product1, product2], 350);
//     transactions.registerPurchase(merchant, [product1], 150);

//     expect(inventory.MostFamousProducts()).toBe('El producto más frecuente es "Sword" con 2 apariciones.');
//   });

//   it("Should calculate the total earns from sales", () => {
//     transactions.registerSale(client, [product1], 150);
//     transactions.registerSale(client, [product2], 200);

//     expect(inventory.TotalEarns()).toBe("El total de ingresos por ventas es de 350 coronas.");
//   });

//   it("Should calculate the total spends from purchases", () => {
//     transactions.registerPurchase(merchant, [product1], 150);
//     transactions.registerPurchase(merchant, [product2], 200);

//     expect(inventory.TotalSpends()).toBe("El total de gastos en adquisiciones es de 350 coronas.");
//   });

//   it("Should return the transaction history for a client", () => {
//     transactions.registerSale(client, [product1], 150);
//     transactions.registerSale(client, [product2], 200);

//     const result = inventory.TotalRecord(client);
//     expect(result).toContain("Histórico de transacciones para el cliente con ID 1:");
//     expect(result).toContain("Transacción 1:");
//     expect(result).toContain("Sword (ID: 1, Precio: 150 coronas)");
//     expect(result).toContain("Transacción 2:");
//     expect(result).toContain("Shield (ID: 2, Precio: 200 coronas)");
//   });

//   it("Should return the transaction history for a merchant", () => {
//     transactions.registerPurchase(merchant, [product1], 150);

//     const result = inventory.TotalRecord(merchant);
//     expect(result).toContain("Histórico de transacciones para el mercader con ID 1:");
//     expect(result).toContain("Sword (ID: 1, Precio: 150 coronas)");
//   });

//   it("Should return a message when there are no transactions for a client", () => {
//     const result = inventory.TotalRecord(client);
//     expect(result).toBe("No se encontraron transacciones para el cliente con ID 1.");
//   });

//   it("Should return a message when there are no transactions for a merchant", () => {
//     const result = inventory.TotalRecord(merchant);
//     expect(result).toBe("No se encontraron transacciones para el mercader con ID 1.");
//   });
// });