import { auth } from '@/config/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

type UserContextType = {
    currentUser: User | null;
    setCurrentUser: any;
    isLoading: boolean;
    setIsLoading: any;
}

type UserProviderProps = {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);


const UserProvider = ({ children }: UserProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (initializing) setInitializing(false);
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = onAuthStateChanged(
            auth,
            authenticatedUser => {
                authenticatedUser ? setCurrentUser(authenticatedUser) : setCurrentUser(null);
                setIsLoading(false);
            }
        );
        // unsubscribe auth listener on unmount
        return unsubscribeAuth;
    }, [currentUser]);

    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            isLoading,
            setIsLoading
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

