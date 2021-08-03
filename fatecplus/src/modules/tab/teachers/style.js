import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';

const widthScreen = Dimensions.get("screen").width;

export default StyleSheet.create({
    conatinerAll: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    conatinerItem: {
        height:90,
        marginVertical: 8,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        width: widthScreen * .95,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    itemShimmer: {
        height:90,
        marginVertical: 8,
        borderRadius: 15,
        width: widthScreen * .95,
    },
    list: {
        flexGrow: 1,
        paddingVertical: 8,
        alignItems: "center",
    },
    img: {
        width: 60,
        height: 60,
        marginRight: 12,
        borderRadius: 15,
    },
    containerText: {
        flex:1,
    },
    txtTitle: {
        fontSize: 22,
        color: Colors.TEXT_PRIMARY,
        fontWeight: "bold",
    },
    txtSubtitle: {
        fontSize: 18,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    txtSubtitlePrimary:{
        fontSize: 18,
        color: Colors.PRIMARY,
    },
});
