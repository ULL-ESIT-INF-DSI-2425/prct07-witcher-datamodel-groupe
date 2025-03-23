import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Transaction } from "../transaction.js";
import { TransactionType } from "../enums.js";
import { Product } from "../product.js";
import { Client } from "../client.js";
import { Merchant } from "../merchant.js";
import { Material, Ubication, Race, Type } from "../enums.js";

interface TransactionSchema {
  transactions: {
    _date: string; 
    _type: string; 
    _entity: {
      _id: number; 
      _name: string; 
      _race?: string; 
      _ubication?: string; 
      _type?: string; 
    };
    _products: {
      _id: number; 
      _name: string; 
      _description: string; 
      _material: string; 
      _weight: number; 
      _crowns: number;
    }[];
    _crowns: number; 
    _reason?: string; 
  }[];
}

export class JsonTransactionCollection extends Transaction {
  private db: Low<TransactionSchema>;

  constructor(dbFilePath: string) {
    super();
    const adapter = new JSONFile<TransactionSchema>(dbFilePath);
    this.db = new Low(adapter, { transactions: [] });

    this.load();
  }

  /**
   * Carga los datos desde el archivo JSON a la colección de transacciones.
   */
  private async load(): Promise<void> {
    await this.db.read();
    this.db.data ||= { transactions: [] }; 

    this.db.data.transactions.forEach((transaction) => {
      const entity =
        transaction._type === TransactionType.Sale || transaction._type === TransactionType.Return
          ? new Client(transaction._entity._id, transaction._entity._name, transaction._entity._race as Race, transaction._entity._ubication as Ubication)
          : new Merchant(transaction._entity._id, transaction._entity._name, transaction._type as Type, transaction._entity._ubication as Ubication);

      const products = transaction._products.map(
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

      this.records.push({
        date: new Date(transaction._date),
        type: transaction._type as TransactionType,
        entity,
        products,
        crowns: transaction._crowns,
        reason: transaction._reason,
      });
    });
  }

  /**
   * Guarda los datos de las transacciones en el archivo JSON.
   */
  private async save(): Promise<void> {
    this.db.data = {
      transactions: this.records.map((record) => ({
        _date: record.date.toISOString(),
        _type: record.type,
        _entity: {
          _id: record.entity.id,
          _name: record.entity.name,
          ...(record.entity instanceof Client
            ? { _race: record.entity.race, _ubication: record.entity.ubication }
            : { _type: record.entity.type, _ubication: record.entity.ubication }),
        },
        _products: record.products.map((product) => ({
          _id: product.id,
          _name: product.name,
          _description: product.description,
          _material: product.material,
          _weight: product.weight,
          _crowns: product.crowns,
        })),
        _crowns: record.crowns,
        _reason: record.reason,
      })),
    };
    await this.db.write();
  }

  /**
   * Imprime el contenido del JSON cargado en la consola.
   */
  public printLoadedData(): void {
    console.log(this.db.data);
  }

  /**
   * Registra una venta y persiste los cambios.
   */
  override registerSale(client: Client, products: Product[], crowns: number): void {
    super.registerSale(client, products, crowns);
    this.save();
  }

  /**
   * Registra una compra y persiste los cambios.
   */
  override registerPurchase(merchant: Merchant, products: Product[], crowns: number): void {
    super.registerPurchase(merchant, products, crowns);
    this.save();
  }

  /**
   * Registra una devolución y persiste los cambios.
   */
  override registerReturn(entity: Client | Merchant, products: Product[], crowns: number, reason: string): void {
    super.registerReturn(entity, products, crowns, reason);
    this.save();
  }

  /**
   * Calcula el total de ingresos.
   * @returns Una cadena con el total de ingresos.
   */
  override Earns() {
    this.load();
    return super.Earns();
  }
  
  /**
    * Calcula el total de gastos.
    * @returns Una cadena con el total de gastos.
    */
  override Spends() {
    this.load();
    return super.Spends();
  }
}