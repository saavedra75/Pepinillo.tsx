import type { ICharacter } from '../types/index';

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
    }

}