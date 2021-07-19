
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Icon } from '../helpers';

export const Arrow = ({ onPress }) =>
    <TouchableOpacity
        onPress={onPress}
        style={styles.touchableGoBack}>
        <Icon name={'angle-left'} size={40} />
    </TouchableOpacity>


const styles = StyleSheet.create({
    touchableGoBack: {
        left:0,
        top:0,
        width: 75,
        height: 50,
        zIndex:2,
        position:"absolute",
        paddingHorizontal: 11,
        justifyContent: "center",
    },
});