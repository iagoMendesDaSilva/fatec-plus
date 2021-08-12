import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';

export default StyleSheet.create({
    containerHeader: {
        marginTop: 25,
        marginLeft: 25,
        flexDirection: "row",
        alignItems: "center",
    },
    containerTextHeader: {
        flex: 1,
        paddingHorizontal: 25,
    },
    txtUsername: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.TEXT_PRIMARY,
    },
    txtAddress: {
        fontSize: 20,
        color: Colors.TEXT_PRIMARY,
    },
    txtName: {
        fontSize: 20,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    containerInfo: {
        flex: 1,
        marginTop: 25,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    txtSection: {
        fontSize: 22,
        marginTop:12,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    containerItem: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
    },
    containerTxtItem: {
        flex: 1,
    },
    txtItem: {
        fontSize: 18,
        paddingLeft: 10,
        color: Colors.TEXT_PRIMARY,
    },
    txtVersion:{
        fontSize: 18,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    txtDeleteAccountant:{
        fontSize: 18,
        paddingLeft: 10,
        color: Colors.ERROR,
    },
});
