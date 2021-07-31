
import React from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';

import { Animate } from '../services';
import Colors from '../constants/colors';


export const SwicthDefault = ({ on = false, changeValue }) => {

    const positionX = React.useRef(new Animated.Value(5)).current;

    React.useEffect(() => Animate.timming(positionX, on ? 35 : 5, 300).start(), [on])

    const pressSwicth = () =>
        changeValue && changeValue(!on)

return (
    <TouchableOpacity
        onPress={pressSwicth}
        style={{ ...styles.containerSwitch, backgroundColor: on ? Colors.primary : Colors.background_light }}  >
        <Animated.View style={{ ...styles.switch, transform: [{ translateX: positionX }] }} />
    </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    containerSwitch: {
        width: 60,
        height: 25,
        borderRadius: 35,
        marginVertical: 10,
        justifyContent: "center",
    },
    switch: {
        width: 20,
        height: 20,
        borderRadius: 15,
        backgroundColor: "white",
    },
})