import styles from './style';
import { View } from 'react-native';
import React, { useState, useContext } from 'react';

import { StorageRecovery } from '../storage';
import Strings from '../../../constants/strings';
import { StorageAuth } from '../../auth/storage';
import { Storage, Notification } from '../../../services';
import { StorageRegister } from '../../register/storage';
import { ModalContext } from '../../../routes/modalContext';
import { ProgressPassword, Input, ButtonDefault, Screen } from '../../../helpers';

export const ChangePassword = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [strongPassword, setStrongPassword] = useState(0);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showingPassword, setShowingPassword] = useState(false);

    const changePassword = () => {
        if (password === confirmPassword) {
            setLoading(true)
            route.params ? saveUser(password) : editUser(password)
        } else {
            modal.configErrorModal({ msg: Strings.differentPasswords })
        }
    }

    const configUser = async data => {
        Storage.setUser({ username: route.params.username, password, token: data.token, id: data.id })
        const playerId = await Notification.getPlayerId()
        StorageAuth.registerOneSignal(playerId, data.id)
            .then(data => navigation.replace("Vacancies"))
            .catch(status => configErrorModal(status))
    }

    const editUser = password => {
        StorageRecovery.changePassword(password)
            .then(data => navigation.replace("Vacancies"))
            .catch(status => modal.configErrorModal({ status }))
            .finally(() => setLoading(false));
    }

    const saveUser = password => {
        StorageRegister.register(route.params, password)
            .then(response =>
                StorageAuth.login(route.params.username, password)
                    .then(data => configUser(data))
                    .catch(status => configErrorModal(status))
                    .finally(() => setLoading(false)))
            .catch(status => modal.configErrorModal({ status: status === 400 ? 404 : status, msg: Strings.emailOrUsernameFail }))
            .finally(() => setLoading(false));
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
        <Screen>
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
                active={activeButton()}
                onPress={changePassword} />
        </Screen>
    );
};