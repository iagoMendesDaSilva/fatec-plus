import styles from './style';
import { View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import { ModalContext } from '~contexts';
import { StorageAuth } from '../auth/storage';
import { AnimatedLogo } from '~components';
import { Storage, Notification } from '~services';

export const Splash = (props) => {

    const modal = useContext(ModalContext);

    let timer = null;
    let notification = null;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        modal.setNavigation(props.navigation)
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
        Storage.setUser({ username: user.username, password: user.password, token: data.token, id: data.id, category: data.category })
        const params = props.route.params
        if (params) {
            params.id && (params.type === "Student" || params.type === "Job") && props.navigation.replace(params.type, { id: params.id, indication: params.indication })
        } else {
            props.navigation.replace("Home")
        }
    }

    return (
        <View style={styles.containerAll}>
            <AnimatedLogo show={loading} />
        </View>
    );
};