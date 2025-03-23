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