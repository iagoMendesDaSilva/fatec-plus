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
    },
    containerPressable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
    },
    containerInputs: {
        height: 275,
        marginVertical: 30,
        justifyContent: "space-between"
    },
});