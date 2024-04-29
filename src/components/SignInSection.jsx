import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { SignUpForm } from "./SignUpForm"

export function SignInSection() {

    const [isNewUser, setIsNewUser] = useState(false)

    function logInOrSignUp()
    {
        if (isNewUser)
            return <SignUpForm setIsNewUser={setIsNewUser} />
        
        return <LoginForm setIsNewUser={setIsNewUser} />
    }

    return logInOrSignUp()
}