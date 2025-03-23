// import { describe, it, expect } from "vitest";
// import { Merchant } from "../src/merchant";
// import { Type, Ubication } from "../src/enums";

// describe("Merchant Class test", () => {
//   let merchant: Merchant;
//   merchant = new Merchant(1, "Jardinero", Type.Mercader_g, Ubication.Skellige);

//   it("Should create a merchant with the correct values of the attributes", () => {
//     expect(merchant.id).toBe(1);
//     expect(merchant.name).toBe("Jardinero");
//     expect(merchant.type).toBe(Type.Mercader_g);
//     expect(merchant.ubication).toBe(Ubication.Skellige);
//   });

//   it("Should update merchant attributes using the setters we defined in the class", () => {
//     merchant.id = 2;
//     merchant.name = "Ermitaño";
//     merchant.type = Type.Sastre
//     merchant.ubication = Ubication.Velen;

//     expect(merchant.id).toBe(2);
//     expect(merchant.name).toBe("Ermitaño");
//     expect(merchant.type).toBe(Type.Sastre);
//     expect(merchant.ubication).toBe(Ubication.Velen);
//   });

//   it("Should return the length of the collection attribute", () => {
//     expect(merchant.getCollectionLenght()).toBe(0);
//   });

//   it("Should add a merchant to the collection attribute in the super class", () => {
//     const newMerchant = new Merchant(3, "Abigail", Type.Alquimista, Ubication.Oxenfurt);
//     const result = merchant.addEntity(newMerchant);

//     expect(result).toBe(true);
//     expect(merchant.collection).toContain(newMerchant);
//   });

//   it("Should return the length of the collection attribute", () => {
//     expect(merchant.getCollectionLenght()).toBe(1);
//   });

//   it("Should remove a merchant from the collection in the super class", () => {
//     const newMerchant = new Merchant(3, "Abigail", Type.Alquimista, Ubication.Oxenfurt);

//     const removedMerchant = merchant.dropEntity(newMerchant);

//     expect(removedMerchant).toStrictEqual(newMerchant);
//     expect(merchant.collection).not.toContain(newMerchant);
//   });

//   it("Should modify the merchant attributes in the collection", () => {
//     const newMerchant = new Merchant(3, "Abigail", Type.Alquimista, Ubication.Oxenfurt);
//     merchant.addEntity(newMerchant);

//     const modifiedMerchant = new Merchant(3, "Kalstein", Type.Alquimista, Ubication.Novigrado);
//     const result = merchant.modifyEntity(modifiedMerchant);

//     expect(result).toBe(true);
//     expect(merchant.collection[0].name).toBe("Kalstein");
//     expect(merchant.collection[0].type).toBe(Type.Alquimista);
//     expect(merchant.collection[0].ubication).toBe(Ubication.Novigrado);
//   });

//   it("Should retrieve merchants by attribute", () => {
//     const merchant2 = new Merchant(4, "Kalkstein", Type.Alquimista, Ubication.Novigrado);
//     merchant.addEntity(merchant2);

//     const result = merchant.getMerchantsByAttribute("ubication", Ubication.Novigrado);

//     expect(result).toContain("ID: 4, Name: Kalkstein, Type: Alquimista, Ubication: Novigrado");
//   });

//   it("Should throw an error when adding a merchant that already exists", () => {
//     const merchant2 = new Merchant(4, "Kalkstein", Type.Alquimista, Ubication.Novigrado);

//     expect(() => merchant.addEntity(merchant2)).toThrowError(
//       `El comerciante ya existe en la colección.`
//     );
//   });

//   it("Should throw an error when removing a merchant that does not exist", () => {
//     const nonExistentMerchant = new Merchant(99, "NonExistent", Type.Cartografo, Ubication.Skellige);

//     expect(() => merchant.dropEntity(nonExistentMerchant)).toThrowError(
//       `El comerciante no existe en la colección.`
//     );
//   });

//   it("Should throw an error when retrieving merchants by an invalid attribute", () => {
//     const invalidAttribute = "invalidAttribute" as keyof Merchant;

//     const invalidValue = "value" as unknown as Merchant[keyof Merchant];

//     expect(() => merchant.getMerchantsByAttribute(invalidAttribute, invalidValue)).toThrowError(
//       `El atributo "${invalidAttribute}" no es válido.`
//     );
//   });

//   it("Should throw an error when modifying a merchant that does not exist", () => {
//     const nonExistentMerchant = new Merchant(99, "NonExistent", Type.Cartografo, Ubication.Skellige);

//     expect(() => merchant.modifyEntity(nonExistentMerchant)).toThrowError(
//       `El comerciante no existe en la colección.`
//     );
//   });

//   it("Should return a message when no merchants match the attribute", () => {
//     const result = merchant.getMerchantsByAttribute("ubication", Ubication.Redania);

//     expect(result).toBe("No se encontraron comerciantes con el atributo especificado.");
//   });
// });

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