import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { Icon } from './icon';
import Colors from '../constants/colors';

export const AnimatedLogo = ({ show }) => {

    const animationFade = useRef(new Animated.Value(0)).current
    const animationRotate = useRef(new Animated.Value(0)).current

    useEffect(async () => {
        if (!show) {
            await animateFade(animationFade, 0, 600)
            animationRotate.setValue(0)
        } else {
            await animateFade(animationFade, 1)
            animateLoop([
                animate(animationRotate, 1),
                animate(animationRotate, 2),
                animate(animationRotate, 3),
                animate(animationRotate, 4),
            ])
        }
    }, [show])

    animateLoop = animations => Animated.loop(Animated.sequence(animations)).start()

    animate = (state, toValue, duration = 600, useNativeDriver = false) => {
        return Animated.timing(state, {
            duration,
            toValue,
            useNativeDriver,
        })
    }

    animateFade = (state, toValue, duration = 1200, useNativeDriver = false) => {
        return new Promise(resolve => {
            Animated.timing(state, {
                duration,
                toValue,
                useNativeDriver,
            }).start(() => resolve())
        });
    }

    const rotateLogo = animationRotate.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: ["90deg", "45deg", "0deg", "-45deg", "-90deg"],
        extrapolate: "clamp"
    })

    return (
        <Animated.View style={{ ...styles.containerLogo, opacity: animationFade }}>
            <Text style={styles.txtLogo}>Fatec</Text>
            <Icon name={"plus"} lib={"feather"} size={50} color={Colors.primary} style={{ ...styles.iconLogo, transform: [{ rotate: rotateLogo }] }} />
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
    },
    iconLogo: {
        marginTop: 10,
    },
});