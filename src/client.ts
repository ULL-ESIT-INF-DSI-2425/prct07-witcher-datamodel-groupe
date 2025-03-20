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

  set race(race: Race) {
    this._race = race; 
  }

  set ubication(ubication: Ubication) {
    this._ubication = ubication;
  }

  addEntity(entity: Client): boolean {
    if (this.collection.push(entity)) {
      return true;
    }
    return false;
  }

  dropEntity(entity: Client): Client | undefined {
    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index !== -1) {
      return this.collection.splice(index, 1)[0];
    }
    return undefined;
  }

  modifyEntity(entity: Client): boolean {
    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index !== -1) {
      this.collection[index] = entity;
      return true;
    }
    return false;
  }

  public getClientsByAttribute<K extends keyof Client>(attribute: K, value: Client[K]): string {
    const filteredClients = this.collection.filter(client => client[attribute] === value);
    return filteredClients
      .sort((a, b) => a.id - b.id)
      .map(client => `ID: ${client.id}, Name: ${client.name}, Race: ${client.race}, Ubication: ${client.ubication}`)
      .join('\n');
  }
}