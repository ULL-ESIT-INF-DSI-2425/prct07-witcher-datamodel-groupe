import { describe, it, expect, beforeEach } from "vitest";
import { ClientCollection } from "../src/clientCollection";
import { Client } from "../src/client";
import { Race, Ubication } from "../src/enums";

describe("ClientCollection Class test", () => {
  let clientCollection: ClientCollection;
  let client1: Client;
  let client2: Client;

  beforeEach(() => {
    clientCollection = new ClientCollection();
    client1 = new Client(1, "Geralt", Race.Brujo, Ubication.Nilfgaard);
    client2 = new Client(2, "Yennefer", Race.Elfo, Ubication.Novigrado);
    clientCollection.addEntity(client1);
  });

  it("Should return the length of the collection attribute", () => {
    expect(clientCollection.getCollectionLenght()).toBe(1);
  });
  
  it("Should add a client to the collection", () => {
    const result = clientCollection.addEntity(client2);

    expect(result).toBe(true);
    expect(clientCollection.collection).toContain(client2);
  });


  it("Should throw an error when adding a client that already exists", () => {
    expect(() => clientCollection.addEntity(client1)).toThrowError(
      "El cliente ya existe en la colección."
    );
  });

  it("Should remove a client from the collection", () => {
    const removedClient = clientCollection.dropEntity(client1);

    expect(removedClient).toStrictEqual(client1);
    expect(clientCollection.collection).not.toContain(client1);
  });

  it("Should throw an error when removing a client that does not exist", () => {
    const nonExistentClient = new Client(99, "NonExistent", Race.Humano, Ubication.Velen);

    expect(() => clientCollection.dropEntity(nonExistentClient)).toThrowError(
      "El cliente no existe en la colección."
    );
  });

  it("Should modify a client in the collection", () => {
    const modifiedClient = new Client(1, "Geralt of Rivia", Race.Brujo, Ubication.Velen);
    const result = clientCollection.modifyEntity(modifiedClient);

    expect(result).toBe(true);
    expect(clientCollection.collection[0].name).toBe("Geralt of Rivia");
    expect(clientCollection.collection[0].ubication).toBe(Ubication.Velen);
  });

  it("Should throw an error when modifying a client that does not exist", () => {
    const nonExistentClient = new Client(99, "NonExistent", Race.Humano, Ubication.Velen);

    expect(() => clientCollection.modifyEntity(nonExistentClient)).toThrowError(
      "El cliente no existe en la colección."
    );
  });

  it("Should retrieve clients by attribute", () => {
    clientCollection.addEntity(client2);

    const result = clientCollection.getClientsByAttribute("ubication", Ubication.Novigrado);

    expect(result).toContain("ID: 2, Name: Yennefer, Race: Elfo, Ubication: Novigrado");
    expect(result).not.toContain("ID: 1, Name: Geralt, Race: Brujo, Ubication: Nilfgaard");
  });

  it("Should throw an error when retrieving clients by an invalid attribute", () => {
    const invalidAttribute = "invalidAttribute" as keyof Client;

    const invalidValue = "value" as unknown as Client[keyof Client];

    expect(() => clientCollection.getClientsByAttribute(invalidAttribute, invalidValue)).toThrowError(
      `El atributo "${invalidAttribute}" no es válido.`
    );
  });

  it("Should return a message when no clients match the attribute", () => {
    const result = clientCollection.getClientsByAttribute("ubication", Ubication.Toussaint);

    expect(result).toBe("No se encontraron clientes con el atributo especificado.");
  });
});