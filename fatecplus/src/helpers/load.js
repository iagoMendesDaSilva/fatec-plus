import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

import Colors from "../constants/colors";

export const Load = ({ backgroundColor, color = Colors.TEXT_PRIMARY, size = "large", }) => {

    return (
        <View style={{ ...styles.containerLoader, backgroundColor: backgroundColor ? backgroundColor : "transparent" }}>
            <ActivityIndicator color={color} size={size} />
        </View>
    );
};

const styles = StyleSheet.create({
    containerLoader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
