import React from 'react';
import { Animated } from 'react-native';
import IconZocial from 'react-native-vector-icons/Zocial';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '~colors';

export const Icon = ({ name="question", size = 20, color = Colors.TEXT_PRIMARY, style, lib = 'fontawesome' }) => {

    const getIcon = () => {
        switch (lib.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()) {
            case "zocial":
                return <IconZocial name={name} size={size} color={color} />
            case "entypo":
                return <IconEntypo name={name} size={size} color={color} />
            case "feather":
                return <IconFeather name={name} size={size} color={color} />
            case "fontisto":
                return <IconFontisto name={name} size={size} color={color} />
            case "ionicons":
                return <IconIonicons name={name} size={size} color={color} />
            case "evilicons":
                return <IconEvilIcons name={name} size={size} color={color} />
            case "octicons":
                return <IconOcticons name={name} size={size} color={color} />
            case "antdesign":
                return <IconAntDesign name={name} size={size} color={color} />
            case "foundation":
                return <IconFoundation name={name} size={size} color={color} />
            case "materialicons":
                return <IconMaterialIcons name={name} size={size} color={color} />
            case "fontawesome":
                return <IconFontAwesome name={name} size={size} color={color} />
            case "fontawesome5":
                return <IconFontAwesome5 name={name} size={size} color={color} />
            case "simplelineicons":
                return <IconSimpleLineIcons name={name} size={size} color={color} />
            case "materialcommunityicons":
                return <IconMaterialCommunityIcons name={name} size={size} color={color} />
            default:
                return <IconFontAwesome name={name} size={size} color={color} />
        }
    }

    return (
        <Animated.View style={style}>
            {getIcon()}
        </Animated.View>
    );
}
