import type { ICharacter } from '../types/index';

export const localStorageService = {

    getData : () => {
        const data = localStorage.getItem('shipData');
        if(!data){
            return;
        }
        return JSON.parse(data);
    },

    saveData : (credits: number, fuel: number, crewList: ICharacter[]) => {
        const data = {
            credits,
            fuel,
            crewList
        }
        localStorage.setItem('shipData', JSON.stringify(data));
    }

}