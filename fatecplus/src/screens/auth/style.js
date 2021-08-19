import Colors from '~colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    txtWelcome: {
        fontSize: 45,
        color: Colors.TEXT_PRIMARY,
        paddingLeft:15,
        paddingTop:15,
        fontWeight: "bold",
    },
    txtForgetPassword: {
        color: Colors.TEXT_PRIMARY,
        fontSize: 18,
    },
    containerInput: {
        marginBottom: 50,
        alignItems: "flex-end",
    },
    txtCreateAccount: {
        fontSize: 18,
        color: Colors.PRIMARY,
    },
    containerContent: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
});
