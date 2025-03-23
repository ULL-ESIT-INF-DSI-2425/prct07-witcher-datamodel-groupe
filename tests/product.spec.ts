import { describe, it, expect } from "vitest";
import { Product } from "../src/product";
import { Material } from "../src/enums";

describe("Product Class test", () => {
  let product: Product;
  product = new Product(1, "Espada Peligrosa", "Una espada muy pero muy afilada", Material.Acero, 3.5, 150);

  it("Should create a product with the correct values of the attributes", () => {
    expect(product.id).toBe(1);
    expect(product.name).toBe("Espada Peligrosa");
    expect(product.description).toBe("Una espada muy pero muy afilada");
    expect(product.material).toBe(Material.Acero);
    expect(product.weight).toBe(3.5);
    expect(product.crowns).toBe(150);
  });

  it("Should update product attributes using the setters we defined in the class", () => {
    product.id = 2;
    product.name = "Espada quemada";
    product.description = "La Espada peligrosa pero hecha cenizas";
    product.material = Material.Ceniza;
    product.weight = 5.0;
    product.crowns = 200;

    expect(product.id).toBe(2);
    expect(product.name).toBe("Espada quemada");
    expect(product.description).toBe("La Espada peligrosa pero hecha cenizas");
    expect(product.material).toBe(Material.Ceniza);
    expect(product.weight).toBe(5.0);
    expect(product.crowns).toBe(200);
  });

  it("Should return the length of the collection attribute", () => {
    expect(product.getCollectionLenght()).toBe(0);
  });

  it("Should add a product to the collection attribute in the super class", () => {
    const newProduct = new Product(3, "Casco Humano", "Un doble craneo", Material.Huesos, 2.0, 100);
    const result = product.addEntity(newProduct);

    expect(result).toBe(true);
    expect(product.collection).toContain(newProduct);
  });

  it("Should return the length of the collection attribute", () => {
    expect(product.getCollectionLenght()).toBe(1);
  });

  it("Should remove a product from the collection in the super class", () => {
    const newProduct = new Product(3, "Casco Humano", "Un doble craneo", Material.Huesos, 2.0, 100);
    const removedProduct = product.dropEntity(newProduct);

    expect(removedProduct).toStrictEqual(newProduct);
    expect(product.collection).not.toContain(newProduct); 
  });

  it("Should modify the product attributes in the collection", () => {
    const product = new Product(3, "Casco Humano", "Un doble craneo", Material.Huesos, 2.0, 100);
    product.addEntity(product);

    const modifiedProduct = new Product(3, "Casco Humano con Escamas molonas", "Ahora tiene escamas", Material.Escamas, 2.5, 500);
    const result = product.modifyEntity(modifiedProduct);

    expect(result).toBe(true);
    expect(product.collection[0].name).toBe("Casco Humano con Escamas molonas");
    expect(product.collection[0].material).toBe(Material.Escamas);
    expect(product.collection[0].crowns).toBe(500);
  });

  it("Should retrieve products by attribute", () => {
    const product2 = new Product(4, "Espejo magico", "Refleja cosas y eso", Material.Espejo, 10.0, 1000);
    product.addEntity(product2);

    const result = product.getProductsByAttribute("material", Material.Espejo);

    expect(result).toContain("ID: 4, Name: Espejo magico, Description: Refleja cosas y eso, Material: Espejo de cristal oscuro, Weight: 10, Crowns: 1000");
    expect(result).not.toContain("ID: 3, Name: Golden Helmet, Description: A golden helmet, Material: Gold, Weight: 2.5, Crowns: 500");
  });

  it("Should throw an error when adding a product that already exists", () => {
    const product2 = new Product(4, "Espejo magico", "Refleja cosas y eso", Material.Espejo, 10.0, 1000);

    expect(() => product.addEntity(product2)).toThrowError(
      `El producto ya existe en la colección.`
    );
  });

  it("Should throw an error when removing a product that does not exist", () => {
    const nonExistentProduct = new Product(99, "No existe", "No existe", Material.Hielo, 1.0, 50);

    expect(() => product.dropEntity(nonExistentProduct)).toThrowError(
      `El producto no existe en la colección.`
    );
  });

  it("Should throw an error when retrieving products by an invalid attribute", () => {
    const invalidAttribute = "invalidAttribute" as keyof Product;

    const invalidValue = "value" as unknown as Product[keyof Product];

    expect(() => product.getProductsByAttribute(invalidAttribute, invalidValue)).toThrowError(
      `El atributo "${invalidAttribute}" no es válido.`
    );
  });

  it("Should throw an error when modifying a product that does not exist", () => {
    const nonExistentProduct = new Product(99, "No existe esto", "No existe", Material.Hielo, 1.0, 50);

    expect(() => product.modifyEntity(nonExistentProduct)).toThrowError(
      `El producto no existe en la colección.`
    );
  });

  it("Should return a message when no products match the attribute", () => {
    const result = product.getProductsByAttribute("material", Material.Fragmentos);

    expect(result).toBe("No se encontraron productos con el atributo especificado.");
  });
});

describe("Product Class Object Test", () => {
  let product4: Product;
  product4 = new Product(5, "Pocion De amor", "La tiras y enamoras al toque", Material.Polvo, 0.5, 50);

  it("Should verify that product4 is an instance of the Product class", () => {
    expect(product4).toBeInstanceOf(Product);
  });

  it("Should verify that product4 is an object", () => {
    expect(typeof product4).toBe("object");
  });

  it("Should verify that product4 has the expected properties", () => {
    expect(product4).toHaveProperty("id", 5);
    expect(product4).toHaveProperty("name", "Pocion De amor");
    expect(product4).toHaveProperty("description", "La tiras y enamoras al toque");
    expect(product4).toHaveProperty("material", Material.Polvo);
    expect(product4).toHaveProperty("weight", 0.5);
    expect(product4).toHaveProperty("crowns", 50);
  });

  it("Should verify that product4's initial collection is an empty array", () => {
    expect(product4.collection).toBeInstanceOf(Array);
    expect(product4.collection.length).toBe(0);
  });
});