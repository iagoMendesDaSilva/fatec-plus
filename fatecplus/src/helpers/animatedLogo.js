import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { Animate } from '../services';
import Colors from '../constants/colors';
import {TextDefault} from './textDefault';

export const AnimatedLogo = ({ show }) => {

    const fade = useRef(new Animated.Value(0)).current
    const rotate = useRef(new Animated.Value(0)).current
    const plusVertical = useRef(new Animated.Value(35)).current
    const plusHorizontal = useRef(new Animated.Value(-35)).current

    useEffect(() => {
        show ? start() : end()
    }, [show]);

    const start = () => {
        Animate.timming(fade, 1).start(() => {
            Animated.loop(Animated.sequence([
                Animate.timming(plusVertical, 0, 300),
                Animate.timming(plusHorizontal, 0, 300),
                Animate.timming(rotate, 1, 500),
                Animate.timming(plusHorizontal, -35, 300),
                Animate.timming(plusVertical, 35, 300),
                Animate.timming(rotate, 0, 0),
            ])).start();
        });
    }

    const end = () => {
        Animate.timming(fade, 0).start(() => {
            rotate.setValue(0)
            plusVertical.setValue(35)
            plusHorizontal.setValue(-35)
        });
    }

    const rotateLogo = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg",],
        extrapolate: "clamp",
    });

    return (
        <Animated.View style={{ ...styles.containerLogo, opacity: fade }}>
            <TextDefault styleText={styles.txtLogo}>Fatec</TextDefault>
            <Animated.View style={{ ...styles.containerIcon, transform: [{ rotate: rotateLogo }] }}>
                <Animated.View style={{ ...styles.iconPlusHorizontal, transform: [{ translateX: plusHorizontal }] }} />
                <Animated.View style={{ ...styles.iconPlusVertical, transform: [{ translateY: plusVertical }] }} />
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    containerLogo: {
        alignItems: "center",
        flexDirection: "row",
    },
    txtLogo: {
        fontSize: 60,
        color: Colors.primary,
        fontFamily:"Nunito-SemiBold",
    },
    containerIcon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginTop: 10,
        borderRadius:35,
        overflow: "hidden",
    },
    iconPlusHorizontal: {
        top: 15,
        height: 5,
        zIndex: 2,
        width: 35,
        borderRadius: 3,
        position: "absolute",
        backgroundColor: Colors.primary,
    },
    iconPlusVertical: {
        left: 15,
        width: 5,
        zIndex: 2,
        height: 35,
        borderRadius: 3,
        position: "absolute",
        backgroundColor: Colors.primary,
    },
});