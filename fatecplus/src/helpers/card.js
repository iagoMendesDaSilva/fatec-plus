import React from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';

import { Animate } from '../services';
import { TextDefault } from '../helpers';
import Colors from '../constants/colors';

const WIDTH = Dimensions.get("screen").width;

export const Card = ({ title, description, source, onPress, }) => {

    const [open, setOpen] = React.useState(false);
    const heightCard = React.useRef(new Animated.Value(120)).current;

    const showDescription = () => {
        Animate.timming(heightCard, open ? 120 : 220).start()
        setOpen(!open)
    }

    const pressCard = () => {
        open && showDescription()
        onPress()
    }

    return (
        <Animated.View
            style={{ ...styles.containerAll, height: heightCard }}>
            <TouchableOpacity
                onPress={pressCard}
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
        width: WIDTH * .9,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    containerContent: {
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    textTitle: {
        fontSize: 25,
        color: Colors.TEXT_PRIMARY,
        fontWeight: "bold",
    },
    txtKnowMore: {
        fontSize: 18,
        color: Colors.PRIMARY,
    },
    containerDescription: {
        width: "90%",
        marginLeft: 10,
    },
    textDescription: {
        fontSize: 16,
        textAlign: "justify",
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    line: {
        height: .5,
        width: "90%",
        marginLeft: 10,
        marginVertical: 5,
        backgroundColor: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    image: {
        height: 100,
        width: "30%",
        marginRight: 10,
    },
});
