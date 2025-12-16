import type { IMissionSum } from "../types"

export default function MissionResult() {

    return (
        <div>
            <h2>Mission summarise:</h2>
            <p><b>General result: {}</b></p>
            <p><b>Earned Credits: {}</b></p>
            <p><b>Wasted Fuel: {}</b></p>
        </div>
    )
}