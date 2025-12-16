import { useShip } from "../hooks/useShip";


export default function MissionResult() {
    
    const {mission} = useShip();
    
    if (mission.result === 'Cancelled') {
        return(
        <div className="mission-cancelled">
            <h2>Mission aborted</h2>
            <p>The ship doesn't have enough fuel to try this mission, so the system aborted it.</p>

        </div>
        );
    } else if (mission.result === 'Success') {
        return(
        <div className="mission-successed">
            <h2>Mission Success</h2>
            <p><b>General result: This mission went really good, better than I could have ever thought.</b></p>
            <p><b>Earned Credits: {mission.addedCredits}</b></p>
            <p><b>Wasted Fuel: {mission.wastedFuel}</b></p>
        </div>)
    } else if (mission.result === 'Failure') {
        return(
        <div className="mission-failed">
            <h2>Mission Failed</h2>
            <p><b>General result: This mission has been a disaster, as expected.</b></p>
            <p><b>Earned Credits: {mission.addedCredits}</b></p>
            <p><b>Wasted Fuel: {mission.wastedFuel}</b></p>
        </div>    
        )   
    }
}