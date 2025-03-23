import { EntityCollection } from './entityCollection.js';
import { Product } from './product.js';

export class ProductCollection extends EntityCollection<Product> {
  constructor() {
    super();
  }

  /**
   * Method that returns a string with the product's information
   * @param entity - Product to add
   * @returns True if the product was added, false otherwise
   */
  addEntity(entity: Product): boolean {
    if (!entity) {
      throw new Error('The entity is not valid');
    }

    if (this.collection.some(item => item.id === entity.id)) {
      throw new Error('El producto ya existe en la colección.');
    }

    this.collection.push(entity);
    return true;
  }

  /**
   * Method that removes a product from the collection
   * @param entity - Product to remove
   * @returns Product if the product was removed, undefined otherwise
   */
  dropEntity(entity: Product): Product | undefined {
    if (!entity) {
      throw new Error('The entity is not valid');
    }

    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index === -1) {
      throw new Error('El producto no existe en la colección.');
    }
    return this.collection.splice(index, 1)[0];
  }
  
  /**
   * Method that modifies a product in the collection
   * @param entity - Product to modify
   * @returns True if the product was modified, false otherwise
   */
  modifyEntity(entity: Product): boolean {
    if (!entity) {
      throw new Error('El producto proporcionado no puede ser nulo o indefinido.');
    }

    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index === -1) {
      throw new Error('El producto no existe en la colección.');
    }
    
    this.collection[index] = entity;
    return true;
  }

  /**
   * Method that returns a string with the products that have the specified attribute
   * @param attribute - Attribute to filter
   * @param value - Value of the attribute
   * @returns String with the products that have the specified attribute
   */
  public getProductsByAttribute<K extends keyof Product>(attribute: K, value: Product[K]): string {
    if (!["id", "name", "description", "material", "weight", "crowns"].includes(attribute)) {
      throw new Error(`El atributo "${attribute}" no es válido.`);
    }

    const filteredProducts = this.collection.filter(product => product[attribute] === value);

    if (filteredProducts.length === 0) {
      return "No se encontraron productos con el atributo especificado.";
    }

    return filteredProducts
      .sort((a, b) => a.id - b.id)
      .map(product => `ID: ${product.id}, Name: ${product.name}, Description: ${product.description}, Material: ${product.material}, Weight: ${product.weight}, Crowns: ${product.crowns}`)
      .join('\n');
  }
}