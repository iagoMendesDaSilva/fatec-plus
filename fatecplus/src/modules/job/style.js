import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    containerHeader: {
        marginLeft: 25,
        marginTop: 25,
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
        paddingBottom: 15,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    txtTopic: {
        fontSize: 20,
        paddingTop: 15,
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
        color: Colors.TEXT_PRIMARY,
        textAlign: "justify",
    },
    txtTitle: {
        fontSize: 18,
        color: Colors.TEXT_PRIMARY,
        paddingTop: 5,
    },
    txtSubtitle: {
        fontSize: 16,
        textAlign: "justify",
        color: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
    txtSubtitleLink: {
        fontSize: 16,
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
