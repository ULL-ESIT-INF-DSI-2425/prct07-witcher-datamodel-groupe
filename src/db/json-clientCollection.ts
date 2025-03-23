import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Client } from "../client.js";
import { ClientCollection } from "../clientCollection.js";
import { Race, Ubication } from '../enums.js';

interface ClientSchema {
  clients: {
    _id: number;
    _name: string;
    _race: string;
    _ubication: string;
  }[];
}

export class JsonClientCollection extends ClientCollection {
  private db: Low<ClientSchema>;

  constructor(dbFilePath: string) {
    super();
    const adapter = new JSONFile<ClientSchema>(dbFilePath);
    this.db = new Low(adapter, { clients: [] });

    this.load();
  }

  /**
   * Carga los datos desde el archivo JSON a la colección.
   */
  private async load(): Promise<void> {
    await this.db.read(); 
    this.db.data ||= { clients: [] };

    this.collection = this.db.data.clients.map(
      (client) =>
        new Client(
          client._id,
          client._name,
          client._race as Race,
          client._ubication as Ubication
        )
    );
  }

  /**
   * Guarda los datos de la colección en el archivo JSON.
   */
  private async save(): Promise<void> {
    this.db.data = {
      clients: this.collection.map((client) => ({
        _id: client.id,
        _name: client.name,
        _race: client.race,
        _ubication: client.ubication,
      })),
    };
    this.db.write(); 
  }

  /**
   * Sobrescribe el método para añadir un cliente y persiste los cambios.
   * @param entity - Cliente a añadir.
   * @returns True si el cliente fue añadido, false en caso contrario.
   */
  addEntity(entity: Client): boolean {
    const result = super.addEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }

  /**
   * Sobrescribe el método para eliminar un cliente y persiste los cambios.
   * @param entity - Cliente a eliminar.
   * @returns El cliente eliminado o undefined si no se encontró.
   */
  dropEntity(entity: Client): Client | undefined {
    const result = super.dropEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }

  /**
   * Sobrescribe el método para modificar un cliente y persiste los cambios.
   * @param entity - Cliente a modificar.
   * @returns True si el cliente fue modificado, false en caso contrario.
   */
  modifyEntity(entity: Client): boolean {
    const result = super.modifyEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }
}