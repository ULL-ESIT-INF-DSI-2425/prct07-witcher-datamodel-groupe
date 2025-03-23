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
    if (!entity) {
      throw new Error('The entity is not valid');
    }

    if (this.collection.some(item => item.id === entity.id)) {
      throw new Error('El comerciante ya existe en la colección.');
    }

    this.collection.push(entity);
    return true;
  }

  /**
   * Method that removes a merchant from the collection
   * @param entity - Merchant to drop
   * @returns - The merchant dropped or undefined if the merchant was not found
   */
  dropEntity(entity: Merchant): Merchant | undefined {
    if (!entity) {
      throw new Error('The entity is not valid');
    }

    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index === -1) {
      throw new Error('El comerciante no existe en la colección.');
    }
    return this.collection.splice(index, 1)[0];
  }

  /**
   * Method that modifies a merchant from the collection
   * @param entity - Merchant to modify
   * @returns - True if the merchant was modified, false otherwise
   */
  modifyEntity(entity: Merchant): boolean {
    if (!entity) {
      throw new Error('El comerciante proporcionado no puede ser nulo o indefinido.');
    }

    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index === -1) {
      throw new Error('El comerciante no existe en la colección.');
    }

    this.collection[index] = entity;
    return true;
  }

  /**
   * Function that returns a string with the merchants that match the filter
   * @param attribute - The attribute to filter by
   * @param value - The value to filter by
   * @returns - A string with the merchants that match the filter
   */
  public getMerchantsByAttribute<K extends keyof Merchant>(attribute: K, value: Merchant[K]): string {
    if(!['id', 'name', 'type', 'ubication'].includes(attribute)) {
      throw new Error(`El atributo "${attribute}" no es válido.`);
    }
    const filteredMerchants = this.collection.filter(merchant => merchant[attribute] === value);
    if (filteredMerchants.length === 0) {
      return "No se encontraron comerciantes con el atributo especificado.";
    }

    return filteredMerchants
      .sort((a, b) => a.id - b.id)
      .map(merchant => `ID: ${merchant.id}, Name: ${merchant.name}, Type: ${merchant.type}, Ubication: ${merchant.ubication}`)
      .join('\n');
  }
}