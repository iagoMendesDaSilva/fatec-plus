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
                return { color: Colors.ERROR, icon: 'emoji-sad', text: Strings.PASSWORD_VERY_WEEK }
            case 2:
                return { color: Colors.WARNING, icon: 'emoji-neutral', text: Strings.PASSWORD_WEEK }
            case 3:
                return { color: Colors.MINIMUM, icon: 'emoji-happy', text: Strings.PASSWORD_REGULAR }
            case 4:
                return { color: Colors.SUCCESS, icon: 'emoji-flirt', text: Strings.PASSWORD_STRONG }
            default:
                return { color: Colors.TEXT_PRIMARY_LIGHT_PLUS, icon: 'emoji-sad', text: Strings.NO_PASS }
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
                <Animated.View style={{ ...styles.animatedBar, width: widthBar, backgroundColor: !strong ? Colors.ERROR : verifyStrong().color }} />
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
        backgroundColor: Colors.BACKGROUND_LIGHT,
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
