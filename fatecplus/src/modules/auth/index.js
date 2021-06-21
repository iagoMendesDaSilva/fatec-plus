import styles from './style';
import { View, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';

import { StorageAuth } from './storage';
import { Error, Storage, Notification } from '../../services';
import { ModalContext } from '../../routes/modalContext';
import { TextDefault, Input, ButtonDefault } from '../../helpers';

export const Auth = ({ navigation }) => {

    const modal = useContext(ModalContext);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const configErrorModal = async status => {
        Storage.clear()
        const message = status === 404 ? "Usuário ou senha inválidos!" : Error.validate(status)
        modal.setInfo({ visible: true, message })
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
            <TextDefault
                lines={2}
                style={styles.txtWelcome}
                children={"Olá.\nBem vindo!"} />
            <ScrollView contentContainerStyle={styles.containerContent}
                keyboardShouldPersistTaps='handled'>
                <View style={styles.containerInput}>
                    <Input
                        text={username}
                        placeholder={"Usuário"}
                        onchange={text => setUsername(text)} />
                    <Input
                        text={password}
                        password={true}
                        placeholder={"Senha"}
                        onchange={text => setPassword(text)} />
                    <TextDefault
                        style={styles.txtForgetPassword}
                        children={"Esqueci minha senha!"}
                        onPress={() => console.log("esqueci a senha")} />
                </View>
                <ButtonDefault
                    text={"Entrar"}
                    onPress={login}
                    loading={loading}
                    style={styles.button}
                    active={Boolean(username && password)} />
                <TextDefault
                    selectable={false}
                    style={styles.txtCreateAccount}
                    children={"Não tem conta? Crie uma!"}
                    onPress={() => console.log("esqueci a senha")} />
            </ScrollView>
        </View>
    );
};