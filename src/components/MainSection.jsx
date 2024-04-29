import { SignInSection } from "./SignInSection.jsx"
import { BetsLoader } from "./BetsLoader.jsx"
import { useUser } from "./UserProvider.jsx"

export function MainSection()
{
    const user = useUser()

    function choosePage() {
      if (user != null)
      {
        return <BetsLoader/>
      }
        
      return <SignInSection/>
    }

    return choosePage()
}