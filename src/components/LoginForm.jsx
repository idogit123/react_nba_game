import { Login } from "../supabase_client";
import { useSetUser } from "./UserProvider";

export function LoginForm({ setIsNewUser })
{
    const setUser = useSetUser()

    async function requestLogin()
    {
        const email = document.getElementById('login-email').value
        const password = document.getElementById('login-password').value
        const { user } = await Login(email, password)
        setUser(user)
    }

    function switchToSignUp()
    {
        setIsNewUser(true)
    }

    return <section id="login-section" className="signin-section">
        <h2>Welcome back 🤗</h2> 
        <label>
            <p>Please login.</p>
            <p id="new-user-button" className="link-text" onClick={switchToSignUp}>New user.</p>
        </label>
        <input type="text" placeholder="Eamil" id="login-email" />
        <input type="text" placeholder="Password" id="login-password" />
        <button id="login-button" className="signin-button" onClick={requestLogin}>Login</button>
    </section>
}