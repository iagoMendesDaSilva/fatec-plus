import React from "react";
import { StyleSheet, TouchableOpacity, View, Animated, Dimensions } from "react-native";

import { Animate } from "../services";
import Colors from '../constants/colors';
import { TextDefault , Icon} from "../helpers";

const { height } = Dimensions.get("window");

export const ModalBottom = ({ children, open = false, title, onClose }) => {

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
        outputRange: [height, height - 200],
        extrapolate: "clamp",
    })

    return (
        <Animated.View style={{ ...styles.conatinerModal, transform: [{ translateY }] }}>
            <View style={styles.conatinerHeader}>
                <TextDefault
                    children={title}
                    styleText={styles.txtTilte} />
                <TouchableOpacity
                    onPress={close}
                    hitSlop={styles.hitSlop}>
                    <Icon
                        name={"close"}
                        lib={'AntDesign'} />
                </TouchableOpacity>
            </View>
            <View style={styles.conatinerContent}>
                {children}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    conatinerModal: {
        zIndex: 2,
        height: 200,
        padding: 15,
        width: "100%",
        position: "absolute",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.background_medium,
    },
    conatinerHeader: {
        paddingBottom: 10,
        flexDirection: "row",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        borderBottomColor: Colors.background,
    },
    conatinerContent: {
        flex: 1,
        justifyContent: "center",
    },
    hitSlop: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
    },
    txtTilte: {
        fontSize: 20,
        color: "white",
    },
})