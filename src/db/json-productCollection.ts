import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Product } from "../product.js";
import { ProductCollection } from "../productCollection.js";
import { Material } from '../enums.js';

interface ProductSchema {
  products: {
    _id: number;
    _name: string;
    _description: string;
    _material: string;
    _weight: number;
    _crowns: number;
  }[];
}

export class JsonProductCollection extends ProductCollection {
  private db: Low<ProductSchema>;

  constructor(dbFilePath: string) {
    super();
    const adapter = new JSONFile<ProductSchema>(dbFilePath);
    this.db = new Low(adapter, { products: [] });

    this.load();
  }

/**
 * Carga los datos desde el archivo JSON a la colección.
 */
private async load(): Promise<void> {
  await this.db.read();
  this.db.data ||= { products: [] };

  this.collection = this.db.data.products.map(
    (product) =>
      new Product(
        product._id,
        product._name,
        product._description,
        product._material as Material,
        product._weight,
        product._crowns
      )
  );
}

  /**
   * Guarda los datos de la colección en el archivo JSON.
   */
  private async save(): Promise<void> {
    this.db.data = { 
      products: this.collection.map(product => ({
        _id: product.id,
        _name: product.name,
        _description: product.description,
        _material: product.material,
        _weight: product.weight,
        _crowns: product.crowns
      }))
    };
    this.db.write(); 
  }

  /**
   * Sobrescribe el método para añadir un producto y persiste los cambios.
   * @param entity - Producto a añadir.
   * @returns True si el producto fue añadido, false en caso contrario.
   */
  addEntity(entity: Product): boolean {
    const result = super.addEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }

  /**
   * Sobrescribe el método para eliminar un producto y persiste los cambios.
   * @param entity - Producto a eliminar.
   * @returns El producto eliminado o undefined si no se encontró.
   */
  dropEntity(entity: Product): Product | undefined {
    const result = super.dropEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }

  /**
   * Sobrescribe el método para modificar un producto y persiste los cambios.
   * @param entity - Producto a modificar.
   * @returns True si el producto fue modificado, false en caso contrario.
   */
  modifyEntity(entity: Product): boolean {
    const result = super.modifyEntity(entity);
    if (result) {
      this.save();
    }
    return result;
  }
}