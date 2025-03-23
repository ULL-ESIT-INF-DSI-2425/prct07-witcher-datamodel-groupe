import { Merchant } from "./merchant.js"
import { Product } from "./product.js"
import { Client } from "./client.js"
import { EntityCollection } from "./entityCollection.js"
import { Transaction } from "./transaction.js"
import { ProductCollection } from "./productCollection.js"
import { ClientCollection } from "./clientCollection.js"

/**
 * Class that represents the inventory of a store
 */
export class Inventory {
  /**
   * Constructor of the class
   * @param _merchants - Merchants collection
   * @param _products - Products collection
   * @param _clients - Clients collection
   * @param _transactions - Transaction collection
   * 
   */
  constructor(
    private _merchants: EntityCollection<Merchant>, 
    private _products: ProductCollection, 
    private _clients: ClientCollection,
    private _transactions: Transaction 
  ) { 
  }
  
  /**
   * Getter of the merchants collection
   * @returns Merchants collection
   */
  public getMerchants(): EntityCollection<Merchant> {
    return this._merchants;
  }

  /**
   * Setter of the merchants collection
   * @param merchants - Merchants collection
   */
  public setMerchants(merchants: EntityCollection<Merchant>): void {
    this._merchants = merchants;
  }

  /**
   * Getter of the products collection
   * @returns Products collection
   */
  public getProducts(): ProductCollection {
    return this._products;
  }

  /**
   * Setter of the products collection
   * @param products - Products collection
   */
  public setProducts(products: ProductCollection): void {
    this._products = products;
  }

  /**
   * Getter of the clients collection
   * @returns Clients collection
   */
  public getClients(): ClientCollection {
    return this._clients;
  }

  /**
   * Setter of the clients collection
   * @param clients - Clients collection
   */
  public setClients(clients: ClientCollection): void {
    this._clients = clients;
  }
  
  /**
    * Check if a procducts exists on the inventory.
    * @param product - The product to check.
    * @returns `true` if the product appears, `false` in other case.
  */
  public stock(product: Product): boolean {
    return this._products.collection.some((p) => p.id === product.id);
  }
  
  /**
   * Product most demanded
   * @returns Strings with the 3 most demanded products
   */
  public MostFamousProducts(): string {
    return this._transactions.MostAppear();
  }

  /**
   * This functions returns the summary of earns
   * @returns String with the earning information
   */
  public TotalEarns(): string {
    return this._transactions.Earns();
  }

  /**
   * This functions returns the summary of Spends
   * @returns String with the spending information
  */
  public TotalSpends(): string {
    return this._transactions.Spends();
  }
  
  /**
   * Clients or Merchant history in specific
   * @param person - Person we are going to search
   * @returns Array with transactions
   */
  public TotalRecord(person: Client | Merchant): string {
    const records = this._transactions.getRecords().filter((record) => record.entity === person);
    if (records.length === 0) {
      return `No se encontraron transacciones para ${person instanceof Client ? "el cliente" : "el mercader"} con ID ${person.id}.`;
    }
    let result = `Histórico de transacciones para ${person instanceof Client ? "el cliente" : "el mercader"} con ID ${person.id}:\n`;
    records.forEach((record, index) => {
      result += `\nTransacción ${index + 1}:\n`;
      result += `  Fecha: ${record.date.toLocaleString()}\n`;
      result += `  Tipo: ${record.type}\n`;
      result += `  Productos:\n`;
      record.products.forEach((product) => {
        result += `    - ${product.name} (ID: ${product.id}, Precio: ${product.crowns} coronas)\n`;
      });
      result += `  Total de coronas: ${record.crowns}\n`;
      if (record.reason) {
        result += `  Razón: ${record.reason}\n`;
      }
    });
    return result;
  }
}