import Colors from '~colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.BACKGROUND,
    },
    containerLogo: {
        alignItems: "center",
        flexDirection: "row",
    },
    txtLogo: {
        fontSize: 60,
        color: Colors.PRIMARY,
    },
    iconLogo: {
        marginTop:10,
    },
    containerLogo: {
        alignItems: "center",
        flexDirection: "row",
    },
    txtLogo: {
        fontSize: 60,
        color: Colors.PRIMARY,
    },
    containerIcon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginTop: 10,
        overflow: "hidden",
    },
    iconPlusHorizontal: {
        top: 15,
        height: 5,
        zIndex: 2,
        width: 35,
        borderRadius: 3,
        position: "absolute",
        backgroundColor: Colors.PRIMARY,
    },
    iconPlusVertical: {
        left: 15,
        width: 5,
        zIndex: 2,
        height: 35,
        borderRadius: 3,
        position: "absolute",
        backgroundColor: Colors.PRIMARY,
    },
});
