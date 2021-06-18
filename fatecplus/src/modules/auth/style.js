import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.background,
    },
    txtWelcome: {
        fontSize: 45,
        color: "white",
        fontWeight: "bold",
    },
    txtForgetPassword: {
        color: "white",
        fontSize: 18,
    },
    containerInput: {
        height: 170,
        marginBottom: 50,
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    txtCreateAccount: {
        fontSize: 18,
        color: Colors.link,
    },
    containerContent: {
        flexGrow:1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        marginBottom: 15,
    },
});