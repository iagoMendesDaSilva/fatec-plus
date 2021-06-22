import styles from './style';
import { View, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';

import { Error } from '../../services';
import { StorageRecovery } from './storage';
import { ModalContext } from '../../routes/modalContext';
import { TextDefault, Input, ButtonDefault } from '../../helpers';

export const Recovery = () => {

    const modal = useContext(ModalContext);

    const [email, setEmail] = useState(false);
    const [loading, setLoading] = useState(false);

    const configErrorModal = async status => {
        const message = status === 404 ? "Email não cadastrado!" : Error.validate(status)
        modal.setInfo({ visible: true, message })
    }

    const confirmEmail = () => {
        setLoading(true)
        StorageRecovery.confirmEmail(email)
            .then(data =>console.log("email confirmado"))
            .catch(status => configErrorModal(status))
            .finally(() => setLoading(false));
    }

    return (
        <View style={styles.containerAll}>
            <ScrollView contentContainerStyle={styles.containerContent}
                keyboardShouldPersistTaps='handled'>
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
                    onPress={() => console.log("cod")} />
            </ScrollView>
        </View>
    );
};