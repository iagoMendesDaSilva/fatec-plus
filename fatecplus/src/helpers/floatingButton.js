import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Icon } from '../helpers';
import Colors from '../constants/colors';

export const FloatingButton = ({ }) => {

    const pressButton = () => {
        
    }

    return (
        <TouchableOpacity
            onPress={pressButton}
            style={styles.containerAll} >
            <Icon name={"plus"} lib={"Feather"} size={30} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        right: 25,
        width: 60,
        height: 60,
        bottom: 25,
        borderRadius: 60,
        alignItems: "center",
        position: "absolute",
        justifyContent: "center",
        backgroundColor: Colors.primary,
    }
})