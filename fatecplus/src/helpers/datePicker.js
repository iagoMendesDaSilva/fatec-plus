import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';

import Colors from '../constants/colors';
import { TextDefault, Icon } from '../helpers';

const widthScreen = Dimensions.get("screen").width;

export const DatePickerDefault = ({ initialValue, title, onPress, deleteValue }) => {

    return (
        <View style={styles.containerAll}>
            <TouchableOpacity
                style={styles.containerContent}
                onPress={() => onPress && onPress()}>
                <Icon
                    lib={"AntDesign"}
                    name={"calendar"} />
                <TextDefault
                    styleText={styles.txtDate}
                    children={title ? title : initialValue} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => deleteValue && deleteValue()}
                disabled={!title}
                hitSlop={styles.hitslop}>
                <Icon
                    size={15}
                    name={"trash"}
                    lib={'fontawesome5'}
                    style={{ opacity: title ? 1 : .5 }} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        padding: 8,
        borderRadius: 30,
        marginVertical: 10,
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
    containerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    hitslop: {
        left: 25,
        top: 12,
        right: 12,
        bottom: 12,
    }
});