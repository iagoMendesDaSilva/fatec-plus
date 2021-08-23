import React from "react";
import { View, Modal, StyleSheet, Dimensions } from "react-native";

import Colors from "~colors";
import { Icon, TextDefault } from '~components';

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
                                styleText={styles.textTitle}
                                style={styles.containerTitle} />
                        </View>
                        <TextDefault
                            lines={2}
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
        backgroundColor:'rgba(0,0,0,.5)',
    },
    modal: {
        height: 145,
        borderRadius: 20,
        overflow: "hidden",
        width: widthScreen * .9,
        backgroundColor: Colors.BACKGROUND_LIGHT_PLUS,
    },
    containerTitle:{
        paddingRight:40,
    },
    textTitle: {
        fontSize: 14,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    textMessage: {
        fontSize: 16,
        color: Colors.TEXT_PRIMARY,
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
        alignItems:"center",
    },
    icon: {
        marginRight: 10,
        paddingLeft: 15,
    },
    divisionButtons: {
        width: .5,
        height: "60%",
        backgroundColor: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
});
