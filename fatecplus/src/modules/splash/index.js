import styles from './style';
import { View } from 'react-native';
import React, { useState, useEffect } from 'react';

import { AnimatedLogo } from '../../helpers';
import { StorageAuth } from '../auth/storage';
import { Storage, Notification } from '../../services';

export const Splash = (props) => {

    let timer = null;
    let notification = null;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        notification = new Notification(props.navigation)
        timer = setTimeout(() => checkUser(), 2300)
    }, []);

    const checkUser = async () => {
        const user = await Storage.getUser()
        user ?
            StorageAuth.login(user.username, user.password)
                .then(data => goToApp(user, data))
                .catch(status => goToLogin())
            :
            goToLogin()
    }

    const stopEvents = () => {
        clearTimeout(timer)
        setLoading(false)
    }

    const goToLogin = () => {
        stopEvents();
        props.navigation.replace("Login")
    }

    const goToApp = async (user, data) => {
        stopEvents();
        Storage.setUser({ username: user.username, password: user.password, token: data.token, id: data.id })
        const params = props.route.params
        if (params) {
            params.id && (params.type === "Student" || params.type === "Job") && props.navigation.replace(params.type, { id: params.id })
        } else {
            props.navigation.replace("Vacancies")
        }
    }

    return (
        <View style={styles.containerAll}>
            <AnimatedLogo show={loading} />
        </View>
    );
};