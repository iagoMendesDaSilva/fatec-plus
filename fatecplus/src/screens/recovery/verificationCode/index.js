import styles from './style';
import { View } from 'react-native';
import React, { useState, useContext, createRef } from 'react';

import Strings from '~strings'
import { Storage } from '~services'
import { ModalContext } from '~contexts'
import { StorageRecovery } from '../storage'
import { TextDefault, ButtonDefault, InputCode, Screen } from '~components';

export const VerificationCode = ({ navigation }) => {

    const modal = useContext(ModalContext);
    const referencesCodes = Array(5).fill(null).map(ref => createRef(ref))

    const [loading, setLoading] = useState(false);
    const [activeResend, setActiveResend] = useState(true);
    const [valueCodes, setValueCodes] = useState({ codes: Array(5).fill("") });

    const getCompleteCode = () => Number(valueCodes.codes.join(""))

    const missingEmail = () => modal.set({ msg: Strings.MISSING_EMAIL, back: true })

    const goToChangePassword = data => {
        Storage.setUser({ token: data.token, id: data.id })
        navigation.navigate("ChangePassword", { recovery: true, edit: true })
    }

    const verifyVerificationCode = async () => {
        setLoading(true)
        const user = await Storage.getUser()
        user ?
            StorageRecovery.confirmCode(getCompleteCode(), user.id)
                .then(data => goToChangePassword(data))
                .catch(status => modal.set({ msg: Strings.ERROR_VERIFICATION_CODE, status }))
            :
            missingEmail()
        setLoading(false)
    }

    const resendEmail = async () => {
        const user = await Storage.getUser()
        if (user) {
            setActiveResend(false)
            StorageRecovery.confirmEmail(user.email)
                .catch(status => missingEmail())
        } else {
            missingEmail()
        }
    }

    const goNextInput = (value, index) => {
        let codes = valueCodes.codes;
        codes[index] = value;
        setValueCodes({ codes })
        if (index + 1 < referencesCodes.length && !valueCodes.codes[index + 1]) {
            referencesCodes[index + 1].current.focus()
        }
    }

    const goBackInput = (value, index) => {
        if (index - 1 >= 0 && value === "Backspace" && !valueCodes.codes[index]) {
            referencesCodes[index - 1].current.focus()
        }
    }

    const onFocus = index => {
        if (valueCodes.codes[index]) {
            let codes = valueCodes.codes;
            codes[index] = "";
            setValueCodes({ codes })
        }
    }

    return (
        <Screen>
            <TextDefault
                style={styles.logo}
                children={"Fatec +"}
                styleText={styles.txtLogo} />
            <TextDefault
                children={"Insira o código de acesso"}
                styleText={styles.txtInsertCode} />
            <View style={styles.containerInputsCodes}>
                {
                    referencesCodes.map((_, index) =>
                        <InputCode
                            key={String(index)}
                            ref={referencesCodes[index]}
                            text={valueCodes.codes[index]}
                            onFocus={() => onFocus(index)}
                            onchange={value => goNextInput(value, index)}
                            onKeyPress={value => goBackInput(value, index)} />
                    )
                }
            </View>
            <ButtonDefault
                text={"Próximo"}
                loading={loading}
                style={styles.button}
                onPress={verifyVerificationCode}
                active={Boolean(!valueCodes.codes.includes(""))} />
            <TextDefault
                active={activeResend}
                children={"Reenviar email"}
                styleText={styles.txtResendEmail}
                onPress={activeResend ? resendEmail : false} />
        </Screen>
    );
};
