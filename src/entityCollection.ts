import { IProducts, IMerchants, IClients } from "./interfaces.js";
import { Transaction } from "./interfaces.js";

/**
 * EntityCollection class is an abstract class that implements the Transaction interface.
 * It is a generic class that can be
 * extended by the Merchant, Client, and Product classes.
 */
export abstract class EntityCollection<T extends IClients | IMerchants | IProducts> implements Transaction<T> {
  /**
   * collection property is an array of type T.
   */
  collection: T[];
  
  /**
   * Constructor for the EntityCollection class.
   * It initializes the collection property to an empty array.
   */
  constructor() {
    this.collection = [];
  }

  getNumberOfProducts() {
    return this.collection.length;
  }
  
  abstract addEntity(entity: T): boolean;
  abstract dropEntity(entity: T): T | undefined; 
  abstract modifyEntity(entity: T): boolean; 
}
