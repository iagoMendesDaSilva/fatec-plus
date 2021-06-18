import styles from './style';
import { View } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Storage } from '../../services';
import { StorageAuth } from '../auth/storage';
import { AnimatedLogo } from '../../helpers';

export const Splash = ({ navigation }) => {

    let timer = null;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        timer = setTimeout(() => checkUser(), 2300)
    }, []);

    const checkUser = async () => {
        const user = await Storage.getUser()
        user ?
            StorageAuth.login(user.username, user.password)
                .then(data => goTo("Home"))
                .catch(status => goTo("Login"))
            :
            goTo("Login")
    }

    const goTo = screen => {
        clearTimeout(timer)
        setLoading(false)
        navigation.replace(screen)
    }

    return (
        <View style={styles.containerAll}>
            <AnimatedLogo show={loading} />
        </View>
    );
};