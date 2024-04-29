

export function BetOutcome({ bet, game, updateOutcome })
{
    const team = bet.bet == 'home' ? game.home : game.away
    const status = getStatus()
    const selected = status == 'Won' ? 'selected' : ''
    updateOutcome(bet, status)

    function getStatus()
    {
        if (team.score == "")
            return "Live"

        const opponent = team.side == 'home' ? game.away : game.home
        if (team.score > opponent.score)
            return "Won"

        return "Lost"
    }

    function getIcon()
    {
        if (status == "Live")
            return '⌛'

        else if (status == "Won")
            return '🏆'

        else if (status == "Lost")
            return '❌'
    }

    return <div className="bet-outcome" data-team={team.credentials} data-status={selected}>
        <div className="bet-outcome-text-container">
            <img data-team={team.credentials} />
            <p className="bet-outcome-team">{team.name}:</p>
            <p className="bet-outcome-status">{status}</p>
        </div>
        <p className="bet-outcome-icon">
            {getIcon()}
        </p>
    </div>
}