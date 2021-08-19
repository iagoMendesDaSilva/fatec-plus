import Colors from '~colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    containerHeader: {
        marginLeft: 25,
        marginTop: 25,
    },
    separator:{
        height:1,
        marginVertical:10,
        backgroundColor:Colors.BACKGROUND,
    },
    conatinerText: {
        marginLeft: 25,
    },
    txtName: {
        fontSize: 22,
        color: Colors.TEXT_PRIMARY,
        fontWeight: "bold",
    },
    txtAddress: {
        fontSize: 20,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    txtCompany: {
        fontSize: 20,
        color: Colors.TEXT_PRIMARY,
    },
    containerButtons: {
        marginVertical: 5,
        flexDirection: "row",
    },
    button: {
        marginRight: 10,
    },
    containerContent: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    txtTopic: {
        fontSize: 20,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    txtTopicLine: {
        fontSize: 20,
        marginTop: 5,
        paddingTop: 5,
        borderTopWidth: .5,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
        borderTopColor: Colors.BACKGROUND,
    },
    txtText: {
        fontSize: 18,
        textAlign: "justify",
        color: Colors.TEXT_PRIMARY,
    },
    txtTextHeader: {
        fontSize: 18,
        marginVertical:2,
        textAlign: "justify",
        color: Colors.TEXT_PRIMARY,
    },
    txtTitle: {
        fontSize: 18,
        paddingTop: 5,
        color: Colors.TEXT_PRIMARY,
    },
    txtSubtitle: {
        fontSize: 16,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    txtSubtitleLink: {
        fontSize: 16,
        color: Colors.PRIMARY,
    },
    txtType: {
        fontSize: 18,
        marginRight: 10,
        color: Colors.PRIMARY,
    },
    txtSubtitleRow: {
        fontSize: 16,
        marginRight: 8,
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    containerRow: {
        alignItems: "center",
        flexDirection: "row",
    },
    containerContact: {
        zIndex: 2,
        height: 200,
        padding: 15,
        width: "100%",
        position: "absolute",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.BACKGROUND_LIGHT_PLUS,
    },
    containerContactHeader: {
        paddingBottom: 10,
        flexDirection: "row",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        borderBottomColor: Colors.BACKGROUND,
    },
    containerContactContent: {
        flex: 1,
        justifyContent: "center",
    },
    hitSlop: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
    }
});
