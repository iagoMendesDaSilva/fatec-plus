import React, { createContext, useState } from 'react';

import { Error } from '../services';
import { ModalOneOption, ModalTwoOption } from '../helpers';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [info, setInfo] = useState({ visible: false });
    const [navigation, setNavigation] = useState(null);
    const [infoTwoOptions, setInfoOptions] = useState({ visible: false });

    const positivePress = (dualButtons = false) => {
        if (dualButtons) {
            infoTwoOptions.positivePress && infoTwoOptions.positivePress()
            setInfoOptions({ visible: false })
        } else {
            info.positivePress && info.positivePress()
            setInfo({ visible: false })
        }
    }

    const negativePress = () => {
        infoTwoOptions.negativePress && infoTwoOptions.negativePress()
        setInfoOptions({ visible: false })
    }

    const configErrorModal = ({status=404, options = false, msg = false, back=false, ...props}) => {
        const message = status === 404 && msg ? msg : Error.validate(status)
        status===401
        ? setInfo({ visible: true, message, positivePress:()=>Error.logout(navigation) })
        : options
            ? setInfoOptions({ visible: true, message, ...props })
            : setInfo({ visible: true, message, ...props })
    }

    return (
        <ModalContext.Provider value={{ info, setInfo, infoTwoOptions, setInfoOptions, configErrorModal, setNavigation}}>
            {children}
            <ModalOneOption
                visible={info.visible}
                message={info.message}
                positivePress={() => positivePress(false)} />
            <ModalTwoOption
                title={infoTwoOptions.title}
                negativePress={negativePress}
                visible={infoTwoOptions.visible}
                iconLib={infoTwoOptions.iconLib}
                message={infoTwoOptions.message}
                iconColor={infoTwoOptions.iconColor}
                positivePress={() => positivePress(true)}
                iconName={infoTwoOptions.iconName}
                negativeText={infoTwoOptions.negativeText} />
        </ModalContext.Provider>
    )

}