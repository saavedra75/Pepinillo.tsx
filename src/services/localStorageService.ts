import type { ICharacter, IMissionSum } from '../types/index';

export const localStorageService = {

    getData : () => {
        const data = localStorage.getItem('shipData');
        if(!data){
            return;
        }
        return JSON.parse(data);
    },

    saveData : (credits: number, fuel: number, crew: ICharacter[]) => {
        const data = {
            credits,
            fuel,
            crew
        }
        localStorage.setItem('shipData', JSON.stringify(data));
    },

    clearCrew: () => {
        const data = localStorage.getItem('shipData');
        if (!data) return;

        const parsed = JSON.parse(data);
        parsed.crew = [];

        localStorage.setItem('shipData', JSON.stringify(parsed));
    },

    saveMission: (mission: IMissionSum) => {
        localStorage.setItem("mission", JSON.stringify(mission));
    },

    getMission: () => {
        const data = localStorage.getItem("mission");
        return data ? JSON.parse(data) : null;
    }

}