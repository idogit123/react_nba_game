export function TeamContainer({ team: {credentials, name, side, score}, selected, updateBet })
{
    const status = selected ? "selected" : ""

    function selectTeam()
    {
        updateBet(side)
    }

    return  (
    <div className="team-container" data-team={credentials} data-side={side} data-status={status} onClick={selectTeam}>
        <img data-team={credentials}></img>
        <div>
            <p className="team-name">{name}</p>
            <h2 className="team-score">{score}</h2>
        </div>
    </div>
    )
}


/*
team: {
    name: "DEN"
    side: "Home"
}
*/