import { SignUp } from "../supabase_client"
import { useSetUser } from "./UserProvider"

export function SignUpForm({ setIsNewUser })
{
    const setUser = useSetUser()

    async function requestSignUp()
    {
        const email = document.getElementById('signup-email').value
        const password = document.getElementById('signup-password').value
        const displayName = document.getElementById('signup-name').value
        if (displayName == null || displayName.length < 4) 
            return null
        const { user } = await SignUp(email, password, displayName)
        setUser(user)
    }

    function switchToLogin() {
        setIsNewUser(false)
    }

    return <section id="signup-section" className="signin-section">
        <h2>Welcome to NBA Game 🤗</h2> 
        <label>
            <p>Please sign up.</p>
            <p id="old-user-button" className="link-text" onClick={switchToLogin}>Already signed in.</p>
        </label>
        <input type="text" placeholder="Eamil" id="signup-email" />
        <input type="text" placeholder="Password" id="signup-password" />
        <input type="text" placeholder="Name" id="signup-name" />
        <button id="signup-button" className="signin-button" onClick={requestSignUp}>Sign Up</button>
    </section>
}