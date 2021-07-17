import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import { TextDefault, Icon } from '../helpers';

export const ItemList = ({ iconName = "", iconLib = "", title, textRight = false, color = "white", arrow = true, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!onPress}
            style={styles.containerItem}>
            <Icon
                lib={iconLib}
                color={color}
                name={iconName} />
            <TextDefault
                children={title}
                style={styles.containerTxtItem}
                styleText={{ ...styles.txtItem, color: color }} />
            {
                Boolean(textRight && !arrow) &&
                <TextDefault
                    children={textRight}
                    styleText={styles.txtTextRight} />
            }
            {
                arrow &&
                <Icon
                    color={color}
                    lib={"MaterialIcons"}
                    name={"arrow-forward-ios"} />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerItem: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    containerTxtItem: {
        flex: 1,
    },
    txtItem: {
        fontSize: 18,
        paddingLeft: 10,
    },
    txtTextRight: {
        fontSize: 18,
        color: "rgba(255,255,255,.5)",
    },
    txtDeleteAccountant: {
        fontSize: 18,
        paddingLeft: 10,
        color: Colors.error,
    },
})