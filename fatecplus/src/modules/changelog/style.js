import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
    containerItem: {
        marginBottom: 5,
    },
    containerTxtVersion: {
        height: 50,
        width:"100%",
        paddingLeft: 40,
        justifyContent: "center",
    },
    txtVersion: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.TEXT_PRIMARY,
    },
    txtType: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: "bold",
    },
    txtTitle: {
        fontSize: 18,
        color: Colors.TEXT_PRIMARY,
    },
    containerTxtMessage: {
        width: "95%",
    },
    txtMessage: {
        fontSize: 16,
        textAlign: "justify",
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    containerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    circle: {
        width: 5,
        height: 5,
        marginRight: 7,
        borderRadius: 5,
        backgroundColor: Colors.PRIMARY,
    },
    conatinerLaunch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    txtLaunch: {
        fontSize: 18,
        color: Colors.PRIMARY,
    }
});
