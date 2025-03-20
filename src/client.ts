import { EntityCollection } from './entity-collection.js';
import { IClients } from "./interfaces.js"
import { Race } from './enums.js';
import { Ubication } from './enums.js';


export class Client extends EntityCollection<Client> implements IClients {
  constructor(
    private _id: number, 
    private _name: string, 
    private _race: Race,
    private _ubication: Ubication
  ) {
    super();
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get race(): Race {
    return this._race;
  }

  get ubication(): Ubication {
    return this._ubication;
  }

  set id(value: number) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  addEntity(entity: Client): boolean {
    if (entity._id === 1) {
      return true;
    }
    return false;
  }
  dropEntity(entity: Client): Client | undefined {
    if (entity._id === 1) {
      return entity;
    }
    return undefined;
  }
  modifyEntity(entity: Client): boolean {
    if (entity._id === 1) {
      return true;
    }
    return false;
  }
}