import Colors from '~colors';
import { Dimensions, StyleSheet } from 'react-native';

const widthScreen = Dimensions.get("screen").width;

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    containerContent: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    txtLogo: {
        fontSize: 60,
        color: Colors.PRIMARY,
        fontFamily: "Nunito-SemiBold",
    },
    logo: {
        marginBottom: 25,
    },
    containerInputsCodes: {
        marginTop: 15,
        flexDirection: "row",
        width:widthScreen*.75,
        justifyContent:"space-between",
    },
    button: {
        marginTop: 50,
    },
    txtInsertCode: {
        fontSize: 18,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    txtResendEmail: {
        fontSize: 18,
        color: Colors.PRIMARY,
    },
    textInput: {
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        color: Colors.TEXT_PRIMARY,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
});
