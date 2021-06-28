import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { TextDefault, Icon } from '../helpers';
import Colors from '../constants/colors';

export const ImagePicker = ({ image = false, getImage }) => {

    return (
        <View>
            <View style={styles.photo} >
                {
                    Boolean(image)
                        ?
                        <Image
                            style={styles.image}
                            resizeMode={"cover"}
                            source={{ uri: image }} />
                        :
                        <Icon
                            size={40}
                            name={"photo"}
                            style={styles.icon}
                            lib={"MaterialIcons"} />
                }

            </View>
            <TextDefault
                children={"+"}
                styleText={styles.txtPlus}
                onPress={() => getImage()}
                style={styles.containerUpload} />
        </View>
    );
}

const styles = StyleSheet.create({
    photo: {
        width: 125,
        height: 125,
        overflow: "hidden",
        borderRadius: 125,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background_light
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
        borderColor: Colors.background,
        backgroundColor: Colors.background_light,
    },
    txtPlus: {
        color: "white",
        fontSize: 20,
    },
    image: {
        width: 150,
        height: 150,
    },
    icon: {
        opacity: .5,
    },
});