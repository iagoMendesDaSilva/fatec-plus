import styles from './style';
import { View, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';

import { StoragePassword } from './storage';
import Strings from '../../constants/strings';
import { ModalContext } from '../../routes/modalContext';
import { ProgressPassword, Input, ButtonDefault } from '../../helpers';

export const ChangePassword = ({ navigation }) => {

    const modal = useContext(ModalContext);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [strongPassword, setStrongPassword] = useState(0);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showingPassword, setShowingPassword] = useState(false);

    const changePassword = () => {
        if (password === confirmPassword) {
            setLoading(true)
            StoragePassword.changePassword(password)
                .then(data => navigation.replace("Vacancies"))
                .catch(status => modal.configErrorModal({ status }))
                .finally(() => setLoading(false));

        } else {
            modal.configErrorModal({ msg: Strings.differentPasswords })
        }
    }

    const changeVisibility = () => setShowingPassword(!showingPassword)

    const verifyPassword = text => {
        const weakRegExp = new RegExp("^(?=.{4,})");
        const regularRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
        const strongRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        const regexs = [weakRegExp, regularRegExp, strongRegExp]

        let strong = Number(Boolean(text))
        regexs.forEach(regex => strong += Number(Boolean(regex.test(text))))

        setPassword(text)
        setStrongPassword(strong)
    }

    const activeButton = () =>
        Boolean(password.length === confirmPassword.length && password && strongPassword > 2)

    return (
        <View style={styles.containerAll}>
            <ScrollView contentContainerStyle={styles.containerContent}
                keyboardShouldPersistTaps='handled'>
                <ProgressPassword strong={strongPassword} />
                <View style={styles.containerInputs}>
                    <Input
                        maxLength={8}
                        text={password}
                        password={true}
                        iconName={"lock"}
                        placeholder={"Senha"}
                        showPassword={showingPassword}
                        changeVisibility={changeVisibility}
                        onchange={text => verifyPassword(text)} />
                    <Input
                        maxLength={8}
                        password={true}
                        iconName={"lock"}
                        text={confirmPassword}
                        placeholder={"Confirmar senha"}
                        showPassword={showingPassword}
                        onchange={text => setConfirmPassword(text)} />
                </View>
                <ButtonDefault
                    text={"Salvar"}
                    loading={loading}
                    style={styles.button}
                    active={activeButton()}
                    onPress={changePassword} />
            </ScrollView>
        </View>
    );
};