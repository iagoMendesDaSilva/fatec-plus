import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.background,
    },
    containerContent: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerInputs: {
        marginTop: 30,
        height: 130,
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        marginTop: 50,
    },
});