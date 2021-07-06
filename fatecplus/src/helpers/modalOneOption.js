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
                    <TextDefault
                        lines={2}
                        selectable={false}
                        children={message}
                        styleText={styles.txtMessage}
                        style={styles.containerText} />
                    <View style={styles.divisionButton} />
                    <TextDefault
                        style={styles.button}
                        children={positiveText}
                        onPress={() => positivePress && positivePress()} />
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
        alignItems: "center",
        width: widthScreen * .9,
        backgroundColor: Colors.background_light,
    },
    txtMessage: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    containerText: {
        flex: 1,
        width: "80%",
        justifyContent: "center",
    },
    button: {
        flex: 1,
        width:"100%",
        alignItems: "center",
        justifyContent: "center",
    },
    divisionButton: {
        height: .3,
        width: "75%",
        backgroundColor: "rgba(255,255,255,.5)",
    },
});