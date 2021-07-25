import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

export const Load = ({ backgroundColor, color = "white", size = "large", }) => {

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