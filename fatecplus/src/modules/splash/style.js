import Colors from '../../constants/colors';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background,
    },
    containerLogo: {
        alignItems: "center",
        flexDirection: "row",
    },
    txtLogo: {
        fontSize: 60,
        color: Colors.primary,
    },
    iconLogo: {
        marginTop:10,
    },
});