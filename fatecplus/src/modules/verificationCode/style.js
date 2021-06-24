import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    containerContent: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    txtLogo: {
        fontSize: 60,
        color: Colors.primary,
        fontFamily: "Nunito-SemiBold",
    },
    logo: {
        marginBottom: 25,
    },
    containerInputsCodes: {
        width:300,
        marginTop: 25,
        flexDirection: "row",
        justifyContent:"space-between",
    },
    button: {
        marginTop: 50,
        marginBottom: 15,
    },
    txtInsertCode: {
        fontSize: 18,
        color: "rgba(255,255,255,.5)",
    },
    txtResendEmail: {
        fontSize: 18,
        color: Colors.link,
    },
    textInput: {
        fontSize: 20,
        padding: 10,
        color: "white",
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: Colors.background_light,
    },
});