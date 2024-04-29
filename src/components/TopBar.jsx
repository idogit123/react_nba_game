import { useUser } from "./UserProvider"

export function TopBar() 
{
    const user = useUser()

    function getUserPointsCounter() {
        if (user == null)
            return null

        return <div id="points-counter-container">
            <p id="points-counter">{user?.user_metadata.points}</p>
        </div>
    }

    return <section className="top-bar">
        <h1>NBA Game</h1>
        { getUserPointsCounter() }
    </section>
}