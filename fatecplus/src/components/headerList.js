import React from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Animated, Keyboard } from 'react-native';

import Colors from '~colors';
import { Animate } from '~services';
import { Icon, TextDefault } from '~components';

const widthScreen = Dimensions.get("screen").width;

export const HeaderList = ({ title, onchange, placeholder, onClose, text = "" }) => {

    const refInput = React.createRef(null);

    const [open, setOpen] = React.useState(false);
    const searchWidth = React.useRef(new Animated.Value(widthScreen)).current;

    const pressSearch = () => {
        Animate.timming(searchWidth, open ? widthScreen : 0, 200).start()
        !open ? refInput.current.focus() : Keyboard.dismiss()
        open && onClose()
        setOpen(!open)
    }

    return (
        <View style={styles.containerAll}>
            <View style={styles.containerContent}>
                <View style={styles.containerSearch}>
                    <TextDefault
                        children={title}
                        styleText={styles.txtTitle} />
                </View>
                <TouchableOpacity
                    style={styles.icon}
                    hitSlop={styles.hitSlop}
                    onPress={pressSearch} >
                    <Icon
                        lib={"Octicons"}
                        name={"search"} />
                </TouchableOpacity>
            </View>

            <Animated.View style={{ ...styles.containerContent, transform: [{ translateX: searchWidth }] }}>
                <View style={styles.containerSearch}>
                    <TouchableOpacity
                        onPress={pressSearch}
                        style={styles.iconArrow}
                        hitSlop={styles.hitSlopArrow}>
                        <Icon
                            size={25}
                            name={"angle-left"} />
                    </TouchableOpacity>
                    <TextInput
                        value={text}
                        ref={refInput}
                        autoCorrect={false}
                        style={styles.textInput}
                        allowFontScaling={false}
                        placeholder={placeholder}
                        onChangeText={onchange}
                        placeholderTextColor={Colors.TEXT_PRIMARY_LIGHT_PLUS} />
                    {
                        Boolean(text) &&
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.iconArrow}
                            hitSlop={styles.hitSlopArrow}>
                            <Icon
                                name={"close"}
                                lib={"antdesign"}
                                color={Colors.TEXT_PRIMARY_LIGHT_PLUS} />
                        </TouchableOpacity>
                    }
                </View>

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        height: 70,
        width: widthScreen,
    },
    containerContent: {
        position: "absolute",
        paddingVertical: 10,
        width: widthScreen,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    textInput: {
        flex: 1,
        fontSize: 20,
        color: Colors.TEXT_PRIMARY,
    },
    icon: {
        marginRight: 20,
    },
    iconArrow: {
        marginRight: 10,
    },
    containerSearch: {
        flex: 1,
        height: 50,
        marginLeft: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    txtTitle: {
        fontSize: 30,
        marginLeft: 20,
        color: Colors.TEXT_PRIMARY,
        fontWeight: "bold",
    },
    hitSlop: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    },
    hitSlopArrow: {
        top: 10,
        left: 10,
        right: 20,
        bottom: 10,
    },
})
