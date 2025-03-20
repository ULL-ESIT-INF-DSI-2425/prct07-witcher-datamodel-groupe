import { Merchant } from "./merchant.js"
import { Product } from "./product.js"
import { Client } from "./client.js"
import { EntityCollection} from "./entity-collection.js"

export abstract class Inventory {
  constructor(
    private _merchants: EntityCollection<Merchant>, 
    private _products: EntityCollection<Product>, 
    private _clients: EntityCollection<Client>
  ) { 
  }
  
  public getMerchants(): EntityCollection<Merchant> {
    return this._merchants;
  }

  public setMerchants(merchants: EntityCollection<Merchant>): void {
    this._merchants = merchants;
  }

  public getProducts(): EntityCollection<Product> {
    return this._products;
  }

  public setProducts(products: EntityCollection<Product>): void {
    this._products = products;
  }

  public getClients(): EntityCollection<Client> {
    return this._clients;
  }

  public setClients(clients: EntityCollection<Client>): void {
    this._clients = clients;
  }
  
  
  // Informes y Transacciones
  
}