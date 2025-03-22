import { Merchant } from "./merchant.js"
import { Product } from "./product.js"
import { Client } from "./client.js"
import { EntityCollection} from "./entityCollection.js"

/**
 * Abstract class that represents the inventory of a store
 */
export abstract class Inventory {
  /**
   * Constructor of the class
   * @param _merchants - Merchants collection
   * @param _products - Products collection
   * @param _clients - Clients collection
   */
  constructor(
    private _merchants: EntityCollection<Merchant>, 
    private _products: EntityCollection<Product>, 
    private _clients: EntityCollection<Client>
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
  public getProducts(): EntityCollection<Product> {
    return this._products;
  }

  /**
   * Setter of the products collection
   * @param products - Products collection
   */
  public setProducts(products: EntityCollection<Product>): void {
    this._products = products;
  }

  /**
   * Getter of the clients collection
   * @returns Clients collection
   */
  public getClients(): EntityCollection<Client> {
    return this._clients;
  }

  /**
   * Setter of the clients collection
   * @param clients - Clients collection
   */
  public setClients(clients: EntityCollection<Client>): void {
    this._clients = clients;
  }
  
  
  // Informes y Transacciones
  
}