import React from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator, Keyboard } from "react-native";

import Colors from '../constants/colors';
import { TextDefault } from './textDefault';

export const ButtonSmall = ({ text, onPress, loading, outline = false, style }) => {
    
    const press = () => {
        Keyboard.dismiss()
        onPress && onPress()
    }

    return (
        <TouchableOpacity
            onPress={() => press()}
            style={[outline ? styles.buttonOutline : styles.button, style]}>
            {loading
                ?
                <ActivityIndicator size="small" color={outline ? Colors.primary : "white"} />
                :
                <TextDefault
                    children={text}
                    selectable={false}
                    style={styles.containerText}
                    styleText={{ ...styles.textButton, color: outline ? Colors.primary : "white" }} />
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 35,
        width: 125,
        borderRadius: 30,
        marginVertical: 10,
        overflow: "hidden",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
    },
    buttonOutline: {
        height: 35,
        width: 125,
        borderWidth: 1,
        borderRadius: 30,
        marginVertical: 10,
        overflow: "hidden",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.primary,
        backgroundColor: Colors.background,
    },
    containerText: {
        width: 120,
    },
    textButton: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: "Nunito-Bold"
    },
});