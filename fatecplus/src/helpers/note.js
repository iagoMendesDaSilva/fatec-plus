import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import Strings from '../constants/strings';
import { TextDefault, Icon } from '../helpers';

export const Note = ({ text = ""}) => {

    return (
        <View style={styles.containerDescription} >
            <Icon
                style={styles.icon}
                name={"sticky-note"}
                color={"rgba(255,255,255,.5)"} />
            <TextDefault
                lines={0}
                styleText={styles.txtDescription}
                children={Strings.spaceIcon + text} />
        </View>
    );
}

const styles = StyleSheet.create({
    containerDescription: {
        width: "90%",
        borderRadius: 20,
        marginVertical: 10,
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.background_light,
    },
    txtDescription: {
        fontSize: 18,
        color: "rgba(255,255,255,.5)",
    },
    icon: {
        left: 15,
        top: 10,
        zIndex: 2,
        position: "absolute",
    }
})