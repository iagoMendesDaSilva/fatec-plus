import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

import { Animate } from '../services';
import Colors from '../constants/colors';
import Strings from '../constants/strings';
import { Icon, TextDefault } from '../helpers';

const widthScreen = Dimensions.get("screen").width;

export const ProgressPassword = ({ size = widthScreen * .9, strong = 0 }) => {

    const widthBar = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animate.timming(widthBar, (size / 4) * strong).start()
    }, [strong]);


    const verifyStrong = () => {
        switch (strong) {
            case 1:
                return { color: Colors.error, icon: 'emoji-sad', text: Strings.veryWeekPassword }
            case 2:
                return { color: Colors.warning, icon: 'emoji-neutral', text: Strings.weekPassword }
            case 3:
                return { color: Colors.regular, icon: 'emoji-happy', text: Strings.regularPassword }
            case 4:
                return { color: Colors.success, icon: 'emoji-flirt', text: Strings.strongPassword }
            default:
                return { color: Colors.background_light, icon: 'emoji-sad', text: Strings.noPassword }
        }
    }

    return (
        <View >
            <View style={styles.containerHorizontal}>
                <Icon
                    lib={"entypo"}
                    name={verifyStrong().icon}
                    color={verifyStrong().color}
                    size={25} style={styles.icon} />
                <TextDefault
                    children={verifyStrong().text}
                    styleText={{ ...styles.textStrongPassword, color: verifyStrong().color }} />
            </View>
            <View style={{ ...styles.bar, width: size }} >
                <Animated.View style={{ ...styles.animatedBar, width: widthBar, backgroundColor: !strong ? Colors.error : verifyStrong().color }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerHorizontal: {
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    bar: {
        height: 12,
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: Colors.background_light,
    },
    animatedBar: {
        height: 12,
    },
    icon: {
        marginHorizontal: 8,
    },
    textStrongPassword: {
        fontSize: 18,
    },
})