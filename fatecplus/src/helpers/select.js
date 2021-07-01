
import React from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';

import { Animate } from '../services';
import { TextDefault } from '../helpers';
import Colors from '../constants/colors';

const widthScreen = Dimensions.get("screen").width;

export const Select = ({ value = "", changeValue = false, options = [] }) => {

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
        <Animated.View style={{ ...styles.containerSelect, height: heightSelect }} >
            <TextDefault
                children={value}
                onPress={pressSelect}
                style={styles.containerText}
                styleText={styles.txtSelectItem} />
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
    );
}

const styles = StyleSheet.create({
    containerSelect: {
        zIndex:2,
        borderRadius: 30,
        position:"absolute",
        overflow: "hidden",
        width: widthScreen * .9,
        backgroundColor: Colors.background_light
    },
    containerText: {
        height: 40,
        justifyContent: "center",
    },
    txtSelectItem: {
        fontSize: 18,
        color: "white",
        marginHorizontal: 20,
    },
})