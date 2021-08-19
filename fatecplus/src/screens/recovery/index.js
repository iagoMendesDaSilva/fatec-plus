import styles from './style';
import React, { useState, useContext } from 'react';

import Strings from '~strings';
import { Storage } from '~services';
import { ModalContext } from '~contexts';
import { StorageRecovery } from './storage';
import { TextDefault, Input, ButtonDefault, Screen } from '~components';

export const Recovery = ({ navigation }) => {

    const modal = useContext(ModalContext);

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const goToVerificationCode = data => {
        Storage.setUser({ id: data.id, email: email })
        navigation.navigate("VerificationCode")
    }

    const confirmEmail = () => {
        setLoading(true)
        StorageRecovery.confirmEmail(email)
            .then(data => goToVerificationCode(data))
            .catch(status => modal.set({ msg: Strings.ERROR_EMAIL, status }))
            .finally(() => setLoading(false));
    }

    return (
        <Screen>
                <TextDefault
                    style={styles.logo}
                    children={"Fatec +"}
                    styleText={styles.txtLogo} />
                <Input
                    text={email}
                    iconName={"email"}
                    placeholder={"Email"}
                    type={"email-address"}
                    iconLib={"MaterialIcons"}
                    onchange={text => setEmail(text)} />
                <ButtonDefault
                    text={"Próximo"}
                    loading={loading}
                    style={styles.button}
                    onPress={confirmEmail}
                    active={Boolean(email)} />
                <TextDefault
                    styleText={styles.txtAlreadyCode}
                    children={"Já tenho um código!"}
                    onPress={() => navigation.navigate("VerificationCode")} />
        </Screen>
    );
};
