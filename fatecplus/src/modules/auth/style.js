import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
    txtWelcome: {
        fontSize: 45,
        color: "white",
        paddingLeft:15,
        paddingTop:15,
        fontWeight: "bold",
    },
    txtForgetPassword: {
        color: "white",
        fontSize: 18,
    },
    containerInput: {
        marginBottom: 50,
        alignItems: "flex-end",
    },
    txtCreateAccount: {
        fontSize: 18,
        color: Colors.primary,
    },
    containerContent: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
});