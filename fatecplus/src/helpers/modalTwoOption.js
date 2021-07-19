import React from "react";
import { View, Modal, StyleSheet, Dimensions } from "react-native";

import { Icon, TextDefault } from '.';
import Colors from "../constants/colors";

const widthScreen = Dimensions.get("screen").width;

export const ModalTwoOption = ({ visible, title, message, positiveText = "Confirmar", positivePress, negativeText = "Cancelar", negativePress = false, iconName, iconLib, iconColor }) => {

    return (
        <Modal
            transparent
            visible={visible}
            animationType='slide' >

            <View style={styles.containerModal}>
                <View style={styles.modal}>
                    <View style={styles.containerText}>
                        <View style={styles.header}>
                            {
                                Boolean(iconName) &&
                                <Icon
                                    size={15}
                                    lib={iconLib}
                                    style={styles.icon}
                                    color={iconColor}
                                    name={iconName} />
                            }
                            <TextDefault
                                children={title}
                                selectable={false}
                                styleText={styles.textTitle}
                                style={styles.containerTitle} />
                        </View>
                        <TextDefault
                            lines={2}
                            selectable={false}
                            children={message}
                            styleText={styles.textMessage} />
                    </View>
                    <View style={styles.containerButtons}>
                        <TextDefault
                            style={styles.button}
                            children={negativeText}
                            onPress={() => negativePress && negativePress()} />
                        <View style={styles.divisionButtons} />
                        <TextDefault
                            style={styles.button}
                            children={positiveText}
                            onPress={() => positivePress && positivePress()} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: 145,
        borderRadius: 20,
        overflow: "hidden",
        width: widthScreen * .9,
        backgroundColor: Colors.background_medium,
    },
    containerTitle:{
        paddingRight:40,
    },
    textTitle: {
        fontSize: 14,
        color: "rgba(255,255,255,.5)",
    },
    textMessage: {
        fontSize: 16,
        color: "white",
        lineHeight: 22,
        paddingHorizontal: 15,
    },
    containerText: {
        flex: 1.5,
        paddingVertical: 20,
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        paddingBottom: 10,
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        marginBottom: 10,
        flexDirection: "row",
    },
    icon: {
        marginRight: 10,
        paddingLeft: 15,
    },
    divisionButtons: {
        width: .3,
        height: "60%",
        backgroundColor: "rgba(255,255,255,.5)",
    },
});