import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';

import Colors from '../constants/colors';
import Strings from '../constants/strings';
import { TextDefault, Icon } from '../helpers';
import { Animate } from '../services';

export const OptionMenu = ({ options = [] }) => {

    const [open, setOpen] = React.useState(false);
    const animationOption = React.useRef(new Animated.Value(0)).current;

    const optionsHeight = options.length * 35;

    const pressMenu = () => {
        Animate.timming(animationOption, !open).start()
        setOpen(!open)
    }

    const pressItem=item=>{
        pressMenu()
        item.onPress && item.onPress()
    }

    const translateX = animationOption.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
        extrapolate: "clamp",
    })

    const translateY = animationOption.interpolate({
        inputRange: [0, 1],
        outputRange: [-optionsHeight, 0],
        extrapolate: "clamp",
    })

    const renderItem = (item, index) =>
        <TouchableOpacity
            onPress={()=>pressItem(item)}
            style={styles.containerItem}>
            <TextDefault
                children={item.title} />
        </TouchableOpacity>

    return (
        <View style={styles.containerAll}>
            <View style={{ ...styles.containerOptionsOverflow, height: optionsHeight }}>
                <Animated.View style={{ transform: [{ translateX }, { translateY }] }}>
                    <FlatList
                        data={options}
                        scrollEnabled={false}
                        keyExtractor={(_, index) => String(index)}
                        renderItem={({ item }) => renderItem(item)}
                        contentContainerStyle={styles.containerOptions}
                    />
                </Animated.View>
            </View>
            <TouchableOpacity
                onPress={pressMenu}>
                <Icon
                    color={Colors.primary}
                    lib={"SimpleLineIcons"}
                    name={"options-vertical"} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        top: 15,
        right: 25,
        zIndex: 2,
        flexDirection: "row",
        position: "absolute",
    },
    containerOptions: {
        width: 100,
        paddingLeft: 12,
        borderRadius: 10,
        borderTopRightRadius: 0,
        backgroundColor: Colors.background_light,
    },
    containerOptionsOverflow: {
        width: 100,
        overflow: "hidden",
    },
    containerItem: {
        height: 35,
        justifyContent: "center"
    }
})