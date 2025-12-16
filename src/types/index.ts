

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
  refuel: (amount: number) => void;
  reduceFuel: (amount: number) => void;
<<<<<<< HEAD
  clearCrew: () => void;
=======
}

export interface ICharacterResponse {
  results: ICharacter[];
}

export interface ILocationResponse {
  results: ILocation[];
>>>>>>> Manuel
}