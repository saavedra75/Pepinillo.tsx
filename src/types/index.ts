

export interface ICharacter {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    image:    string;
}


export interface ILocation {
    id: number;
    name: string;
    url:  string;
}

//Interfaz para el contexto de la nave
export interface IShipContext {
  credits: number;
  fuel: number;
  crew: ICharacter[];
  mission: IMissionSum;

  addCrewMember: (Character: ICharacter) => boolean;
  spendCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
  refuel: () => void;
  reduceFuel: (amount: number) => void;
  clearMember: (id:number) => void;
  saveMission: (newMission: IMissionSum) => void;
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
  crewMember: ICharacter | null;
  location: ILocation | null;
}