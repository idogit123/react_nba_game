import { useEffect, useState } from "react";
import { BetOutcome } from "./BetOutcome";
import { UpdatePoints } from "../supabase_client";
import { useUser, useSetUser } from "./UserProvider";

export function BetsOutcomes({ pastBets }) 
{
    const [games, setGames] = useState([])
    const [bets, setBets] = useState([])
    const user = useUser()
    const setUser = useSetUser()

    function requestUpdatePoints(bet, status)
    {
        if (user == null || status == "Live")
            return

        if (bet.calculated == false)
        {
            if (status == 'Won')
                setUser(
                    UpdatePoints(user.user_metadata.points + 1, bet)
                )
            else if (status == 'Lost')
                setUser(
                    UpdatePoints(user.user_metadata.points - 1, bet)
                )
        }
    }

    useEffect(() => {
        async function waitForNewGames() {
            const newGames = await getPastGames()
            setGames(newGames)
        } 
        waitForNewGames()
    }, [])

    useEffect(() => {
        setBets(pastBets)
    }, [pastBets])

    async function getPastGames() {
        const query = `http://127.0.0.1:8000/past_games`
        const response = await fetch(query)
        return JSON.parse(await response.text())
    }

    function getGame(bet) {
        for (let i = 0; i < games.length; i++) {
            if (games[i].id == bet.game_id)
                return games[i]
        }

        return null
    }

    return <section id="bets-outcomes">
        <h2>Bets outcomes</h2>
        {bets.length > 0 || <p>You don't have bets.</p>}
        {bets.map(
            (bet) => {
                const game = getGame(bet)

                if (game == null)
                    return null

                return <BetOutcome
                    game={game}
                    bet={bet} 
                    updateOutcome={requestUpdatePoints}
                    key={bet.game_id} 
                />
            }
        )}
    </section>
}