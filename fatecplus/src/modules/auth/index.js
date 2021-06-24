import styles from './style';
import { View, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';

import { StorageAuth } from './storage';
import Strings from '../../constants/strings';
import { Storage, Notification } from '../../services';
import { ModalContext } from '../../routes/modalContext';
import { TextDefault, Input, ButtonDefault } from '../../helpers';

export const Auth = ({ navigation }) => {

    const modal = useContext(ModalContext);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const configErrorModal = async status => {
        Storage.clear()
        modal.configErrorModal({ msg: Strings.failLogin, status })
    }

    const configUser = async data => {
        Storage.setUser(username, password, data.token, data.id)
        const playerId = await Notification.getPlayerId()
        StorageAuth.registerOneSignal(playerId, data.id)
            .then(data => navigation.replace("Vacancies"))
            .catch(status => configErrorModal(status))
    }

    const login = () => {
        setLoading(true)
        StorageAuth.login(username, password)
            .then(data => configUser(data))
            .catch(status => configErrorModal(status))
            .finally(() => setLoading(false));
    }

    return (
        <View style={styles.containerAll}>
            <ScrollView contentContainerStyle={styles.containerScroll}
                keyboardShouldPersistTaps='handled'>
                <TextDefault
                    lines={2}
                    styleText={styles.txtWelcome}
                    children={"Olá.\nBem vindo!"} />
                <View style={styles.containerContent}>
                    <View style={styles.containerInput}>
                        <Input
                            text={username}
                            iconName={"user"}
                            placeholder={"Usuário"}
                            onchange={text => setUsername(text)} />
                        <Input
                            text={password}
                            password={true}
                            iconName={"lock"}
                            placeholder={"Senha"}
                            onchange={text => setPassword(text)} />
                        <TextDefault
                            children={"Esqueci minha senha!"}
                            styleText={styles.txtForgetPassword}
                            onPress={() => navigation.navigate("Recovery")} />
                    </View>
                    <ButtonDefault
                        text={"Entrar"}
                        onPress={login}
                        loading={loading}
                        style={styles.button}
                        active={Boolean(username && password)} />
                    <TextDefault
                        selectable={false}
                        styleText={styles.txtCreateAccount}
                        children={"Não tem conta? Crie uma!"}
                        onPress={() => console.log("esqueci a senha")} />
                </View>
            </ScrollView>
        </View>
    );
};