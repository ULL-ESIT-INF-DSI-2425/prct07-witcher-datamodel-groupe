import {Ubication, Type, Race, Material} from "./enums.js"


/**
 * Interface for identify an element
 */
export interface Identifiable {
  id: number; 
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
 * Interface for a Products extends Identifiable 
 */
export interface IProducts extends Identifiable {
  description: string; 
  material: Material;
  weight: number;
  crowns: number;
}

export interface IMerchants extends Identifiable, Ubicable {
  type: Type; 
}

/**
 * Interface 
 */
export interface IClients extends Identifiable, Ubicable {
  race: Race; 
}

export interface Transaction<T extends IProducts | IMerchants | IClients> {
  addEntity(entity: T): boolean; 
  dropEntity(entity: T): T | undefined; 
  modifyEntity(entity: T): boolean; 
}

export interface Inquire<T> {
  getEntityInfo(type: T) : string;
}