// import { describe, it, expect } from "vitest";
// import { Client } from "../src/client";
// import { Race, Ubication } from "../src/enums";

// describe("Client Class test", () => {
//   let client: Client;
//   client = new Client(1, "Geralt", Race.Brujo, Ubication.Nilfgaard);
  
//   it("Should create a client with the correct values of the atributes", () => {
//     expect(client.id).toBe(1);
//     expect(client.name).toBe("Geralt");
//     expect(client.race).toBe(Race.Brujo);
//     expect(client.ubication).toBe(Ubication.Nilfgaard);
//   });

//   it("Should update client atributes using the setters we defined in the class", () => {
//     client.id = 2;
//     client.name = "Yennefer";
//     client.race = Race.Elfo;
//     client.ubication = Ubication.Novigrado;

//     expect(client.id).toBe(2);
//     expect(client.name).toBe("Yennefer");
//     expect(client.race).toBe(Race.Elfo);
//     expect(client.ubication).toBe(Ubication.Novigrado);
//   });

//   it("Should return the length of the collection attribute", () => {
//     expect(client.getCollectionLenght()).toBe(0);
//   });

//   it("Should add a client to the collection atribute in the super class", () => {
//     const newClient = new Client(2, "Triss", Race.Humano, Ubication.Oxenfurt);
//     const result = client.addEntity(newClient);

//     expect(result).toBe(true);
//     expect(client.collection).toContain(newClient);
//   });

//   it("Should return the length of the collection attribute", () => {
//     expect(client.getCollectionLenght()).toBe(1);
//   });

//   it("Should remove a client from the collection in the super class", () => {
//     const newClient = new Client(2, "Triss", Race.Humano, Ubication.Oxenfurt);
//     const removedClient = client.dropEntity(newClient);
  
//     expect(removedClient).toStrictEqual(newClient); 
//     expect(client.collection).not.toContain(newClient);
//   });

//   it("Should modify the client atributes in the collection", () => {
//     const newClient = new Client(2, "Triss", Race.Humano, Ubication.Oxenfurt);
//     client.addEntity(newClient);

//     const modifiedClient = new Client(2, "Triss Merigold", Race.Humano, Ubication.Novigrado);
//     const result = client.modifyEntity(modifiedClient);

//     expect(result).toBe(true);
//     expect(client.collection[0].name).toBe("Triss Merigold");
//     expect(client.collection[0].ubication).toBe(Ubication.Novigrado);
//   });

//   it("Should retrieve clients by attribute", () => {
//     const client2 = new Client(3, "Dandelion", Race.Humano, Ubication.Novigrado);
//     client.addEntity(client2);

//     const result = client.getClientsByAttribute("ubication", Ubication.Novigrado);

//     expect(result).toContain("ID: 3, Name: Dandelion, Race: Humano, Ubication: Novigrado");
//     expect(result).not.toContain("ID: 2, Name: Triss, Race: Humano, Ubication: Oxenfurt");
//   });

//   it("Should throw an error when adding a client that already exists", () => {
//     const newClient = new Client(2, "Triss", Race.Humano, Ubication.Oxenfurt);

//     expect(() => client.addEntity(newClient)).toThrowError(
//       `El cliente ya existe en la colección.`
//     );
//   });

//   it("Should throw an error when removing a client that does not exist", () => {
//     const nonExistentClient = new Client(99, "NonExistent", Race.Humano, Ubication.Novigrado);

//     expect(() => client.dropEntity(nonExistentClient)).toThrowError(
//       `El cliente no existe en la colección.`
//     );
//   });

//   it("Should throw an error when retrieving clients by an invalid attribute", () => {
//       const invalidAttribute = "invalidAttribute" as keyof Client;

//       const invalidValue = "value" as unknown as Client[keyof Client];

//       expect(() => client.getClientsByAttribute(invalidAttribute, invalidValue)).toThrowError(
//         `El atributo "${invalidAttribute}" no es válido.`
//       );
//   });

//   it("Should throw an error when modifying a client that does not exist", () => {
//     const nonExistentClient = new Client(99, "NonExistent", Race.Humano, Ubication.Novigrado);

//     expect(() => client.modifyEntity(nonExistentClient)).toThrowError(
//       `El cliente no existe en la colección.`
//     );
//   });

//   it("Should return a message when no clients match the attribute", () => {
//     const result = client.getClientsByAttribute("ubication", Ubication.Toussaint);

//     expect(result).toBe("No se encontraron clientes con el atributo especificado.");
//   });
// });

import { describe, it, expect } from "vitest";
import { Client } from "../src/client";
import { Race, Ubication } from "../src/enums";

describe("Client Class test", () => {
  let client: Client;

  client = new Client(1, "Geralt", Race.Brujo, Ubication.Nilfgaard);

  it("Should create a client with the correct values of the attributes", () => {
    expect(client.id).toBe(1);
    expect(client.name).toBe("Geralt");
    expect(client.race).toBe(Race.Brujo);
    expect(client.ubication).toBe(Ubication.Nilfgaard);
  });

  it("Should update client attributes using the setters", () => {
    client.id = 2;
    client.name = "Yennefer";
    client.race = Race.Elfo;
    client.ubication = Ubication.Novigrado;

    expect(client.id).toBe(2);
    expect(client.name).toBe("Yennefer");
    expect(client.race).toBe(Race.Elfo);
    expect(client.ubication).toBe(Ubication.Novigrado);
  });
});

describe("Client Class Object Test", () => {
  let client4: Client;
  client4 = new Client(5, "Renfri", Race.Humano, Ubication.Velen);
  
  it("Should verify that client4 is an instance of the Client class", () => {
    expect(client4).toBeInstanceOf(Client);
  });

  it("Should verify that client4 is an object", () => {
    expect(typeof client4).toBe("object");
  });

  it("Should verify that client4 has the expected properties", () => {
    expect(client4).toHaveProperty("id", 5);
    expect(client4).toHaveProperty("name", "Renfri");
    expect(client4).toHaveProperty("race", Race.Humano);
    expect(client4).toHaveProperty("ubication", Ubication.Velen);
  });
});