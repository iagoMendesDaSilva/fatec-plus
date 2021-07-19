
import React from 'react';
import { StyleSheet, Animated, Dimensions, View } from 'react-native';

import { Animate } from '../services';
import Colors from '../constants/colors';
import { TextDefault, Icon } from '../helpers';

const widthScreen = Dimensions.get("screen").width;

export const Select = ({ value = "", changeValue = false, options = [], zIndex = 2, initialValue, iconName = "", iconLib = "" }) => {

    const [open, setOpen] = React.useState(false);
    const heightSelect = React.useRef(new Animated.Value(40)).current;

    const pressSelect = () => {
        Animate.timming(heightSelect, open ? 40 : 40 * (options.length + 1), 500).start();
        setOpen(!open)
    }

    const choiseSelect = value => {
        changeValue && changeValue(value)
        pressSelect()
    }

    return (
        <View style={styles.containerAll}>
            <Animated.View style={{ ...styles.containerSelect, height: heightSelect, zIndex: zIndex }} >
                <View style={styles.containerHeader}>
                    {
                        Boolean(iconName) &&
                        <Icon
                            lib={iconLib}
                            style={styles.icon}
                            name={iconName} />
                    }
                    <TextDefault
                        onPress={pressSelect}
                        style={styles.containerText}
                        children={value ? value : initialValue}
                        styleText={value ? styles.txtSelectItem : styles.initialValue} />
                    <Icon
                        style={styles.icon}
                        lib={'MaterialIcons'}
                        name={open ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} />
                </View>
                {
                    options.map((item, index) =>
                        <TextDefault
                            children={item}
                            key={String(index)}
                            active={value != item}
                            style={styles.containerText}
                            styleText={styles.txtSelectItem}
                            onPress={() => open && choiseSelect(options[index])} />
                    )
                }
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        height: 40,
        marginVertical: 10,
        alignItems: "center"
    },
    containerSelect: {
        zIndex: 2,
        elevation: 5,
        paddingLeft:10,
        shadowRadius: 3,
        borderRadius: 30,
        overflow: "hidden",
        shadowOpacity:  .5,
        position: "absolute",
        width: widthScreen * .9,
        shadowColor: Colors.background,
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: Colors.background_light
    },
    containerHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    containerText: {
        flex: 1,
        height: 40,
        justifyContent: "center",
    },
    txtSelectItem: {
        fontSize: 18,
        color: "white",
    },
    initialValue: {
        fontSize: 18,
        color: "rgba(255,255,255,.5)",
    },
    icon: {
        marginRight: 15,
    }
})