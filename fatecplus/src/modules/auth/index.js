import styles from './style';
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import { StorageAuth } from './storage';
import { TextDefault, Input, ButtonDefault } from '../../helpers';

export const Auth = () => {

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const login = () => {
        setLoading(true)
        StorageAuth.login(username, password)
            .then(data => console.log(data))
            .catch(status => console.log(status))
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