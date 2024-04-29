import { useEffect, useState } from "react"
import { TeamContainer } from "./TeamContainer"
import { DeleteBet, UpsertBet } from "../supabase_client"
import { useUser } from "./UserProvider.jsx"

export function FutureGameContainer({ game, initialBet })
{
    const [ bet, setBet ] = useState(null)
    const selectedTeam = bet != null ? (bet == 'home' ? game.home.credentials : game.away.credentials) : null
    const user = useUser()

    useEffect(() => {
        setBet(initialBet)
    }, [initialBet])

    function updateBet(newBet) {
        setBet((currentBet) => {
            if (currentBet == newBet)
            {
                // if same bet: delete bet from database & return null
                DeleteBet( user.id + "-" + game.id )
                return null
            }
            // if new bet: store in database & return new bet
            requestStoreBet(newBet)
            return newBet
        })
    }

    async function requestStoreBet(newBet)
    {
        // 1. construct bet object
        const bet_object = {
            user_id: user.id,
            game_start_time: game.start_time,
            bet: newBet,
            game_id: game.id,
            bet_id: user.id + "-" + game.id
        }

        // 2. upsert this game object
        await UpsertBet(bet_object)
    }

    return <div className={"game-container"} data-bet={bet} data-team={selectedTeam}>
        <TeamContainer team={game.home} selected={game.home.side == bet} setBet={setBet} updateBet={updateBet} />
        <TeamContainer team={game.away} selected={game.away.side == bet} setBet={setBet} updateBet={updateBet} />
    </div>
}