
import React from 'react';
import { StyleSheet, View, Animated, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import Colors from '~colors';
import { Animate } from '~services';
import { TextDefault } from '~components';

const widthScreen = Dimensions.get("screen").width;

export const ContractedList = ({ title = "", items = [], keyArray = false, onPress }) => {
    const [open, setOpen] = React.useState(false);
    const heightList = React.useRef(new Animated.Value(40)).current;
    const heightDivision = React.useRef(new Animated.Value(30)).current;

    const pressSelect = () => {
        Animate.timming(heightList, open ? 40 : 40 * (items.length > 2 ? 3 : (items.length + 1)), 500).start();
        Animate.timming(heightDivision, open ? 30 : 0, 500).start();
        setOpen(!open)
    }

    const addItem = () => {
        open && pressSelect()
        onPress()
    }

    const editItem = index => {
        open && pressSelect()
        onPress(index)
    }

    const getChildren = index =>
        keyArray ? items[index][keyArray] : items[index]


    return (
        <Animated.View style={{ ...styles.containerContent, height: heightList }} >
            <TouchableOpacity
                onPress={pressSelect}
                disabled={items.length <= 0}
                style={styles.containerText}>
                <TextDefault
                    children={title}
                    styleText={styles.txtTitle}
                    style={styles.containerTitle} />
                <Animated.View style={{ ...styles.division, height: heightDivision }} />
                <TextDefault
                    children={"+"}
                    onPress={addItem}
                    styleText={styles.txtItem}
                    style={styles.containerPlus} />
            </TouchableOpacity >
            <ScrollView nestedScrollEnabled>
                {
                    items.map((item, index) =>
                            <TextDefault
                                disabled={!open}
                                key={String(index)}
                                styleText={styles.txtItem}
                                style={styles.containerText}
                                children={getChildren(index)}
                                onPress={() => editItem(index)} />
                    )
                }
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    containerContent: {
        borderRadius: 30,
        marginVertical: 10,
        overflow: "hidden",
        width: widthScreen * .9,
        backgroundColor: Colors.BACKGROUND_LIGHT
    },
    containerText: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    containerTitle: {
        flex: 1,
    },
    containerPlus: {
        height: "100%",
        justifyContent: "center",
    },
    txtItem: {
        fontSize: 18,
        marginHorizontal: 20,
        color: Colors.TEXT_PRIMARY_LIGHT,
    },
    txtTitle: {
        fontSize: 18,
        marginHorizontal: 20,
        color: Colors.TEXT_PRIMARY,
    },
    division: {
        width: .5,
        backgroundColor: Colors.TEXT_PRIMARY_LIGHT_PLUS,
    },
})
