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
        marginBottom: 15,
    },
    button: {
        marginTop: 40,
    },
    txtAlreadyCode: {
        fontSize: 18,
        color: Colors.link,
    },
});