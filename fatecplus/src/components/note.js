import React from 'react';
import { StyleSheet, Animated, Text, Dimensions } from 'react-native';

import Colors from '~colors';
import { Animate } from '~services';
import { Icon } from '~components';

const WIDTH = Dimensions.get("screen").width;

export const Note = ({ text = "" }) => {

    const heightNote = React.useRef(new Animated.Value(45)).current;

    React.useEffect(() => Animate.timming(heightNote, 110).start(), [])

    return (
        <Animated.Text style={{ ...styles.containerNote, maxHeight: heightNote }} >
            <Icon
                name={"sticky-note"}
                color={Colors.TEXT_PRIMARY_LIGHT_PLUS} />
            <Text
                selectionColor={"gray"}
                allowFontScaling={false}
                style={styles.txtDescription}>
                {`  ${text}`}
            </Text>
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    containerNote: {
        flexWrap: "wrap",
        borderRadius: 20,
        width: WIDTH * .9,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    txtDescription: {
        fontSize: 16,
        textAlign:"justify",
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
})
