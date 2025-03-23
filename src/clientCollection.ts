import { Client } from './client.js';
import { EntityCollection } from './entityCollection.js';

/**
 * Class that represents the collection of clients
 */
export class ClientCollection extends EntityCollection<Client> {
  constructor() {
    super();
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