
import React from 'react';
import { StyleSheet, Animated, Dimensions, View, Keyboard } from 'react-native';

import { Animate } from '../services';
import Colors from '../constants/colors';
import { TextDefault, Icon } from '../helpers';

const widthScreen = Dimensions.get("screen").width;

export const Select = ({ value = "", changeValue = false, options = [], zIndex = 2, initialValue, iconName = "", iconLib = "" }) => {

    const [open, setOpen] = React.useState(false);
    const heightSelect = React.useRef(new Animated.Value(40)).current;

    const pressSelect = () => {
        Keyboard.dismiss()
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
        shadowOffset: { width: 0, height: 3 },
        shadowColor: Colors.BACKGROUND,
        backgroundColor: Colors.BACKGROUND_LIGHT
    },
    containerHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    containerText: {
        flex: 1,
        height: 40,
        marginRight:5,
        justifyContent: "center",
    },
    txtSelectItem: {
        fontSize: 18,
        color: Colors.TEXT_PRIMARY,
    },
    initialValue: {
        fontSize: 18,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    icon: {
        marginRight: 15,
    }
})
