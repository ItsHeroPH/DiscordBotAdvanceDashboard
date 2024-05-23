import { PropsWithChildren, createContext, useContext } from "react";
import { Bot } from "../../utils/discord/Bot";

const BotContext = createContext<Bot | undefined>(undefined)

export function getBot() {
    const user = useContext(BotContext)
    if(user === undefined) throw new Error("To able to use getBot() function must be the element is inside the BotProvider element")
    
    return user
}
interface BotProviderProps extends PropsWithChildren {
    value: Bot
}

const BotProvider = ({ children, value }: BotProviderProps) => {
    return (
        <BotContext.Provider value={value}>
            {children}
        </BotContext.Provider>
    )
}
export default BotProvider