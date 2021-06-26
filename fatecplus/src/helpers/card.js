import React from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';

import { Animate } from '../services';
import { TextDefault } from '../helpers';
import Colors from '../constants/colors';

const widthScreen = Dimensions.get("screen").width;

export const Card = ({ title, description, source, onPress, selected = false }) => {

    const [open, setOpen] = React.useState(false);
    const heightCard = React.useRef(new Animated.Value(120)).current;

    const showDescription = () => {
        Animate.timming(heightCard, open ? 120 : 220).start()
        setOpen(!open)
    }

    return (
        <Animated.View
            style={{ ...styles.containerAll, height: heightCard, opacity: selected ? .5 : 1 }}>
            <TouchableOpacity
                onPress={() => onPress && onPress()}
                style={styles.containerContent}>
                <Image
                    source={source}
                    style={styles.image}
                    resizeMode={"contain"} />
                <View>
                    <TextDefault
                        children={title}
                        styleText={styles.textTitle} />
                    <TextDefault
                        children={"Saiba mais."}
                        onPress={showDescription}
                        styleText={styles.txtKnowMore} />
                </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TextDefault
                lines={4}
                children={description}
                style={styles.containerDescription}
                styleText={styles.textDescription} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        borderRadius: 20,
        marginVertical: 10,
        overflow: "hidden",
        width: widthScreen * .9,
        backgroundColor: Colors.background_light,
    },
    containerContent: {
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    textTitle: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
    },
    txtKnowMore: {
        fontSize: 18,
        color: Colors.primary,
    },
    containerDescription: {
        width: "90%",
        marginLeft: 10,
    },
    textDescription: {
        fontSize: 16,
        textAlign: "justify",
        color: "rgba(255,255,255,.5)",
    },
    line: {
        height: .5,
        width: "90%",
        marginLeft: 10,
        marginVertical: 5,
        backgroundColor: "rgba(255,255,255,.5)",
    },
    image: {
        height: 100,
        width: "30%",
        marginRight: 10,
    },
});