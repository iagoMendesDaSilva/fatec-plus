import React from "react";
import { View, Modal, StyleSheet, Dimensions } from "react-native";

import { TextDefault } from '.';
import Colors from "../constants/colors";

const widthScreen = Dimensions.get("screen").width;

export const ModalOneOption = ({ visible, message, positiveText = "OK", positivePress }) => {

    return (
        <Modal
            transparent
            visible={visible}
            animationType='slide' >

            <View style={styles.containerModal}>
                <View style={styles.modal}>
                    <View style={styles.containerText}>
                        <TextDefault
                            lines={2}
                            selectable={false}
                            children={message}
                            style={styles.textMessage} />
                    </View>
                    <View style={styles.divisionButton} />
                    <View style={styles.containerButtons}>
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
        height: 110,
        borderRadius: 20,
        overflow: "hidden",
        alignItems:"center",
        width: widthScreen * .9,
        backgroundColor: Colors.background_light,
    },
    textTitle: {
        fontSize: 14,
        marginRight: 10,
        color: "rgba(255,255,255,.5)",
    },
    textMessage: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    containerText: {
        flex: 1,
        width:"80%",
        paddingVertical: 20,
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        paddingVertical: 10,
    },
    button: {
        flex: 1,
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        textAlignVertical: "center",
    },
    divisionButton: {
        height: .3,
        width: "95%",
        backgroundColor: "rgba(255,255,255,.5)",
    },
});