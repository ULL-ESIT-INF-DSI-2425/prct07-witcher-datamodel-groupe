import { IProducts } from "./interfaces.js";
import { EntityCollection } from "./entity-collection.js";
import { Material } from "./enums.js";

export class Product extends EntityCollection<Product> implements IProducts {
  constructor(
    private _id: number,
    private _name: string,
    private _description: string,
    private _material: Material,
    private _weight: number,
    private _crowns: number
  ) {
    super();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get material(): Material {
    return this._material;
  }

  get weight(): number {
    return this._weight;
  }

  get crowns(): number {
    return this._crowns;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set description(description: string) {
    this._description = description;
  }

  set material(material: Material) {
    this._material = material;
  }

  set weight(weight: number) {
    this._weight = weight;
  }

  set crowns(crowns: number) {
    this._crowns = crowns;
  }

  addEntity(entity: Product): boolean {
    if (this.collection.push(entity)) {
      return true;
    }
    return false;
  }

  dropEntity(entity: Product): Product | undefined {
    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index !== -1) {
      return this.collection.splice(index, 1)[0];
    }
    return undefined;
  }
  
  modifyEntity(entity: Product): boolean {
    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index !== -1) {
      this.collection[index] = entity;
      return true;
    }
    return false;
  }


  public getProductsByAttribute<K extends keyof Product>(attribute: K, value: Product[K]): string {
    const filteredProducts = this.collection.filter(product => product[attribute] === value);
    return filteredProducts
      .sort((a, b) => a.id - b.id)
      .map(product => `ID: ${product.id}, Name: ${product.name}, Description: ${product.description}, Material: ${product.material}, Weight: ${product.weight}, Crowns: ${product.crowns}`)
      .join('\n');
  }
}