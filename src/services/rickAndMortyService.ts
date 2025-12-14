import type { ICharacterResponse } from "../types";

const API_URL = "https://rickandmortyapi.com/api/character";

export const getCharacters = async (): Promise<ICharacterResponse> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Error al obtener los personajes");
    }

    const data: ICharacterResponse = await response.json();
    return data;
};
