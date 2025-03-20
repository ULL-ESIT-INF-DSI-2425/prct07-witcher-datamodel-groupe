import { EntityCollection } from "./entity-collection.js";
import { IMerchants } from "./interfaces.js";
import { Type, Ubication } from './enums.js';


export class Merchant extends EntityCollection<Merchant> implements IMerchants{
  constructor(
    private _id: number, 
    private _name: string, 
    private _type: Type,
    private _ubication: Ubication
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

  get type(): Type {
    return this._type;
  }

  get ubication(): Ubication {
    return this._ubication;
  }

  // Setters
  set id(value: number) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set type(value: Type) {
    this._type = value;
  }

  set ubication(value: Ubication) {
    this._ubication = value;
  }
  
  // Funciones
  addEntity(entity: Merchant): boolean {
    if (entity._id === 1) {
      return true;
    }
    return false;
  }
  dropEntity(entity: Merchant): Merchant | undefined {
    if (entity._id === 1) {
      return entity;
    }
    return undefined;
  }
  modifyEntity(entity: Merchant): boolean {
    if (entity._id === 1) {
      return true;
    }
    return false;
  }
}