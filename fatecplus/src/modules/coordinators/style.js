import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const widthScreen = Dimensions.get("screen").width;

export default StyleSheet.create({
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
        marginTop:45,
        paddingBottom: 8,
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
        fontWeight: "bold",
        color: Colors.TEXT_PRIMARY,
    },
    txtSubtitle: {
        fontSize: 18,
    },
});
