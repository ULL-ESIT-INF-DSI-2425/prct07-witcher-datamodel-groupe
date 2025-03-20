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
    if (this.collection.push(entity)) {
      return true;
    }
    return false;
  }

  dropEntity(entity: Merchant): Merchant | undefined {
    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index !== -1) {
      return this.collection.splice(index, 1)[0];
    }
    return undefined;
  }

  modifyEntity(entity: Merchant): boolean {
    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index !== -1) {
      this.collection[index] = entity;
      return true;
    }
    return false;
  }

  public getMerchantsByAttribute<K extends keyof Merchant>(attribute: K, value: Merchant[K]): string {
    const filteredMerchants = this.collection.filter(merchant => merchant[attribute] === value);
    return filteredMerchants
      .sort((a, b) => a.id - b.id)
      .map(merchant => `ID: ${merchant.id}, Name: ${merchant.name}, Type: ${merchant.type}, Ubication: ${merchant.ubication}`)
      .join('\n');
  }
}