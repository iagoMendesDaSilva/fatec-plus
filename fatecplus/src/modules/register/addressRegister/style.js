import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';

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
        color: Colors.TEXT_PRIMARY,
        textAlign: 'center',
    },
    containerTxtAddress: {
        marginTop: 5,
        marginHorizontal:10,
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
        backgroundColor: "rgba(255,255,255,.1)"
    },
    hitSlop: {
        left: 60,
        top: 40,
        right: 60,
        bottom: 40,
    },
});
