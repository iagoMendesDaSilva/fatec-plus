import React from 'react';
import TextInputMask from 'react-native-text-input-mask';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import Colors from '~colors';
import { Icon } from '~components';

const widthScreen = Dimensions.get("screen").width;

export const Input = ({ text, type, capitalize, onchange, placeholder, defaultValue, size = widthScreen * .9, password, iconName, iconColor, iconLib, changeVisibility, showPassword, maxLength = 50, mask }) => {

    return (
        <View style={{ ...styles.containerAll, width: size }}>
            {iconName &&
                <Icon
                    lib={iconLib}
                    style={styles.icon}
                    color={iconColor}
                    name={iconName} />}
            <TextInputMask
                value={text}
                mask={mask}
                autoCorrect={false}
                keyboardType={type}
                allowFontScaling={false}
                onChangeText={onchange}
                placeholder={placeholder}
                defaultValue={defaultValue}
                maxLength={maxLength ? maxLength : null}
                autoCapitalize={capitalize ? capitalize : 'none'}
                secureTextEntry={password ? !showPassword : false}
                placeholderTextColor={Colors.TEXT_PRIMARY_LIGHT_PLUS}
                style={{ ...styles.textInput, paddingRight: password ? 15 : 0, }}
                onChangeText={(formatted, extracted) => onchange(formatted)}
            />
            {password && changeVisibility &&
                <TouchableOpacity onPress={() => changeVisibility && changeVisibility()}>
                    <Icon
                        lib={"FontAwesome5"}
                        name={showPassword ? "eye" : "eye-slash"}
                        color={showPassword ? Colors.TEXT_PRIMARY : Colors.TEXT_PRIMARY_LIGHT_PLUS} />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.TEXT_PRIMARY,
        justifyContent: "space-between",
    },
    textInput: {
        flex: 1,
        fontSize: 20,
        color: Colors.TEXT_PRIMARY,
    },
    icon: {
        marginRight: 10,
    },
})
