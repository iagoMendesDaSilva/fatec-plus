import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export default StyleSheet.create({
    safeArea: {
        flex: 0,
    },
    touchableGoBack: {
        width: 75,
        height: 50,
        paddingHorizontal: 11,
        justifyContent: "center",
    },
    tabBar: {
        height: 60,
        borderTopWidth:0,
        backgroundColor:Colors.BACKGROUND_LIGHT,
    },
    txtTabBar: {
        fontSize: 12,
        color: Colors.TEXT_PRIMARY,
        paddingBottom: 5,
    },
});
