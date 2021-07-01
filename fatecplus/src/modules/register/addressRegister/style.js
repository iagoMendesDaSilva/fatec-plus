import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.background,
    },
    containerScroll: {
        flexGrow: 1,
        alignItems:"center",
        justifyContent:"center",
    },
    txtLogo: {
        fontSize: 60,
        color: Colors.primary,
        fontFamily: "Nunito-SemiBold",
    },
    logo: {
        marginBottom: 15,
    },
});