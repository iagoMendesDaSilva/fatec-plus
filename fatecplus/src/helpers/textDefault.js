import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

export const TextDefault = ({ children, style, styleText, lines = 1,
    selectable = false, onPress = false, active = true, hitSlop = false ,  disabled=false}) => {

    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}
            disabled={!onPress || disabled}
            hitSlop={hitSlop ? hitSlop : styles.hitSlop}>
            <Text
                selectionColor={"gray"}
                allowFontScaling={false}
                numberOfLines={lines}
                style={[styleText ? styleText : styles.textDefault, { opacity: active ? 1 : .5, }]}
                selectable={selectable && !onPress ? selectable : false}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textDefault: {
        fontSize: 16,
        color: Colors.TEXT_PRIMARY,
    },
    hitSlop: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    }
})
