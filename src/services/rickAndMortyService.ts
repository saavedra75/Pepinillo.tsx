import type { ICharacter, ICharacterResponse, ILocation, ILocationResponse } from "../types";

//Obtener todos los personajes de una página
export const getCharacters = async (): Promise<ICharacterResponse> => {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (!response.ok) {
        throw new Error("Error al obtener los personajes");
    }

    const data: ICharacterResponse = await response.json();
    return data;
};

//Obtener un personaje según su ID
export const getCharacterById = async (id: number): Promise <ICharacter> => {
    const response = await fetch("https://rickandmortyapi.com/api/character/" + id);

    if (!response.ok) {
        throw new Error("Error al obtener el personaje");
    }

    const data: ICharacter = await response.json();
    return data;
}

//Obtener todas las localizaciones de una página
export const getLocations = async (): Promise<ILocationResponse> => {
    const response = await fetch ("https://rickandmortyapi.com/api/location?type=Planet");

    if (!response.ok) {
        throw new Error("Error al obtener las localizaciones");
    }

    const data: ILocationResponse = await response.json();
    return data;
}

//Obtener una localización segun su ID
export const getLocationById = async (id: number): Promise<ILocation> =>  {
    const response = await fetch ("https://rickandmortyapi.com/api/location/" + id);

    if (!response.ok) {
        throw new Error("Error al obtener la localización");
    }

    const data: ILocation = await response.json();
    return data;
}

//Obtener la siguiente página de los personajes
export const getNextPageCharacters = async (): Promise<ICharacterResponse> => {
    const response = await fetch ("");

    if(!response.ok) {
        throw new Error("Error al obtener la siguiente página")
    }

    const data: ICharacterResponse = await response.json();
    return data;
}