import Colors from '~colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    map: {
        flex: 1,
    },
    txtAddress: {
        fontSize: 16,
        textAlign: 'center',
        color: Colors.TEXT_PRIMARY,
    },
    containerTxtAddress: {
        marginTop: 5,
        marginHorizontal: 10,
    },
    containerAddress: {
        zIndex: 2,
        bottom: 0,
        width: "100%",
        paddingVertical: 15,
        alignItems: "center",
        position: "absolute",
        justifyContent: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    button: {
        marginTop: 25,
        backgroundColor: Colors.BACKGROUND_LIGHT_PLUS
    },
    hitSlop: {
        left: 60,
        top: 40,
        right: 60,
        bottom: 40,
    },
    currentLocation: {
        top: 17,
        zIndex: 2,
        right: "5%",
        position: "absolute",
    },
});
