import { describe, it, expect, beforeEach } from "vitest";
import { ProductCollection } from "../src/productCollection";
import { Product } from "../src/product";
import { Material } from "../src/enums";

describe("ProductCollection Class test", () => {
  let productCollection: ProductCollection;
  let product1: Product;
  let product2: Product;

  beforeEach(() => {
    productCollection = new ProductCollection();
    product1 = new Product(1, "Espada Peligrosa", "Una espada muy pero muy afilada", Material.Acero, 3.5, 150);
    product2 = new Product(2, "Escudo Resistente", "Un escudo de madera reforzada", Material.Madera, 5.0, 200);
    productCollection.addEntity(product1);
  });

  it("Should add a product to the collection", () => {
    const result = productCollection.addEntity(product2);

    expect(result).toBe(true);
    expect(productCollection.collection).toContain(product2);
  });

  it("Should throw an error when adding a product that already exists", () => {
    expect(() => productCollection.addEntity(product1)).toThrowError(
      "El producto ya existe en la colección."
    );
  });

  it("Should remove a product from the collection", () => {
    const removedProduct = productCollection.dropEntity(product1);

    expect(removedProduct).toStrictEqual(product1);
    expect(productCollection.collection).not.toContain(product1);
  });

  it("Should throw an error when removing a product that does not exist", () => {
    const nonExistentProduct = new Product(99, "Producto Fantasma", "No existe", Material.Hielo, 1.0, 50);

    expect(() => productCollection.dropEntity(nonExistentProduct)).toThrowError(
      "El producto no existe en la colección."
    );
  });

  it("Should modify a product in the collection", () => {
    const modifiedProduct = new Product(1, "Espada Legendaria", "Una espada con poderes mágicos", Material.Acero, 4.0, 300);
    const result = productCollection.modifyEntity(modifiedProduct);

    expect(result).toBe(true);
    expect(productCollection.collection[0].name).toBe("Espada Legendaria");
    expect(productCollection.collection[0].crowns).toBe(300);
  });

  it("Should throw an error when modifying a product that does not exist", () => {
    const nonExistentProduct = new Product(99, "Producto Fantasma", "No existe", Material.Hielo, 1.0, 50);

    expect(() => productCollection.modifyEntity(nonExistentProduct)).toThrowError(
      "El producto no existe en la colección."
    );
  });

  it("Should retrieve products by attribute", () => {
    productCollection.addEntity(product2);

    const result = productCollection.getProductsByAttribute("material", Material.Madera);

    expect(result).toContain("ID: 2, Name: Escudo Resistente, Description: Un escudo de madera reforzada, Material: Madera de roble de las colinas grises, Weight: 5, Crowns: 200");
    expect(result).not.toContain("ID: 1, Name: Espada Peligrosa, Description: Una espada muy pero muy afilada, Material: Acero de Mahakam, Weight: 3.5, Crowns: 150");
  });

  it("Should throw an error when retrieving clients by an invalid attribute", () => {
    const invalidAttribute = "invalidAttribute" as keyof Product;

    const invalidValue = "value" as unknown as Product[keyof Product];

    expect(() => productCollection.getProductsByAttribute(invalidAttribute, invalidValue)).toThrowError(
      `El atributo "${invalidAttribute}" no es válido.`
    );
  });

  it("Should return a message when no products match the attribute", () => {
    const result = productCollection.getProductsByAttribute("material", Material.Hielo);

    expect(result).toBe("No se encontraron productos con el atributo especificado.");
  });
});