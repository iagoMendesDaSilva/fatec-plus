import styles from './style';
import { View } from 'react-native';
import React, { useState, useContext } from 'react';

import { StorageAuth } from './storage';
import Strings from '../../constants/strings';
import { Storage, Notification } from '../../services';
import { ModalContext } from '../../routes/modalContext';
import { TextDefault, Input, ButtonDefault, Screen } from '../../helpers';

export const Auth = ({ navigation }) => {

    const modal = useContext(ModalContext);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showingPassword, setShowingPassword] = useState(false);

    const configErrorModal = async status => {
        Storage.clear()
        modal.configErrorModal({ msg: Strings.failLogin, status })
    }

    const configUser = async data => {
        Storage.setUser({ username, password, token: data.token, id: data.id })
        const playerId = await Notification.getPlayerId()
        StorageAuth.registerOneSignal(playerId, data.id)
            .then(data => navigation.replace("Home"))
            .catch(status => configErrorModal(status))
    }

    const login = () => {
        setLoading(true)
        StorageAuth.login(username, password)
            .then(data => configUser(data))
            .catch(status => configErrorModal(status))
            .finally(() => setLoading(false));
    }

    const changeVisibility = () => setShowingPassword(!showingPassword)

    return (
        <Screen center={false}>
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
                        maxLength={8}
                        text={password}
                        password={true}
                        iconName={"lock"}
                        placeholder={"Senha"}
                        changeVisibility={changeVisibility}
                        showPassword={showingPassword}
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
                    active={Boolean(username && password)} />
                <TextDefault
                    selectable={false}
                    styleText={styles.txtCreateAccount}
                    children={"Não tem conta? Crie uma!"}
                    onPress={() => navigation.navigate("Register")} />
            </View>
        </Screen>
    );
};