import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export default StyleSheet.create({
    safeArea: {
        flex: 0,
        backgroundColor: Colors.background
    },
    touchableGoBack: {
        width: 75,
        height: 50,
        paddingHorizontal: 11,
        justifyContent: "center",
    },
});