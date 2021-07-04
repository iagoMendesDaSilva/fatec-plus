import React from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, View } from 'react-native';

import { TextDefault } from '../../helpers';
import Colors from '../../constants/colors';

export const ListItems = (props) => {

    const params = props.route.params;

    const getItem = (index, item, type) =>
        < View
            key={String(index)}
            style={styles.containerItem} >
            {switchRenderItem(type, item)}
        </View >

    const switchRenderItem = (type, item) => {
        switch (type) {
            case  "Networks":
                return renderItemNetwork(item)
        }
    }

    const renderItemNetwork = item =>
        <View>
            <TextDefault children={item.name} />
            <TextDefault children={item.url} />
        </View>

    return (
        <KeyboardAvoidingView
            style={styles.containerAll}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <View style={styles.containerContent}>
                <TextDefault
                    children={params.type}
                    styleText={styles.txtTitle} />
                <FlatList
                    data={params.data}
                    style={styles.containerList}
                    keyExtractor={(_, index) => String(index)}
                    renderItem={({ item, index }) => getItem(index, item, params.type)} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'black',
    },
    containerContent: {
        flexGrow: 1,
        marginTop: 50,
        backgroundColor: 'black',
    },
    containerList: {
        paddingBottom: 10,
    },
    txtTitle: {
        fontSize: 30,
        color: "rgba(255,255,255,.5)",
    },
    containerItem: {
        paddingTop: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.background
    }
});
