import { describe, it, expect } from "vitest";
import { Merchant } from "../src/merchant";
import { Type, Ubication } from "../src/enums";

describe("Merchant Class test", () => {
  let merchant: Merchant;

  merchant = new Merchant(1, "Jardinero", Type.Mercader_g, Ubication.Skellige);

  it("Should create a merchant with the correct values of the attributes", () => {
    expect(merchant.id).toBe(1);
    expect(merchant.name).toBe("Jardinero");
    expect(merchant.type).toBe(Type.Mercader_g);
    expect(merchant.ubication).toBe(Ubication.Skellige);
  });

  it("Should update merchant attributes using the setters we defined in the class", () => {
    merchant.id = 2;
    merchant.name = "Ermitaño";
    merchant.type = Type.Sastre;
    merchant.ubication = Ubication.Velen;

    expect(merchant.id).toBe(2);
    expect(merchant.name).toBe("Ermitaño");
    expect(merchant.type).toBe(Type.Sastre);
    expect(merchant.ubication).toBe(Ubication.Velen);
  });
});

describe("Merchant Class Object Test", () => {
  let merchant4: Merchant;
  merchant4 = new Merchant(5, "Haren Brogg", Type.Coleccionista, Ubication.Toussaint);

  it("Should verify that merchant4 is an instance of the Merchant class", () => {
    expect(merchant4).toBeInstanceOf(Merchant);
  });

  it("Should verify that merchant4 is an object", () => {
    expect(typeof merchant4).toBe("object");
  });

  it("Should verify that merchant4 has the expected properties", () => {
    expect(merchant4).toHaveProperty("id", 5);
    expect(merchant4).toHaveProperty("name", "Haren Brogg");
    expect(merchant4).toHaveProperty("type", Type.Coleccionista);
    expect(merchant4).toHaveProperty("ubication", Ubication.Toussaint);
  });
});