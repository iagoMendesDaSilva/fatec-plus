import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator, Keyboard, Animated, View } from "react-native";

import { Animate } from '../services';
import Colors from '../constants/colors';
import { TextDefault } from './textDefault';

export const ButtonDefault = ({ text, onPress, style, loading, active }) => {

    const activePosition = useRef(new Animated.Value(-250)).current

    const press = () => {
        Keyboard.dismiss()
        onPress && onPress()
    }

    useEffect(() => {
        Animate.timming(activePosition, active ? 0 : -250, 600).start();
    }, [active]);

    return (
        <TouchableOpacity
            onPress={() => press()}
            disabled={!active || loading}
            style={[styles.buttonSave, style]}>
            <Animated.View style={{ ...styles.buttonActive, transform: [{ translateX: activePosition }] }} />
            <View style={styles.content}>
                {loading
                    ?
                    <ActivityIndicator size="small" color={Colors.TEXT_PRIMARY} />
                    :
                    <TextDefault
                        children={text}
                        selectable={false}
                        style={styles.containerText}
                        styleText={styles.textButton} />
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonSave: {
        height: 50,
        width: 250,
        borderRadius: 30,
        marginVertical:10,
        overflow: "hidden",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    containerText: {
        width: 120,
    },
    textButton: {
        fontSize: 16,
        color: Colors.TEXT_PRIMARY,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily:"Nunito-Bold"
    },
    buttonActive: {
        height: 50,
        width: 250,
        backgroundColor: Colors.PRIMARY,
    },
    content: {
        position: "absolute",
    }
});
