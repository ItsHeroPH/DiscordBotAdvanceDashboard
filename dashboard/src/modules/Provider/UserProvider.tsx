import { PropsWithChildren, createContext, useContext } from "react"
import { User } from "../../utils/discord/User"

const UserContext = createContext<User | null | undefined>(undefined)

export function getUser() {
    const user = useContext(UserContext)
    if(user === undefined) throw new Error("To able to use getUser() function must be the element is inside the UserProvider element")
    
    return user
}

interface UserProviderProps extends PropsWithChildren {
    value: User | null
}

const UserProvider = ({ children, value }: UserProviderProps) => {
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider