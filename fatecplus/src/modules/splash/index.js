import styles from './style';
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';

import Colors from '../../constants/colors';
import { AnimatedLogo } from '../../helpers';

export const Splash = () => {

    const [loading, setLoading] = useState(true);

    return (
        <View style={styles.containerAll}>
            <StatusBar barStyle={'light-content'} backgroundColor={Colors.background} />
            <AnimatedLogo show={loading} />
        </View>
    );
};