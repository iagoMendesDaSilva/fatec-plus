import styles from './style';
import { View, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';

import { Storage } from '../../services';
import Strings from '../../constants/strings';
import { StorageRecovery } from './storage';
import { ModalContext } from '../../routes/modalContext';
import { TextDefault, Input, ButtonDefault } from '../../helpers';

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
            .catch(status => modal.configErrorModal({ msg: Strings.failEmail, status }))
            .finally(() => setLoading(false));
    }

    return (
        <View style={styles.containerAll}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.containerContent}>
                <TextDefault
                    style={styles.logo}
                    children={"Fatec +"}
                    styleText={styles.txtLogo} />
                <Input
                    text={email}
                    iconName={"email"}
                    placeholder={"Email"}
                    iconLib={"MaterialIcons"}
                    onchange={text => setEmail(text)} />
                <ButtonDefault
                    text={"Próximo"}
                    loading={loading}
                    style={styles.button}
                    onPress={confirmEmail}
                    active={Boolean(email)} />
                <TextDefault
                    selectable={false}
                    styleText={styles.txtAlreadyCode}
                    children={"Já tenho um código!"}
                    onPress={() => navigation.navigate("VerificationCode")} />
            </ScrollView>
        </View>
    );
};