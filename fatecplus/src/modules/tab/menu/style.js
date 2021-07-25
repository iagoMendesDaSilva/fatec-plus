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
        color: "white",
        fontWeight: "bold",
    },
    txtAddress: {
        fontSize: 20,
        color: "white",
    },
    txtName: {
        fontSize: 20,
        color: "rgba(255,255,255,.5)",
    },
    containerInfo: {
        flex: 1,
        marginTop: 25,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.background_light,
    },
    txtSection: {
        fontSize: 22,
        marginTop:12,
        color: "rgba(255,255,255,.5)",
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
        color: "white",
        paddingLeft: 10,
    },
    txtVersion:{
        fontSize: 18,
        color: "rgba(255,255,255,.5)",
    },
    txtDeleteAccountant:{
        fontSize: 18,
        paddingLeft: 10,
        color: Colors.error,
    },
});