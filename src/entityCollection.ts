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

  /**
   * getNumberOfProducts method returns the number of products in the collection.
   * @returns number
   * @returns the number of products in the collection.
   * @returns 0 if the collection is empty.
   */
  getNumberOfProducts() {
    return this.collection.length;
  }
  
  /**
   * addEntity method adds an entity to the collection.
   * @param entity - entity to be added to the collection.
   * @returns true if the entity is added successfully.
   * @returns false if the entity is not added.
   */
  abstract addEntity(entity: T): boolean;

  /**
   * dropEntity method removes an entity from the collection.
   * @param entity - entity to be removed from the collection.
   * @returns the entity that is removed from the collection.
   * @returns undefined if the entity is not removed.
   */
  abstract dropEntity(entity: T): T | undefined; 

  /**
   * modifyEntity method modifies an entity in the collection.
   * @param entity - entity to be modified in the collection.
   * @returns true if the entity is modified successfully.
   * @returns false if the entity is not modified.
   */
  abstract modifyEntity(entity: T): boolean; 
}
