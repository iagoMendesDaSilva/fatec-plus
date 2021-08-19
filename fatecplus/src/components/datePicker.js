import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, View, Keyboard } from 'react-native';

import Colors from '~colors';
import { TextDefault, Icon } from '~components';

const widthScreen = Dimensions.get("screen").width;

export const DatePickerDefault = ({ initialValue, title, onPress, deleteValue, picker, close }) => {


    const openPicker = () => {
        onPress()
        Keyboard.dismiss()
    }

    const closePicker = () => {
        if (picker) {
            close()
        } else
            deleteValue()
    }

    return (
        <View style={styles.containerAll}>
            <TouchableOpacity
                style={styles.containerContent}
                onPress={openPicker}>
                <Icon
                    style={styles.icon}
                    name={"calendar"} />
                <TextDefault
                    styleText={styles.txtDate}
                    children={title ? title : initialValue} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={closePicker}
                hitSlop={styles.hitslop}>
                <Icon
                    size={15}
                    style={styles.icon}
                    name={picker ? "close" : "trash"}
                    lib={picker ? "antdesign" : 'ionicons'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        height: 40,
        paddingLeft: 10,
        borderRadius: 30,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        width: widthScreen * .9,
        backgroundColor: Colors.BACKGROUND_LIGHT
    },
    txtDate: {
        fontSize: 18,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    containerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    hitslop: {
        left: 25,
        top: 12,
        right: 12,
        bottom: 12,
    },
    icon: {
        marginRight: 15,
    },
});
