import React, { createContext } from 'react';

type UserContextType = {
    user: any;
    setUser: any;
}

type UserProviderProps = {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = React.useState(null);
    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

