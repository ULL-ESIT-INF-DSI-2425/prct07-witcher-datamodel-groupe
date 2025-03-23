import { Product } from "./product.js";
import { Client } from "./client.js";
import { Merchant } from "./merchant.js";

export enum TransactionType {
  Sale = "Venta",
  Purchase = "Compra",
  Return = "Devolución",
}

export interface TransactionRecord {
  date: Date;
  type: TransactionType;
  entity: Client | Merchant;
  products: Product[];
  crowns: number;
  reason?: string; // Optional for returns
}

export class Transaction {
  private records: TransactionRecord[] = [];

  /**
   * Registers a sale transaction.
   * @param client - The client involved in the sale.
   * @param products - The products sold.
   * @param crowns - The total crowns involved.
   */
  registerSale(client: Client, products: Product[], crowns: number): void {
    this.records.push({
      date: new Date(),
      type: TransactionType.Sale,
      entity: client,
      products,
      crowns,
    });
  }

  /**
   * Registers a purchase transaction.
   * @param merchant - The merchant involved in the purchase.
   * @param products - The products purchased.
   * @param crowns - The total crowns involved.
   */
  registerPurchase(merchant: Merchant, products: Product[], crowns: number): void {
    this.records.push({
      date: new Date(),
      type: TransactionType.Purchase,
      entity: merchant,
      products,
      crowns,
    });
  }

  /**
   * Registers a return transaction.
   * @param entity - The client or merchant involved in the return.
   * @param products - The products returned.
   * @param crowns - The total crowns involved.
   * @param reason - The reason for the return.
   */
  registerReturn(entity: Client | Merchant, products: Product[], crowns: number, reason: string): void {
    this.records.push({
      date: new Date(),
      type: TransactionType.Return,
      entity,
      products,
      crowns,
      reason,
    });
  }

  /**
   * Retrieves all transaction records.
   * @returns An array of transaction records.
   */
  getRecords(): TransactionRecord[] {
    return this.records;
  }
}