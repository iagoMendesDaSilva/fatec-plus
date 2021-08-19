import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Colors from '~colors';
import { TextDefault, Icon } from '~components';

export const ImagePicker = ({ image = false, getImage, disabled }) => {

    return (
        <View>
            <View style={styles.photo} >
                {
                    Boolean(image)
                        ?
                        <Image
                            style={styles.image}
                            resizeMode={"cover"}
                            source={{ uri: `${image}?time=${new Date()}`, }} />
                        :
                        <Icon
                            size={40}
                            name={"photo"}
                            style={styles.icon}
                            lib={"MaterialIcons"} />
                }

            </View>
            {
            !disabled &&
                <TextDefault
                    children={"+"}
                    styleText={styles.txtPlus}
                    onPress={() => getImage()}
                    style={styles.containerUpload} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    photo: {
        width: 125,
        height: 125,
        borderWidth: 2,
        overflow: "hidden",
        borderRadius: 125,
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.BACKGROUND,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    containerUpload: {
        left: 75,
        top: 75,
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        alignItems: "center",
        position: "absolute",
        justifyContent: "center",
        borderColor: Colors.BACKGROUND,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    txtPlus: {
        color: Colors.TEXT_PRIMARY,
        fontSize: 20,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    icon: {
        opacity: .5,
    },
});
