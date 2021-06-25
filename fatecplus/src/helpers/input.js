import React from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { Icon } from './icon';

const widthScreen = Dimensions.get("screen").width;

export const Input = ({ text, type, capitalize, onchange, placeholder, defaultValue, size = widthScreen * .9, password, iconName, iconColor, iconLib, changeVisibility, showPassword, maxLength }) => {

    return (
        <View style={{ ...styles.containerAll, width: size }}>
            {iconName &&
                <Icon
                    lib={iconLib}
                    style={styles.icon}
                    color={iconColor}
                    name={iconName} />}
            <TextInput
                value={text}
                autoCorrect={false}
                keyboardType={type}
                allowFontScaling={false}
                maxLength={maxLength}
                onChangeText={onchange}
                placeholder={placeholder}
                defaultValue={defaultValue}
                placeholderTextColor="rgba(255,255,255,.5)"
                autoCapitalize={capitalize ? capitalize : 'none'}
                secureTextEntry={password ? !showPassword : false}
                style={{ ...styles.textInput, paddingRight: password ? 15 : 0, }}
            />
            {password && changeVisibility &&
                <TouchableOpacity onPress={() => changeVisibility && changeVisibility()}>
                    <Icon
                        lib={"FontAwesome5"}
                        name={showPassword ? "eye" : "eye-slash"}
                        color={showPassword ? "white" : "rgba(255,255,255,.5)"} />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        justifyContent: "space-between",
    },
    textInput: {
        flex: 1,
        fontSize: 20,
        color: "white",
    },
    icon: {
        marginRight: 10,
    },
})