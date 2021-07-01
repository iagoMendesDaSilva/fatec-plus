import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export const InputCode = React.forwardRef(({ text, type, onchange, onKeyPress, onFocus }, ref) => {

    return (
        <TextInput
            ref={ref}
            value={text}
            maxLength={1}
            autoCorrect={false}
            keyboardType={type}
            style={styles.textInput}
            allowFontScaling={false}
            onFocus={() => onFocus()}
            onChangeText={value => onchange(value)}
            onKeyPress={e => onKeyPress(e.nativeEvent.key)}
        />
    );
});

const styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        color: "white",
        borderRadius: 10,
        textAlign: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: Colors.background_light,
    },
})