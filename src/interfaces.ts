import {Ubication, Type, Race, Material} from "./enums.js"


/**
 * Interface for identify an element
 */
export interface Identifiable {
  /**
   * Represents the id of an object
   */
  id: number; 
  /**
   * Represents the name of an object
   */
  name: string; 
}

/**
 * Interface for an ubication
 */
export interface Ubicable {
  /**
   * Represents the ubication of an object
   */
  ubication: Ubication; 
}

/**
 * Interface that represents the atributtes a product should have
 */
export interface IProducts extends Identifiable {
  /**
   * Represents the description of a product
   */
  description: string; 
  /**
   * Represents the materiañ of a product
   */
  material: Material;
  /**
   * Represents the weight of a product
   */
  weight: number;
  /**
   * Represents the price of a product
   */
  crowns: number;
}

/**
 * Interface that represents the atributtes a merchant should have
 */
export interface IMerchants extends Identifiable, Ubicable {
  /**
   * Represents the type of a merchant
   */
  type: Type; 
}

/**
 * Interface that represents the atributtes a client should have
 */
export interface IClients extends Identifiable, Ubicable {
  /**
   * Represents the race of a client
   */
  race: Race; 
}

export interface Transaction<T extends IProducts | IMerchants | IClients> {
  /**
   * Method that adds an entity to the list
   * @param entity - Entity to add
   * @returns True if the entity was added, false otherwise
   */
  addEntity(entity: T): boolean; 
  /**
   * Method that removes an entity from the list
   * @param entity - Entity to remove
   * @returns The entity that was removed, undefined otherwise
   */
  dropEntity(entity: T): T | undefined; 
  /**
   * Method that modifies an entity from the list
   * @param entity - Entity to modify
   * @returns True if the entity was modified, false otherwise
   */
  modifyEntity(entity: T): boolean; 
}

export interface Inquire<T> {
  /**
   * Method that returns the information of an entity
   * @param type - Type of the entity
   * @returns The information of the entity
   */
  getEntityInfo(type: T) : string;
}