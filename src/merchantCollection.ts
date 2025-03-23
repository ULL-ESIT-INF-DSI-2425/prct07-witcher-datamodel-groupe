import { EntityCollection } from './entityCollection.js';
import { Merchant } from './merchant.js';

/**
 * Class that represents a collection of merchants
 */
export class MerchantCollection extends EntityCollection<Merchant> {
  constructor() {
    super();
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