import { createContext, useState } from "react";
import type { ICharacter, IShipContext } from "../types";

//Creo el contexto de la nave
export const ShipContext = createContext<IShipContext | undefined>(undefined);

export const ShipProvider = ({ children }: { children: React.ReactNode }) => {
    
    //creo los estados y los inicializo con los valores iniciales predeterminados
    const [credits, setCredits] = useState<number>(1000);
    const [fuel, setFuel] = useState<number>(100);
    const [crew, setCrew] = useState<ICharacter[]>([]);

    //creo la funcion para asincrona para añadir un personaje a la tripulacion
    //Con sus respectivas validaciones de no superar 4 miembros y que no forme parte ya de la trupulacion
    function addCrewMember (ICharacter: ICharacter): void {
        if(crew.length>=4){
            return;
        }

        if(crew.some(member => member.id == ICharacter.id)){
            return;
        }

        setCrew(members => [...members, ICharacter]);
    }

    // Creo la funcion asincrona para gastar creditos
    function spendCredits (amount:number): void {
        if(credits<amount){
            return;
        }

        setCredits(remain => remain-amount);
    }

    // Creo la funcion asincrona para reabastecer combustible
    function refuel (amount:number): void {
        setFuel(currentFuel => {
            const newFuel = currentFuel+amount;
            return newFuel > 100 ? 100 : newFuel;
        });
    }

    // Creo la funcion asincrona para reducir combustible
    function reduceFuel (amount:number): void {
        setFuel(currentFuel => {
            const remainFuel = currentFuel-amount;
            return remainFuel < 0 ? 0 : remainFuel;
        });
    }


    return (    
        <ShipContext.Provider value={{
            credits,
            fuel,
            crew,
            addCrewMember,
            spendCredits,
            refuel,
            reduceFuel
        }}>
            {children}
        </ShipContext.Provider>
    );
}