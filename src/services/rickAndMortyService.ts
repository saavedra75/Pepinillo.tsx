import type { ICharacter, ICharacterResponse, ILocation, ILocationResponse } from "../types";

// Obtener todos los personajes de la primera página
export const getCharacters = async (): Promise<ICharacterResponse> => {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (!response.ok) {
        throw new Error("Error al obtener los personajes");
    }

    const data: ICharacterResponse = await response.json();
    return data;
};

// Obtener un personaje por ID
export const getCharacterById = async (id: number): Promise<ICharacter> => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el personaje");
    }

    const data: ICharacter = await response.json();
    return data;
};

// Obtener localizaciones tipo planeta
export const getLocations = async (): Promise<ILocationResponse> => {
    const response = await fetch("https://rickandmortyapi.com/api/location?type=Planet");

    if (!response.ok) {
        throw new Error("Error al obtener las localizaciones");
    }

    const data: ILocationResponse = await response.json();
    return data;
};

// Obtener localización por ID
export const getLocationById = async (id: number): Promise<ILocation> => {
    const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la localización");
    }

    const data: ILocation = await response.json();
    return data;
};

// Obtener página siguiente de personajes
export const getNextPageCharacters = async (nextUrl: string): Promise<ICharacterResponse> => {
    const response = await fetch(nextUrl);

    if (!response.ok) {
        throw new Error("Error al obtener la siguiente página de personajes");
    }

    const data: ICharacterResponse = await response.json();
    return data;
};

// Obtener página anterior de personajes
export const getPrevPageCharacters = async (prevUrl: string): Promise<ICharacterResponse> => {
    const response = await fetch(prevUrl);

    if (!response.ok) {
        throw new Error("Error al obtener la página anterior de personajes");
    }

    const data: ICharacterResponse = await response.json();
    return data;
};

// Obtener página siguiente de localizaciones tipo planeta
export const getNextPageLocations = async (nextUrl: string): Promise<ILocationResponse> => {
    const response = await fetch(nextUrl);

    if (!response.ok) {
        throw new Error("Error al obtener la siguiente página de localizaciones");
    }

    const data: ILocationResponse = await response.json();
    return data;
};

// Obtener página anterior de localizaciones tipo planeta
export const getPrevPageLocations = async (prevUrl: string): Promise<ILocationResponse> => {
    const response = await fetch(prevUrl);

    if (!response.ok) {
        throw new Error("Error al obtener la página anterior de localizaciones");
    }

    const data: ILocationResponse = await response.json();
    return data;
};
