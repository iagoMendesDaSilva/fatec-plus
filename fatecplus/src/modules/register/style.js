import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.background,
    },
    containerScroll: {
        flexGrow: 1,
    },
    containerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    txtTitle: {
        fontSize: 45,
        marginTop: 35,
        color: "white",
        fontWeight: "bold",
    },
    button: {
        marginVertical: 15,
    },
});