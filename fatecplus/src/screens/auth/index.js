import styles from './style';
import { View } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';

import Strings from '~strings';
import { StorageAuth } from './storage';
import { ModalContext } from '~contexts';
import { Storage, Notification } from '~services';
import { TextDefault, Input, ButtonDefault, Screen } from '~components';

export const Auth = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showingPassword, setShowingPassword] = useState(false);

    useEffect(() => getDefaultValues(), [])

    const getDefaultValues = () => {
        if (route.params) {
            setPassword(route.params.password)
            setUsername(route.params.username)
        }
    }

    const setModal = (status, clear = false) => {
        clear
            ? modal.set({ msg: Strings.ERROR_LOGIN, status, positivePress: logout })
            : modal.set({ msg: Strings.ERROR_LOGIN, status })
    }

    const logout = async () => {
        await StorageAuth.logout()
        Storage.clear()
        Notification.unregister()
    }

    const configUser = async data => {
        Storage.setUser({ username, password, token: data.token, id: data.id, category: data.category })
        const versionApp = Storage.getVersion()
        const playerId = await Notification.getPlayerId()

        StorageAuth.registerOneSignal(playerId, data.id)
            .then(() =>
                StorageAuth.registerVersion(versionApp, data.id)
                    .then(data => navigation.replace("Home")))
            .catch(status => setModal(status, true))
    }

    const login = () => {
        setLoading(true)
        StorageAuth.login(username, password)
            .then(data => configUser(data))
            .catch(status => setModal(status))
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
                        defaultValue={username}
                        onchange={text => setUsername(text)} />
                    <Input
                        maxLength={8}
                        text={password}
                        password={true}
                        iconName={"lock"}
                        placeholder={"Senha"}
                        defaultValue={password}
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
                    styleText={styles.txtCreateAccount}
                    children={"Não tem conta? Crie uma!"}
                    onPress={() => navigation.navigate("Register")} />
            </View>
        </Screen>
    );
};
