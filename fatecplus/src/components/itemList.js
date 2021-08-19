import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '~colors';
import { TextDefault, Icon } from '~components';

export const ItemList = ({ iconName = "", iconLib = "", title, textRight = false, color = Colors.TEXT_PRIMARY, arrow = true, onPress }) => {

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
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    txtDeleteAccountant: {
        fontSize: 18,
        paddingLeft: 10,
        color: Colors.ERROR,
    },
})
