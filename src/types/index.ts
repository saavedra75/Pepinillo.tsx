

export interface ICharacter {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    image:    string;
}


export interface ILocation {
    name: string;
    url:  string;
}

//Interfaz para el contexto de la nave
export interface IShipContext {
  credits: number;
  fuel: number;
  crew: ICharacter[];

  addCrewMember: (Character: ICharacter) => boolean;
  spendCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
  refuel: (amount: number) => void;
  reduceFuel: (amount: number) => void;
  clearCrew: () => void;
}

export interface ICharacterResponse {
  info: {
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}

export interface ILocationResponse {
  results: ILocation[];
}


export interface IMissionSum {
  result: string;
  wastedFuel: number;
  addedCredits: number;
}