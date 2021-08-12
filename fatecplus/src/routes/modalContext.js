import React, { createContext, useState } from 'react';

import { Error } from '../services';
import { ModalOneOption, ModalTwoOption } from '../helpers';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [info, setInfo] = useState({ visible: false });
    const [navigation, setNavigation] = useState(null);

    const positivePress = () => {
        info.positivePress && info.positivePress()
        setInfo({ visible: false })
    }

    const negativePress = () => {
        info.negativePress && info.negativePress()
        setInfo({ visible: false })
    }

    const set = ({ status, options = false, msg = false, back = false, ...props }) => {
        const message = msg && status === 404 || options ? msg : Error.validate(status)
        if (status === 401)
            setInfo({ visible: true, options: false, message: Error.validate(401), positivePress: () => Error.logout(navigation) })
        else
            back
                ? setInfo({ visible: true, options, message, positivePress: () => navigation.goBack(), ...props })
                : setInfo({ visible: true, options, message, ...props })
    }

    return (
        <ModalContext.Provider value={{ set, setNavigation }}>
            {children}
            <ModalOneOption
                message={info.message}
                positivePress={positivePress}
                visible={info.visible && !info.options} />
            <ModalTwoOption
                title={info.title}
                iconLib={info.iconLib}
                message={info.message}
                iconColor={info.iconColor}
                iconName={info.iconName}
                positivePress={positivePress}
                negativePress={negativePress}
                negativeText={info.negativeText}
                visible={info.visible && info.options} />
        </ModalContext.Provider>
    )

}
