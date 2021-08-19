import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import Colors from '~colors';

export const InputCode = React.forwardRef(({ text, onchange, onKeyPress, onFocus }, ref) => {

    return (
        <TextInput
            ref={ref}
            value={text}
            maxLength={1}
            autoCorrect={false}
            style={styles.textInput}
            allowFontScaling={false}
            onFocus={() => onFocus()}
            keyboardType={"numeric"}
            onChangeText={value => onchange(value)}
            onKeyPress={e => onKeyPress(e.nativeEvent.key)}
        />
    );
});

const styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        borderRadius: 10,
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        color: Colors.TEXT_PRIMARY,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
})
