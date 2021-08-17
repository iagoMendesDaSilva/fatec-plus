import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
    containerContent: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",

    },
    containerSwitch: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: "center",
    },
    containerTxtSwitch: {
        marginLeft: 10,
    },
    txtTitle:{
        fontSize:20,
        marginTop:10,
        marginLeft: 10,
        color:Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
});