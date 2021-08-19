import React from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator, Keyboard } from "react-native";

import Colors from '~colors';
import { TextDefault } from '~components';

export const ButtonSmall = ({ text, onPress, loading, outline = false, style }) => {

    const press = () => {
        Keyboard.dismiss()
        onPress && onPress()
    }

    return (
        <TouchableOpacity
            disabled={loading}
            onPress={() => press()}
            style={[outline ? styles.buttonOutline : styles.button, style]}>
            {loading
                ?
                <ActivityIndicator size="small" color={outline ? Colors.PRIMARY : Colors.TEXT_PRIMARY} />
                :
                <TextDefault
                    children={text}
                    style={styles.containerText}
                    styleText={{ ...styles.textButton, color: outline ? Colors.PRIMARY : Colors.TEXT_PRIMARY }} />
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
        backgroundColor: Colors.PRIMARY,
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
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.BACKGROUND,
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
