import { IClients } from "./interfaces.js"
import { Race } from './enums.js';
import { Ubication } from './enums.js';


/**
  * Class that represents a Client entity
 */
export class Client implements IClients {
  /**
   * Constructor of the class client that receives the following parameters
   * @param _id - Represents the id number of the client
   * @param _name - Represents the name of the client
   * @param _race - Represents the race of the clien 
   * @param _ubication - Represents the ubication of the client
   */
  constructor(
    private _id: number, 
    private _name: string, 
    private _race: Race,
    private _ubication: Ubication
  ) {}

  /**
   * Getter function that returns the id of the client
   * @returns the id of the client
   */
  get id(): number {
    return this._id;
  }

  /**
   * Getter function that returns the name of the client
   * @returns the name of the client
   */
  get name(): string {
    return this._name;
  }

  /**
   * Getter function that returns
   * @returns the race of the client
   */
  get race(): Race {
    return this._race;
  }

  /**
   * Getter function that returns the ubication of the client
   * @returns the ubication of the client
   */
  get ubication(): Ubication {
    return this._ubication;
  }

  /**
   * Setter function that sets the id of the client
   * @param value - Represents the id of
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Setter function that sets the name of the client
   * @param value - Represents the name of the client
   */
  set name(value: string) {
    this._name = value;
  }

  /**
   * Setter function that sets
   * @param race - Represents the new race of the client
   */
  set race(race: Race) {
    this._race = race; 
  }

  /**
   * Setter function that sets the ubication of the client
   * @param ubication - Represents the new ubication of the client
   */
  set ubication(ubication: Ubication) {
    this._ubication = ubication;
  }
}