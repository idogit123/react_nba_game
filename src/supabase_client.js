import { createClient } from '@supabase/supabase-js'

const projectURL = "https://jtzyogcnyiitoiejxkvc.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0enlvZ2NueWlpdG9pZWp4a3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NzQ4MzksImV4cCI6MjAyOTU1MDgzOX0.nRVVkdRWNhDj0A1Q3rLeHjlc2pQdqLLv79soyomvwYU"

// Create a single supabase client for interacting with your database
const supabase = createClient(projectURL, apiKey)

export async function Login(email, password)
{
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    return data
}

export async function SignUp(email, password, displayName)
{
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: { data: {displayName: displayName, points: 0} }
    })
    
    return data
}

export async function GetUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export async function UpsertBet(newBet) {
    const { data, error } = await supabase
        .from('Bets')
        .upsert(newBet)
        .select()

    return data
}

export async function DeleteBet(bet_id) {
    const { error } = await supabase
        .from('Bets')
        .delete()
        .eq('bet_id', bet_id)
}

export async function LoadBets(user) {
    const { data, error } = await supabase
        .from('Bets')
        .select()
        .eq('user_id', user.id)

    return data
}

export async function UpdatePoints(newPoints, bet)
{
    const { userData, userError } = await supabase.auth.updateUser({
        data: { points: newPoints }
    })

    const { betData, betError } = await supabase
        .from('Bets')
        .update({ calculated: true,  })
        .eq('bet_id', bet.bet_id)

    return userData
}