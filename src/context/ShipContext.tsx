import { createContext, useEffect, useState } from "react";
import type { ICharacter, IShipContext } from "../types";
import { localStorageService } from '../services/localStorageService';

//Creo el contexto de la nave
export const ShipContext = createContext<IShipContext | undefined>(undefined);

export const ShipProvider = ({ children }: { children: React.ReactNode }) => {
    
    //creo los estados y los inicializo con los valores iniciales predeterminados
    const [credits, setCredits] = useState<number>(1000);
    const [fuel, setFuel] = useState<number>(100);
    const [crew, setCrew] = useState<ICharacter[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const data = localStorageService.getData();

        if(data){
            setCredits(data.credits);
            setFuel(data.fuel);
            setCrew(Array.isArray(data.crew) ? data.crew : []);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if(isLoaded){
            localStorageService.saveData(credits, fuel, crew);
        }
    }, [credits, fuel, crew]);

    //creo la funcion para asincrona para añadir un personaje a la tripulacion
    //Con sus respectivas validaciones de no superar 4 miembros y que no forme parte ya de la trupulacion
    function addCrewMember (ICharacter: ICharacter): boolean {
        if(crew.length>=4){
            return false;
        }

        if(crew.some(member => member.id == ICharacter.id)){
            return false;
        }

        setCrew(members => [...members, ICharacter]);
        return true;
    }

    // Creo la funcion asincrona para gastar creditos
    function spendCredits (amount:number): void {
        if(credits<amount){
            return;
        }

        setCredits(remain => remain-amount);
    }

    // Creo la funcion asincrona para añadir creditos
    function addCredits (amount:number) : void {
        setCredits(currentCredits => {
            const newCredits = currentCredits+amount;
            return newCredits;
        });
    }

    // Creo la funcion asincrona para reabastecer combustible
    function refuel (): void {
        setFuel(100);
        setCredits(currentCredits => {
            const newCredits = currentCredits-250;
            return newCredits < 0 ? 0 : newCredits;
        });
    }

    // Creo la funcion asincrona para reducir combustible
    function reduceFuel (amount:number): void {
        setFuel(currentFuel => {
            const remainFuel = currentFuel-amount;
            return remainFuel < 0 ? 0 : remainFuel;
        });
    }

    // Funcion para limpiar la tripulacion
    function clearCrew(): void {
        setCrew([]); 
    }


    return (    
        <ShipContext.Provider value={{
            credits,
            fuel,
            crew,
            addCrewMember,
            spendCredits,
            addCredits,
            refuel,
            reduceFuel,
            clearCrew
        }}>
            {children}
        </ShipContext.Provider>
    );
}