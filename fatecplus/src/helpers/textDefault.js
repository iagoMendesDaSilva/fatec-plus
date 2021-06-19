import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export const TextDefault =({ children, style, lines = 1,
    selectable = true, onPress = false }) => {

    return (
        <TouchableOpacity
            hitSlop={styles.hitSlop}
            disabled={!onPress}
            onPress={onPress}
            style={style ? style : styles.textDefault}>
            <Text
                selectionColor={"gray"}
                allowFontScaling={false}
                numberOfLines={lines}
                style={style ? style : styles.textDefault}
                selectable={selectable && !onPress ? selectable : false}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textDefault: {
        fontSize: 16,
        color: "white",
    },
    hitSlop:{
        top:10,
        left:10,
        right:10,
        bottom:10,
    }
})