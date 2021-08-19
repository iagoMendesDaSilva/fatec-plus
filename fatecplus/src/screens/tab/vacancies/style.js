import Colors from '~colors';
import { Dimensions, StyleSheet } from 'react-native';

const widthScreen = Dimensions.get("screen").width;

export default StyleSheet.create({
    conatinerAll: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    conatinerItem: {
        height: 90,
        marginVertical: 8,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        width: widthScreen * .95,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    containerEmpty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    itemShimmer: {
        height: 90,
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
        flex: 1,
        marginLeft: 12
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
});
