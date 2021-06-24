import styles from './style';
import { View, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';

import { Storage } from '../../services';
import Strings from '../../constants/strings';
import { StorageRecovery } from '../recovery/storage'
import { StorageVerificationCode } from './storage.js';
import { ModalContext } from '../../routes/modalContext';
import { TextDefault, ButtonDefault, InputCode } from '../../helpers';

export const VerificationCode = (props) => {

    const modal = useContext(ModalContext);
    const referencesCodes = Array(5).fill(null).map(ref => React.createRef(ref))

    const [loading, setLoading] = useState(false);
    const [activeResend, setActiveResend] = useState(true);
    const [valueCodes, setValueCodes] = useState({ codes: Array(5).fill("") });

    const comeBack = () => props.navigation.goBack()

    const getCompleteCode = () => Number(valueCodes.codes.join(""))

    const missingEmail = () => modal.configErrorModal({ msg: Strings.misssingEmail, positivePress: comeBack })

    const verifyVerificationCode = async () => {
        setLoading(true)
        const user = await Storage.getUser()
        user ?
            StorageVerificationCode.confirmCode(getCompleteCode(), user.id)
                .then(data => console.log(1))
                .catch(status => modal.configErrorModal({ msg: Strings.verificationCode, status }))
            :
            missingEmail()
        setLoading(false)
    }

    const resendEmail = () => {
        const { params } = props.route;
        if (params) {
            setActiveResend(false)
            StorageRecovery.confirmEmail(params.email)
                .catch(status => missingEmail())
        } else {
            missingEmail()
        }
    }

    const goNextInput = (value, index) => {
        let codes = valueCodes.codes;
        codes[index] = value;
        setValueCodes({ codes })
        if (index + 1 < referencesCodes.length) {
            referencesCodes[index + 1].current.focus()
        }
    }

    const goBackInput = (value, index) => {
        if (index - 1 >= 0 && value==="Backspace") {
            referencesCodes[index - 1].current.focus()
        }
    }

    const cleanInputFocus = (value, index) => {
        if (value) {
            let codes = valueCodes.codes;
            codes[index] = "";
            setValueCodes({ codes })
        }
    }

    return (
        <View style={styles.containerAll}>
            <ScrollView contentContainerStyle={styles.containerContent}
                keyboardShouldPersistTaps='handled'>
                <TextDefault
                    style={styles.logo}
                    children={"Fatec +"}
                    styleText={styles.txtLogo} />
                <TextDefault
                    children={"Insira o código de acesso"}
                    styleText={styles.txtInsertCode} />
                <View style={styles.containerInputsCodes}>
                    {
                        referencesCodes.map((_, index) => (
                            <InputCode
                                type={"numeric"}
                                key={String(index)}
                                ref={referencesCodes[index]}
                                text={valueCodes.codes[index]}
                                onchange={value => goNextInput(value, index)}
                                onKeyPress={value => goBackInput(value, index)}
                                onFocus={value => cleanInputFocus(value, index)} />
                        ))
                    }
                </View>
                <ButtonDefault
                    text={"Próximo"}
                    loading={loading}
                    style={styles.button}
                    active={Boolean(!valueCodes.codes.includes(""))}
                    onPress={verifyVerificationCode} />
                <TextDefault
                    selectable={false}
                    active={activeResend}
                    children={"Reenviar email"}
                    styleText={styles.txtResendEmail}
                    onPress={activeResend ? resendEmail : false} />
            </ScrollView>
        </View>
    );
};