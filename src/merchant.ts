import { EntityCollection } from "./entityCollection.js";
import { IMerchants } from "./interfaces.js";
import { Type, Ubication } from './enums.js';

/**
 * Class that represents a merchant
 */
export class Merchant extends EntityCollection<Merchant> implements IMerchants {
  /**
   * Constructor of the class
   * @param _id - Merchant's ID
   * @param _name - Merchant's name
   * @param _type - Merchant's type
   * @param _ubication - Merchant's ubication
   */
  constructor(
    private _id: number, 
    private _name: string, 
    private _type: Type,
    private _ubication: Ubication
  ) {
    super();
  }

  /**
   * Getter of the merchant's ID
   * @returns Merchant's ID
   */
  get id(): number {
    return this._id;
  }
  
  /**
   * Getter of the merchant's name
   * @returns Merchant's name
   */
  get name(): string {
    return this._name;
  }

  /**
   * Getter of the merchant's type
   * @returns Merchant's type
   */
  get type(): Type {
    return this._type;
  }

  /**
   * Getter of the merchant's ubication
   * @returns Merchant's ubication
   */
  get ubication(): Ubication {
    return this._ubication;
  }

  /**
   * Setter of the merchant's ID
   * @param value - Merchant's ID
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Setter of the merchant's name
   * @param value - Merchant's name
   */
  set name(value: string) {
    this._name = value;
  }
  
  /**
   * Setter of the merchant's type
   * @param value - Merchant's type
   */
  set type(value: Type) {
    this._type = value;
  }

  /**
   * Setter of the merchant's ubication
   * @param value - Merchant's ubication
   */
  set ubication(value: Ubication) {
    this._ubication = value;
  }
  
  /**
   * Method that adds a merchant to the collection
   * @param entity - Merchant to add
   * @returns - True if the merchant was added, false otherwise
   */
  addEntity(entity: Merchant): boolean {
    if (this.collection.push(entity)) {
      return true;
    }
    return false;
  }

  /**
   * Method that removes a merchant from the collection
   * @param entity - Merchant to drop
   * @returns - The merchant dropped or undefined if the merchant was not found
   */
  dropEntity(entity: Merchant): Merchant | undefined {
    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index !== -1) {
      return this.collection.splice(index, 1)[0];
    }
    return undefined;
  }

  /**
   * Method that modifies a merchant from the collection
   * @param entity - Merchant to modify
   * @returns - True if the merchant was modified, false otherwise
   */
  modifyEntity(entity: Merchant): boolean {
    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index !== -1) {
      this.collection[index] = entity;
      return true;
    }
    return false;
  }

  /**
   * Function that returns a string with the merchants that match the filter
   * @param attribute - The attribute to filter by
   * @param value - The value to filter by
   * @returns - A string with the merchants that match the filter
   */
  public getMerchantsByAttribute<K extends keyof Merchant>(attribute: K, value: Merchant[K]): string {
    const filteredMerchants = this.collection.filter(merchant => merchant[attribute] === value);
    return filteredMerchants
      .sort((a, b) => a.id - b.id)
      .map(merchant => `ID: ${merchant.id}, Name: ${merchant.name}, Type: ${merchant.type}, Ubication: ${merchant.ubication}`)
      .join('\n');
  }
}