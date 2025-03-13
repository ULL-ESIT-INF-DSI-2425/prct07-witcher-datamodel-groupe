/**
 * Interface for identify an element
 */
export interface Identifiable {
  ID: number; 
  name: string; 
}

/**
 * Interface for an ubication
 */
export interface Ubicable {
  ubication: string; 
}

/**
 * Interface for a Goods extends Identifiable 
 */
export interface Goods extends Identifiable {
  description: string; 
  material: string
  weight: number 
  crowns: number
}

export interface Merchants extends Identifiable, Ubicable {
  type: string
}

/**
 * Interface 
 */
export interface Clients extends Identifiable, Ubicable {
  race: string 
}