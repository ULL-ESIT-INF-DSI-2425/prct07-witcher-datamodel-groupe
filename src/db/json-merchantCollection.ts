import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Merchant } from "../merchant.js";
import { MerchantCollection } from "../merchantCollection.js";
import { Type, Ubication } from '../enums.js';

interface MerchantSchema {
  merchants: {
    _id: number;
    _name: string;
    _type: string;
    _ubication: string;
  }[];
}

export class JsonMerchantCollection extends MerchantCollection {
  private db: Low<MerchantSchema>;

  constructor(dbFilePath: string) {
    super();
    const adapter = new JSONFile<MerchantSchema>(dbFilePath);
    this.db = new Low(adapter, { merchants: [] });

    // Cargar los datos iniciales desde el archivo JSON
    this.load();
  }

  /**
   * Carga los datos desde el archivo JSON a la colección.
   */
  private async load(): Promise<void> {
    await this.db.read(); // Leer los datos de forma síncrona
    this.db.data ||= { merchants: [] }; // Inicializar los datos si están vacíos

    // Mapear los datos del JSON a la colección de mercaderes
    this.collection = this.db.data.merchants.map(
      (merchant) =>
        new Merchant(
          merchant._id,
          merchant._name,
          merchant._type as Type,
          merchant._ubication as Ubication
        )
    );
  }

  /**
   * Guarda los datos de la colección en el archivo JSON.
   */
  private async save(): Promise<void> {
    this.db.data = {
      merchants: this.collection.map((merchant) => ({
        _id: merchant.id,
        _name: merchant.name,
        _type: merchant.type,
        _ubication: merchant.ubication,
      })),
    };
    this.db.write(); // Guardar los datos de forma síncrona
  }

  /**
   * Sobrescribe el método para añadir un mercader y persiste los cambios.
   * @param entity - Mercader a añadir.
   * @returns True si el mercader fue añadido, false en caso contrario.
   */
  addEntity(entity: Merchant): boolean {
    const result = super.addEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }

  /**
   * Sobrescribe el método para eliminar un mercader y persiste los cambios.
   * @param entity - Mercader a eliminar.
   * @returns El mercader eliminado o undefined si no se encontró.
   */
  dropEntity(entity: Merchant): Merchant | undefined {
    const result = super.dropEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }

  /**
   * Sobrescribe el método para modificar un mercader y persiste los cambios.
   * @param entity - Mercader a modificar.
   * @returns True si el mercader fue modificado, false en caso contrario.
   */
  modifyEntity(entity: Merchant): boolean {
    const result = super.modifyEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }
}