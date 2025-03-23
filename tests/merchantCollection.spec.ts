import { describe, it, expect, beforeEach } from "vitest";
import { MerchantCollection } from "../src/merchantCollection";
import { Merchant } from "../src/merchant";
import { Type, Ubication } from "../src/enums";

describe("MerchantCollection Class test", () => {
  let merchantCollection: MerchantCollection;
  let merchant1: Merchant;
  let merchant2: Merchant;

  beforeEach(() => {
    merchantCollection = new MerchantCollection();
    merchant1 = new Merchant(1, "Jardinero", Type.Mercader_g, Ubication.Skellige);
    merchant2 = new Merchant(2, "Ermitaño", Type.Sastre, Ubication.Velen);
    merchantCollection.addEntity(merchant1);
  });

  it("Should add a merchant to the collection", () => {
    const result = merchantCollection.addEntity(merchant2);

    expect(result).toBe(true);
    expect(merchantCollection.collection).toContain(merchant2);
  });

  it("Should throw an error when adding a merchant that already exists", () => {
    expect(() => merchantCollection.addEntity(merchant1)).toThrowError(
      "El comerciante ya existe en la colección."
    );
  });

  it("Should remove a merchant from the collection", () => {
    const removedMerchant = merchantCollection.dropEntity(merchant1);

    expect(removedMerchant).toStrictEqual(merchant1);
    expect(merchantCollection.collection).not.toContain(merchant1);
  });

  it("Should throw an error when removing a merchant that does not exist", () => {
    const nonExistentMerchant = new Merchant(99, "NonExistent", Type.Cartografo, Ubication.Skellige);

    expect(() => merchantCollection.dropEntity(nonExistentMerchant)).toThrowError(
      "El comerciante no existe en la colección."
    );
  });

  it("Should modify a merchant in the collection", () => {
    const modifiedMerchant = new Merchant(1, "Kalstein", Type.Alquimista, Ubication.Novigrado);
    const result = merchantCollection.modifyEntity(modifiedMerchant);

    expect(result).toBe(true);
    expect(merchantCollection.collection[0].name).toBe("Kalstein");
    expect(merchantCollection.collection[0].type).toBe(Type.Alquimista);
    expect(merchantCollection.collection[0].ubication).toBe(Ubication.Novigrado);
  });

  it("Should throw an error when modifying a merchant that does not exist", () => {
    const nonExistentMerchant = new Merchant(99, "NonExistent", Type.Cartografo, Ubication.Skellige);

    expect(() => merchantCollection.modifyEntity(nonExistentMerchant)).toThrowError(
      "El comerciante no existe en la colección."
    );
  });

  it("Should retrieve merchants by attribute", () => {
    merchantCollection.addEntity(merchant2);

    const result = merchantCollection.getMerchantsByAttribute("ubication", Ubication.Velen);

    expect(result).toContain("ID: 2, Name: Ermitaño, Type: Sastre, Ubication: Velen");
    expect(result).not.toContain("ID: 1, Name: Jardinero, Type: Mercader_g, Ubication: Skellige");
  });

  it("Should throw an error when retrieving clients by an invalid attribute", () => {
    const invalidAttribute = "invalidAttribute" as keyof Merchant;

    const invalidValue = "value" as unknown as Merchant[keyof Merchant];

    expect(() => merchantCollection.getMerchantsByAttribute(invalidAttribute, invalidValue)).toThrowError(
      `El atributo "${invalidAttribute}" no es válido.`
    );
  });

  it("Should return a message when no merchants match the attribute", () => {
    const result = merchantCollection.getMerchantsByAttribute("ubication", Ubication.Redania);

    expect(result).toBe("No se encontraron comerciantes con el atributo especificado.");
  });
});