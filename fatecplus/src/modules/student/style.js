import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: Colors.background,
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
        color: "white",
        fontWeight: "bold",
    },
    txtAddress: {
        fontSize: 20,
        color: "rgba(255,255,255,.5)",
    },
    txtCourse: {
        fontSize: 20,
        color: "white",
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
        backgroundColor: Colors.background_light,
    },
    txtTopic: {
        fontSize: 20,
        paddingTop: 15,
        color: "rgba(255,255,255,.5)",
    },
    txtText: {
        fontSize: 18,
        color: "white",
        textAlign: "justify",
    },
    containerItem: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.background,
    },
    txtTitle: {
        fontSize: 18,
        color: "white",
        paddingTop: 5,
    },
    txtSubtitle: {
        fontSize: 16,
        color: "rgba(255,255,255,.5)",
    },
    txtSubtitleLink: {
        fontSize: 16,
        color: Colors.primary,
    },
    txtSubtitleRow: {
        fontSize: 16,
        marginRight: 8,
        color: "rgba(255,255,255,.5)",
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
        backgroundColor: Colors.background_medium,
    },
    containerContactHeader: {
        paddingBottom: 10,
        flexDirection: "row",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        borderBottomColor: Colors.background,
    },
    containerContactContent: {
        flex: 1,
        justifyContent:"center",
    },
    hitSlop: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
    }
});