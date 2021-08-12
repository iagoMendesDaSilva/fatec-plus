import styles from './style';

import React, { useContext, useState, useEffect } from 'react';
import { View, Image, RefreshControl, SectionList, } from 'react-native';

import Colors from '../../constants/colors';
import { StorageCoordinator } from './storage';
import { ModalContext } from '../../routes/modalContext'
import { Screen, TextDefault, Shimmer } from '../../helpers'

export const Coordinators = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [loaded, setLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [teachers, setTeachers] = useState({ data: [] });

    useEffect(() => getTeachers(), [])

    const getTeachers = () => {
        setLoaded(false,
            StorageCoordinator.getTeachers()
                .then(teachers =>
                    StorageCoordinator.getCoordinators()
                        .then(coordinators =>
                            setTeachers({ data: [{ title: "Coordenadores de estágio", data: coordinators }, { title: "Professores", data: teachers }] }))
                        .catch(status => modal.set(status)))
                .catch(status => modal.set(status))
                .finally(() => {
                    setRefreshing(false)
                    setLoaded(true)
                }));
    }

    const renderItem = ({ id, image, name, category }, index) => {
        return (
            <Shimmer style={styles.itemShimmer} visible={loaded}>
                <View key={String(index)}
                    style={styles.conatinerItem}>
                    <Image
                        style={styles.img}
                        source={{ uri: `${image}?time=${new Date()}` }}
                        defaultSource={require("../../assets/img/user_male.png")} />
                    <View style={styles.containerText}>
                        <TextDefault
                            children={name}
                            styleText={styles.txtTitle} />
                        <TextDefault
                            styleText={{ ...styles.txtSubtitle, color: category === "Teacher" ? Colors.TEXT_PRIMARY_LIGHT_PLUS : Colors.PRIMARY }}
                            children={category === "Teacher" ? "Professor(a)" : "Coordenador(a) de estágio"} />
                    </View>
                </View>
            </Shimmer>
        );
    }

    const onRefresh = () => {
        setRefreshing(true)
        getTeachers()
    }

    const getRefreshControl = () =>
        <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()} />

    const renderSection = (title) =>
        <TextDefault
            children={title}
            styleText={styles.txtTitle} />

    return (
        <Screen>
            <SectionList
                scrollEnabled={false}
                sections={teachers.data}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={getRefreshControl()}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item, index }) => renderItem(item, index)}
                renderSectionHeader={({ section: { title, data } }) => data.length > 0 && renderSection(title)} />
        </Screen>
    );
};
