import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Colors from '../constants/colors';
import { TextDefault, Icon } from '../helpers';

const widthScreen = Dimensions.get("screen").width;

export const DatePickerDefault = ({ title, onPress }) => {

    return (
        <TouchableOpacity
            style={styles.containerAll}
            onPress={() => onPress()}>
            <Icon
                name={"cake"}
                lib={"MaterialIcons"} />
            <TextDefault
                styleText={styles.txtDate}
                children={title ? title : "Data de Nascimento"} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        padding: 8,
        marginVertical:10,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        width: widthScreen * .9,
        backgroundColor: Colors.background_light
    },
    txtDate: {
        fontSize: 18,
        marginLeft: 8,
        color: "rgba(255,255,255,.5)",
    },
});