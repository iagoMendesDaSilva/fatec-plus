import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';

const widthScreen = Dimensions.get("screen").width;

export default StyleSheet.create({
    conatinerAll: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    conatinerItem: {
        height:90,
        marginVertical: 8,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        width: widthScreen * .95,
        backgroundColor: Colors.background_light,
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
    containerText: {
        flex:1,
        marginLeft:12
    },
    txtTitle: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
    },
    txtSubtitle: {
        fontSize: 18,
        color: "rgba(255,255,255,.5)",
    },
});