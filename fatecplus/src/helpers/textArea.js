import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

import Colors from '../constants/colors';

const widthScreen = Dimensions.get("screen").width;

export const TextArea = ({ text, placeholder, onchange, size = widthScreen * .9, maxHeight = 150, maxLength = 300, defaultValue }) => {

    return (
        <TextInput
            value={text}
            multiline={true}
            maxLength={maxLength}
            allowFontScaling={false}
            placeholder={placeholder}
            onChangeText={onchange}
            defaultValue={defaultValue}
            placeholderTextColor={Colors.TEXT_PRIMARY_LIGHT_PLUS}
            style={{ ...styles.textArea, width: size, height: maxHeight }} />
    );
}

const styles = StyleSheet.create({
    textArea: {
        padding: 8,
        fontSize: 20,
        color: Colors.TEXT_PRIMARY,
        borderRadius: 10,
        marginVertical: 10,
        textAlignVertical: "top",
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
})
