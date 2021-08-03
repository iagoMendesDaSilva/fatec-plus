import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
    containerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    txtTitle: {
        fontSize: 45,
        color: Colors.TEXT_PRIMARY,
        marginLeft: 15,
        marginTop: 40,
        fontWeight: "bold",
    },
    button: {
        marginVertical: 15,
    },
});
