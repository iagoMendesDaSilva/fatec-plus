import React from "react";
import { StyleSheet, TouchableOpacity, View, Animated, Dimensions, Linking } from "react-native";

import Colors from '~colors';
import { Animate } from "~services";
import { TextDefault, Icon } from "~components";

const HEIGTH = Dimensions.get("window").height

export const ModalContact = ({ phone = "", email = "", open = false, onClose }) => {

    const modalPositionY = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => open && show(), [open])

    const show = () =>
        Animate.timming(modalPositionY, 1, 400).start()


    const close = () => {
        Animate.timming(modalPositionY, 0, 400).start()
        onClose && onClose()
    }

    const translateY = modalPositionY.interpolate({
        inputRange: [0, 1],
        outputRange: [HEIGTH, HEIGTH - 200],
        extrapolate: "clamp",
    })

    return (
        <Animated.View style={{ ...styles.conatinerModal, transform: [{ translateY }] }}>
            <View style={styles.conatinerHeader}>
                <TextDefault
                    children={"Contato"}
                    styleText={styles.txtTitle} />
                <TouchableOpacity
                    onPress={close}
                    hitSlop={styles.hitSlop}>
                    <Icon
                        name={"close"}
                        lib={'AntDesign'} />
                </TouchableOpacity>
            </View>
            <View style={styles.conatinerContent}>
                <TextDefault
                    children={"Telefone"}
                    styleText={styles.txtSection} />
                <TextDefault
                    children={phone}
                    styleText={styles.txtItem}
                    onPress={() => Linking.openURL(`tel://${phone}`)} />
                <TextDefault
                    children={"Email"}
                    styleText={styles.txtSection} />
                <TextDefault
                    children={email}
                    styleText={styles.txtItem}
                    onPress={() => Linking.openURL(`mailto:support:${email}`)} />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    conatinerModal: {
        zIndex: 2,
        padding: 15,
        height: 200,
        width: "100%",
        position: "absolute",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.BACKGROUND_LIGHT_PLUS,
    },
    conatinerHeader: {
        paddingBottom: 10,
        flexDirection: "row",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        borderBottomColor: Colors.BACKGROUND_LIGHT,
    },
    conatinerContent: {
        flex: 1,
        paddingTop: 3,
    },
    hitSlop: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
    },
    txtTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.TEXT_PRIMARY,
    },
    txtItem: {
        fontSize: 20,
        color: Colors.TEXT_PRIMARY,
    },
    txtSection: {
        fontSize: 18,
        paddingTop: 5,
        color: Colors.PRIMARY,
    },
})
