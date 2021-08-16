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

    const params = route.params;
    const modal = useContext(ModalContext);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [strongPassword, setStrongPassword] = useState(0);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showingPassword, setShowingPassword] = useState(false);

    const changePassword = () => {
        if (password === confirmPassword) {
            setLoading(true)
            params ? saveUser() : editUser()
        } else {
            modal.set({ msg: Strings.ERROR_PASSWORDS, status: 404 })
        }
    }

    const editUser = () => {
        StorageRecovery.changePassword(password)
            .then(data => setUser(password))
            .catch(status => modal.set({ status }))
            .finally(() => setLoading(false));
    }

    const saveUser = () => {
        StorageRegister.register(params, password)
            .then(response => login())
            .catch(status => modal.set({ status }))
            .finally(() => setLoading(false));
    }

    const setUser = async password => {
        const user = await Storage.getUser()
        Storage.setUser({ ...user, password })
        modal.set({ msg: Strings.UPDATED, status: 404, back: true })
    }

    const login = () => {
        StorageAuth.login(params.username, password)
            .then(data => configUser(data))
            .catch(status => set(status))
            .finally(() => setLoading(false))
    }
    
    const configUser = async data => {
        Storage.setUser({ username: params.username, password, token: data.token, id: data.id, category: data.category })
        const versionApp = Storage.getVersion()
        const playerId = await Notification.getPlayerId()

        StorageAuth.registerOneSignal(playerId, data.id)
            .then(() =>
                StorageAuth.registerVersion(versionApp, data.id)
                    .then(data => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })))
            .catch(status => modal.set({ msg: Strings.ERROR_LOGIN, status, positivePress: logout }))
    }
    
    const logout = async () => {
        await StorageAuth.logout()
        Storage.clear()
        Notification.unregister()
    }

    const changeVisibility = () =>
        setShowingPassword(!showingPassword)

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
                    changeVisibility={changeVisibility}
                    showPassword={showingPassword}
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
