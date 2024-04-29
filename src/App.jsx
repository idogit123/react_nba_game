import "./style.css"
import { TopBar } from "./components/TopBar.jsx"
import { UserProvider, useUser } from "./components/UserProvider.jsx"
import { MainSection } from "./components/MainSection.jsx"

function App() {
  return (
    <UserProvider>
      <TopBar/>
      <MainSection/>
    </UserProvider>
  )
}

export default App