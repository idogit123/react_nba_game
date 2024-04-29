import { useEffect, useState } from "react"
import { FutureGameContainer } from "./FutureGameContainer"
import { LoadBets } from "../supabase_client"

export function FutureGames({ initialBets }) {
    const [games, setGames] = useState([])
    const [bets, setBets] = useState([])

    async function getFutureGames() {
        const query = `https://nba-python-api.onrender.com/future_games`
        const response = await fetch(query)
        return JSON.parse(await response.text())
    }

    useEffect(() => {
        async function waitForNewGames() {
            const newGames = await getFutureGames()
            setGames(newGames)
        } 
        waitForNewGames()
    }, [])

    useEffect(() => {
        setBets(initialBets)
    }, [initialBets])
    
    function getGameBet(game) {
        if (bets == null)
            return null

        for (const bet of bets) {
            if (bet.game_id == game.id) 
            {
                return bet.bet
            }
        }

        return null
    }

    return <section id="future-games">
        <h2>Future Games</h2>
        {games.length > 0 || <p>No games soon...</p>}
        {games.map(
            (game) => {
                const gameBet = getGameBet(game)
                return <FutureGameContainer 
                    game={game} 
                    initialBet={gameBet} 
                    key={game.id} 
                />
            }
        )}
    </section>
}