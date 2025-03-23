import { EntityCollection } from './entityCollection.js';
import { IClients } from "./interfaces.js"
import { Race } from './enums.js';
import { Ubication } from './enums.js';


/**
  * Class that represents a Client entity
 */
export class Client extends EntityCollection<Client> implements IClients {
  /**
   * Constructor of the class client that receives the following parameters
   * @param _id - Represents the id number of the client
   * @param _name - Represents the name of the client
   * @param _race - Represents the race of the clien 
   * @param _ubication - Represents the ubication of the client
   */
  constructor(
    private _id: number, 
    private _name: string, 
    private _race: Race,
    private _ubication: Ubication
  ) {
    super();
  }

  /**
   * Getter function that returns the id of the client
   * @returns the id of the client
   */
  get id(): number {
    return this._id;
  }

  /**
   * Getter function that returns the name of the client
   * @returns the name of the client
   */
  get name(): string {
    return this._name;
  }

  /**
   * Getter function that returns
   * @returns the race of the client
   */
  get race(): Race {
    return this._race;
  }

  /**
   * Getter function that returns the ubication of the client
   * @returns the ubication of the client
   */
  get ubication(): Ubication {
    return this._ubication;
  }

  /**
   * Setter function that sets the id of the client
   * @param value - Represents the id of
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Setter function that sets the name of the client
   * @param value - Represents the name of the client
   */
  set name(value: string) {
    this._name = value;
  }

  /**
   * Setter function that sets
   * @param race - Represents the new race of the client
   */
  set race(race: Race) {
    this._race = race; 
  }

  /**
   * Setter function that sets the ubication of the client
   * @param ubication - Represents the new ubication of the client
   */
  set ubication(ubication: Ubication) {
    this._ubication = ubication;
  }

  /**
   * Function that returns the client information
   * @returns the client information
   */
  addEntity(entity: Client): boolean {
    if (!entity) {
      throw new Error('The entity is not valid');
    }
  
    if (this.collection.some(item => item.id === entity.id)) {
      throw new Error('El cliente ya existe en la colección.');
    }

    this.collection.push(entity);
    return true;
  }

  /**
   * Function that returns the client information
   * @returns the client information
   */
  dropEntity(entity: Client): Client | undefined {
    if (!entity) {
      throw new Error('The entity is not valid');
    }

    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index === -1) {
      throw new Error('El cliente no existe en la colección.');
    }

    return this.collection.splice(index, 1)[0];
  }

  /**
   * Function that returns the client information
   * @returns the client information
   */
  modifyEntity(entity: Client): boolean {
    if (!entity) {
      throw new Error('El cliente proporcionado no puede ser nulo o indefinido.');
    }

    const index = this.collection.findIndex(item => item.id === entity.id);
    if (index === -1) {
      throw new Error('El cliente no existe en la colección.');
    }

    this.collection[index] = entity;
    return true;
  }
  
  /**
   * Function that returns the client information
   * @returns the client information
   */
  public getClientsByAttribute<K extends keyof Client>(attribute: K, value: Client[K]): string {
    if (!["id", "name", "race", "ubication"].includes(attribute as string)) {
      throw new Error(`El atributo "${attribute}" no es válido.`);
    }

    const filteredClients = this.collection.filter(client => client[attribute] === value);


    if (filteredClients.length === 0) {
      return "No se encontraron clientes con el atributo especificado.";
    }

    return filteredClients
      .sort((a, b) => a.id - b.id)
      .map(client => `ID: ${client.id}, Name: ${client.name}, Race: ${client.race}, Ubication: ${client.ubication}`)
      .join('\n');
  }
}