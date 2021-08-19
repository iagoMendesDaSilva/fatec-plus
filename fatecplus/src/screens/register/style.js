import  Colors from '~colors'
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    txtTitle: {
        fontSize: 45,
        marginLeft: 15,
        marginTop: 40,
        fontWeight: "bold",
        color: Colors.TEXT_PRIMARY,
    },
    button: {
        marginVertical: 15,
    },
});
