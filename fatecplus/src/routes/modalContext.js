import React, { createContext, useState } from 'react';

import { ModalOneOption, ModalTwoOption } from '../helpers';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [info, setInfo] = useState({ visible: false });
    const [infoTwoOptions, setInfoTwoOptions] = useState({ visible: false });

    const positivePress = (dualButtons = false) => {
        if (dualButtons) {
            infoTwoOptions.positivePress && infoTwoOptions.positivePress()
            setInfoTwoOptions({ visible: false })
        } else {
            info.positivePress && info.positivePress()
            setInfo({ visible: false })
        }
    }

    const negativePress = () => {
        infoTwoOptions.negativePress && infoTwoOptions.negativePress()
        setInfoTwoOptions({ visible: false })
    }

    return (
        <ModalContext.Provider value={{ info, setInfo, infoTwoOptions, setInfoTwoOptions }}>
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