import { IMerchants } from "./interfaces.js";
import { Type, Ubication } from './enums.js';

/**
 * Class that represents a merchant
 */
export class Merchant implements IMerchants {
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
  ) {}

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
}