import { describe, it, expect, beforeEach } from "vitest";
import { Transaction } from "../src/transaction";
import { Product } from "../src/product";
import { Client } from "../src/client";
import { Merchant } from "../src/merchant";
import { TransactionType, Material, Ubication, Type, Race } from "../src/enums";

describe("Transaction Class test", () => {
  let transaction: Transaction;
  let client: Client;
  let merchant: Merchant;
  let product1: Product;
  let product2: Product;

  beforeEach(() => {
    transaction = new Transaction();
    client = new Client(1, "Geralt", Race.Brujo, Ubication.Novigrado);
    merchant = new Merchant(1, "Hattori", Type.Mercader_g, Ubication.Novigrado);
    product1 = new Product(1, "Espada peligrosa", "A sharp steel sword", Material.Acero, 3.5, 150);
    product2 = new Product(2, "Shield", "A sturdy wooden shield", Material.Escamas, 5.0, 200);
  });

  it("Should register a sale transaction", () => {
    transaction.registerSale(client, [product1, product2], 350);

    const records = transaction.records;
    expect(records.length).toBe(1);
    expect(records[0].type).toBe(TransactionType.Sale);
    expect(records[0].entity).toBe(client);
    expect(records[0].products).toContain(product1);
    expect(records[0].products).toContain(product2);
    expect(records[0].crowns).toBe(350);
  });

  it("Should register a purchase transaction", () => {
    transaction.registerPurchase(merchant, [product1], 150);

    const records = transaction.records;
    expect(records.length).toBe(1);
    expect(records[0].type).toBe(TransactionType.Purchase);
    expect(records[0].entity).toBe(merchant);
    expect(records[0].products).toContain(product1);
    expect(records[0].crowns).toBe(150);
  });

  it("Should register a return transaction", () => {
    transaction.registerReturn(client, [product2], 200, "Defective product");

    const records = transaction.records;
    expect(records.length).toBe(1);
    expect(records[0].type).toBe(TransactionType.Return);
    expect(records[0].entity).toBe(client);
    expect(records[0].products).toContain(product2);
    expect(records[0].crowns).toBe(200);
    expect(records[0].reason).toBe("Defective product");
  });

  it("Should retrieve all transaction records", () => {
    transaction.registerSale(client, [product1], 150);
    transaction.registerPurchase(merchant, [product2], 200);

    const records = transaction.records;
    expect(records.length).toBe(2);
  });

  it("Should find the product with the most appearances in transactions", () => {
    transaction.registerSale(client, [product1, product2], 350);
    transaction.registerPurchase(merchant, [product1], 150);

    const result = transaction.MostAppear();
    expect(result).toBe('El producto más frecuente es "Espada peligrosa" con 2 apariciones.');
  });

  it("Should calculate the total earns from sales", () => {
    transaction.registerSale(client, [product1], 150);
    transaction.registerSale(client, [product2], 200);

    const result = transaction.Earns();
    expect(result).toBe("El total de ingresos por ventas es de 350 coronas.");
  });

  it("Should calculate the total spends from purchases", () => {
    transaction.registerPurchase(merchant, [product1], 150);
    transaction.registerPurchase(merchant, [product2], 200);

    const result = transaction.Spends();
    expect(result).toBe("El total de gastos en adquisiciones es de 350 coronas.");
  });

  it("Should return a message when there are no transactions", () => {
    const result = transaction.MostAppear();
    expect(result).toBe("No hay productos en las transacciones.");
  });
});