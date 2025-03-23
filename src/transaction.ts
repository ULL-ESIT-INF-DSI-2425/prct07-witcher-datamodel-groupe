import { Product } from "./product.js";
import { Client } from "./client.js";
import { Merchant } from "./merchant.js";
import { TransactionType } from "./enums.js";
import { TransactionRecord } from "./interfaces.js"

/**
 * Represents a transaction.
 */
export class Transaction {
  private _records: TransactionRecord[] = [];

  get records(): TransactionRecord[] {
    return this._records;
  }

  set records(value: TransactionRecord[]) {
    this._records = value;
  }

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
  // getRecords(): TransactionRecord[] {
  //   return this.records;
  // }

  /**
   * Find the product with more appereances in the transactions
   * @returns String qith the result
   */
  public MostAppear(): string {
    const productCount: Record<string, number> = {};

    this.records.forEach((record) => {
      record.products.forEach((product) => {
        productCount[product.name] = (productCount[product.name] || 0) + 1;
      });
    });

    const mostFrequentProduct = Object.entries(productCount).reduce((a, b) => (b[1] > a[1] ? b : a), ["", 0]);

    return mostFrequentProduct[0]
      ? `El producto más frecuente es "${mostFrequentProduct[0]}" con ${mostFrequentProduct[1]} apariciones.`
      : "No hay productos en las transacciones.";
  }

  /**
   * Calculate the total earns
   * @returns String with total earns
  */
  public Earns(): string {
    const totalEarns = this.records
      .filter((record) => record.type === TransactionType.Sale)
      .reduce((sum, record) => sum + record.crowns, 0);

    return `El total de ingresos por ventas es de ${totalEarns} coronas.`;
  }

  /**
   * Calculate the total spends
   * @returns String with total spends
   */
  public Spends(): string {
    const totalSpends = this.records
      .filter((record) => record.type === TransactionType.Purchase)
      .reduce((sum, record) => sum + record.crowns, 0);

    return `El total de gastos en adquisiciones es de ${totalSpends} coronas.`;
  }
}