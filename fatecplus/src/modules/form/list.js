import React from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, View, TouchableOpacity } from 'react-native';

import { TextDefault } from '../../helpers';
import Colors from '../../constants/colors';

export const ListItems = (props) => {

    const params = props.route.params;

    const pressItem = (index, type) =>
        props.navigation.navigate(type.slice(0, -1), { data: params.data[index], index });

    const getItem = (index, item, type) =>
        < TouchableOpacity
            onPress={() => pressItem(index, type)}
            key={String(index)}
            style={styles.containerItem} >
            {switchRenderItem(type, item)}
        </TouchableOpacity >

    const switchRenderItem = (type, item) => {
        switch (type) {
            case "Networks":
                return renderItemNetwork(item)
            case "Languages":
                return renderItemLanguage(item)
            case "Projects":
                return renderItemProject(item)
            case "Formations":
                return renderItemFormation(item)
            case "Experiences":
                return renderItemExperience(item)
            default:
                return <></>
        }
    }

    const renderItemNetwork = item =>
        <View>
            <TextDefault
                children={item.name}
                styleText={styles.txtTitle} />
            <TextDefault
                children={item.url}
                styleText={styles.txtSubtitle} />
        </View>

    const renderItemLanguage = item =>
        <View>
            <TextDefault
                styleText={styles.txtTitle}
                children={item.language} />
            <TextDefault
                children={item.level}
                styleText={styles.txtSubtitle} />
        </View>

    const renderItemProject = item =>
        <View>
            <TextDefault
                children={item.name}
                styleText={styles.txtTitle} />
            {
                Boolean(item.url) &&
                <TextDefault
                    children={item.url}
                    styleText={styles.txtSubtitle} />
            }
            {
                Boolean(item.description) &&
                <TextDefault
                    children={item.description}
                    styleText={styles.txtSubtitle} />
            }
        </View>


    const renderItemFormation = item =>
        <View>
            <TextDefault
                children={item.title}
                styleText={styles.txtTitle} />
            {
                Boolean(item.workload) &&
                <TextDefault
                    children={item.subTitle}
                    styleText={styles.txtSubtitle} />
            }
            <View style={styles.containerRow}>
                <TextDefault
                    children={item.startYear}
                    styleText={styles.txtSubtitleRow} />
                <TextDefault
                    styleText={styles.txtSubtitleRow}
                    children={item.endYear ? item.endYear : "Em andamento"} />
                {
                    Boolean(item.workload) &&
                    <TextDefault
                        styleText={styles.txtSubtitleRow}
                        children={item.workload + "h"} />
                }
            </View>
        </View>

    const renderItemExperience = item =>
        <View>
            <TextDefault
                children={item.job}
                styleText={styles.txtTitle} />
            <TextDefault
                children={item.company}
                styleText={styles.txtSubtitle} />
            <View style={styles.containerRow}>
                <TextDefault
                    children={item.startYear}
                    styleText={styles.txtSubtitleRow} />
                <TextDefault
                    styleText={styles.txtSubtitleRow}
                    children={item.endYear ? item.endYear : "Presente"} />
            </View>
        </View>

    return (
        <KeyboardAvoidingView
            style={styles.containerAll}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <View style={styles.containerContent}>
                <TextDefault
                    children={params.type}
                    styleText={styles.txtHeader} />
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
        flex: 1,
        marginVertical: 8
    },
    txtHeader: {
        fontSize: 30,
        color: "rgba(255,255,255,.5)",
    },
    txtTitle: {
        fontSize: 18,
        color: "white",
    },
    txtSubtitle: {
        fontSize: 16,
        color: "rgba(255,255,255,.5)",
    },
    txtSubtitleRow: {
        fontSize: 16,
        marginRight: 8,
        color: "rgba(255,255,255,.5)",
    },
    containerItem: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 8,
        backgroundColor: Colors.background_light,
    },
    containerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
});
