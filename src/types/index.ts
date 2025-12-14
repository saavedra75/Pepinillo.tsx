

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

  addCrewMember: (Character: ICharacter) => void;
  spendCredits: (amount: number) => void;
  refuel: (amount: number) => void;
  reduceFuel: (amount: number) => void;
}