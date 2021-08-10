import React, { createContext, useState } from 'react';

import { Token } from '../services/request';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [info, setInfo] = useState(false);

    const setUser = (username = "", password = "", email = "", token = "", id = 0, category = "") => {
        setInfo({ username, password, email, token, id, category })
        Token.setToken(token);
    }

    return (
        <UserContext.Provider value={{ info, setUser }}>
            {children}
        </UserContext.Provider>
    )

}
