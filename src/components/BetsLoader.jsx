import { useEffect } from "react";
import { DeleteBet, LoadBets } from "../supabase_client";
import { FutureGames } from "./FutureGames";
import { useState, useMemo } from "react";
import { BetsOutcomes } from "./BetsOutcomes";
import { useUser } from "./UserProvider";

export function BetsLoader() 
{
    const [allBets, setAllBets] = useState([])
    const { futureBets, pastBets } = useMemo(() => handleBets(), [allBets])
    const user = useUser()

    useEffect(() => {
        async function waitForBetsLoaded() {
            setAllBets(await LoadBets(user))
        }
        waitForBetsLoaded()
    }, [])

    function handleBets() 
    {
        let [futureBets, pastBets] = [ [], [] ]
        const now = new Date()
        for (const bet of allBets)
        {
            const betTime = new Date(bet.game_start_time)
            const diffInHours = (now - betTime) / (1000 * 60 * 60) // milliseconds in an hour
            if (diffInHours < 0)
            {
                futureBets.push(bet)
            }
            else if (diffInHours < 24)
            {
                // game happend in the last 24 hours
                pastBets.push(bet)
            }
            else 
            {
                // bet too old, need to be deleted
                DeleteBet(bet.bet_id)
            }
        }

        return { futureBets: futureBets, pastBets: pastBets }
    }

    return <>
        <FutureGames initialBets={futureBets}/>
        <BetsOutcomes pastBets={pastBets}/>
    </>
}