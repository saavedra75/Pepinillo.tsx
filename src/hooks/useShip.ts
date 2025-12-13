import { useContext } from "react";
import { ShipContext } from "../context/ShipContext";

export function useShip() {
    const context = useContext(ShipContext);

    if (!context) {
        throw new Error("useShip se debe utilizar dentro de un ShipProvider");
    }

    return context;
}