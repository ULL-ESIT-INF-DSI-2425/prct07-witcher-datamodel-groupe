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
    if (entity._id === 1) {
      return true;
    }
    return false;
  }
  dropEntity(entity: Product): Product | undefined {
    if (entity._id === 1) {
      return entity;
    }
    return undefined;
  }
  modifyEntity(entity: Product): boolean {
    if (entity._id === 1) {
      return true;
    }
    return false;
  }
}