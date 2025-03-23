import { IProducts } from "./interfaces.js";
// import { EntityCollection } from "./entityCollection.js";
import { Material } from "./enums.js";

/**
 * Class that represents a product
 */
export class Product implements IProducts {
  /**
   * Constructor of the class
   * @param _id - Id of the product
   * @param _name - Name of the product
   * @param _description - Description of the product
   * @param _material - Material of the product
   * @param _weight - Weight of the product
   * @param _crowns - Price in crowns of the product
   */
  constructor(
    private _id: number,
    private _name: string,
    private _description: string,
    private _material: Material,
    private _weight: number,
    private _crowns: number
  ) {}

  /**
   * Getter of the product's ID
   * @returns Product's ID
   */
  get id(): number {
    return this._id;
  }

  /**
   * Getter of the product's name
   * @returns Product's name
   */
  get name(): string {
    return this._name;
  }

  /**
   * Getter of the product's description
   * @returns Product's description
   */
  get description(): string {
    return this._description;
  }

  /**
   * Getter of the product's material
   * @returns Product's material
   */
  get material(): Material {
    return this._material;
  }

  /**
   * Getter of the product's weight
   * @returns Product's weight
   */
  get weight(): number {
    return this._weight;
  }

  /**
   * Getter of the product's crowns
   * @returns Product's crowns
   */
  get crowns(): number {
    return this._crowns;
  }

  /**
   * Setter of the product's ID
   * @param id - Product's ID
   */
  set id(id: number) {
    this._id = id;
  }

  /**
   * Setter of the product's name
   * @param name - Product
   */
  set name(name: string) {
    this._name = name;
  }

  /**
   * Setter of the product's description
   * @param description - Product's description
   */
  set description(description: string) {
    this._description = description;
  }

  /**
   * Setter of the product's material
   * @param material - Product's material
   */
  set material(material: Material) {
    this._material = material;
  }

  /**
   * Setter of the product's weight
   * @param weight - Product's weight
   */
  set weight(weight: number) {
    this._weight = weight;
  }

  /**
   * Setter of the product's crowns
   * @param crowns - Product's crowns
   */
  set crowns(crowns: number) {
    this._crowns = crowns;
  }
}