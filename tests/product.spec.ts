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

  it("Should update product attributes using the setters", () => {
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
});