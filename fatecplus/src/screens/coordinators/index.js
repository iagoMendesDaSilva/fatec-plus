import styles from './style';

import React, { useContext, useState, useEffect } from 'react';
import { View, Image, RefreshControl, SectionList, TouchableOpacity, } from 'react-native';

import Colors from '~colors';
import Strings from '~strings';
import { ModalContext } from '~contexts'
import { StorageCoordinator } from './storage';
import { Screen, TextDefault, Shimmer, Icon } from '~components'

export const Coordinators = () => {

    const modal = useContext(ModalContext);

    const [loaded, setLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [teachers, setTeachers] = useState({ data: [] });
    const [selected, setSelected] = useState({ on: false, coodinator: -1, teacher: -1 });

    useEffect(() => getTeachers(), [])

    const getTeachers = () => {
        setLoaded(false,
            StorageCoordinator.getCourses()
                .then(courses =>
                    StorageCoordinator.getCoordinators()
                        .then(coodinators =>
                            StorageCoordinator.getTeachers()
                                .then(teachers => configList(coodinators, courses, teachers))
                                .catch(status => modal.set({ status })))
                        .catch(status => modal.set({ status })))
                .catch(status => modal.set({ status, back: true }))
                .finally(() => {
                    setRefreshing(false)
                    setLoaded(true)
                }));
    }

    const configList = (coodinators, courses, teachers) => {
        let dataTeachers = []
        let dataCoordinators = []

        teachers.forEach(teacher => dataTeachers.push({ teacher, subTitle: `${teacher.city}-${teacher.state}` }));
        courses.forEach(item => dataCoordinators.push({ teacher: coodinators.filter(value => value.id === item.id_internship_coordinator)[0] || {}, subTitle: item.name, courseId: item.id }));

        setTeachers({
            data: [
                { title: "Coordenadores de estágio", data: dataCoordinators },
                { title: "Professores", data: dataTeachers }
            ]
        })
    }

    const confirmChangeCoordinator = id =>
        modal.set({
            options: true,
            iconLib: "fontawesome5",
            iconName: "people-arrows",
            iconColor: Colors.WARNING,
            title: "Alterar coordenador de estágio",
            positivePress: () => changeCoordinators(id),
            msg: Strings.CONFIRM_CHANGE_COORDINATOR,
            negativePress: () => setSelected({ on: false, coodinator: -1, teacher: -1 }),
        })

    const changeCoordinators = teacherId => {
        const courseId = teachers.data[0].data[selected.coodinator].courseId
        StorageCoordinator.changeCoordinator(teacherId, courseId)
            .then(resp => onRefresh())
            .catch(status => modal.set({ status }))
            .finally(() => setSelected({ on: false, coodinator: -1, teacher: -1 }))
    }

    const pressTeacher = (category, id, index) => {
        category != "Teacher"
            ? setSelected({ coodinator: index, on: Boolean(index != selected.coodinator || !selected.on) })
            : confirmChangeCoordinator(id)
    }

    const verifyTeacherSelected = (category, index) =>
        category != "Teacher" && selected.coodinator === index && selected.on ? .75 : 0


    const renderItem = ({ teacher, subTitle }, index) => {
        return (
            <Shimmer style={styles.itemShimmer} visible={loaded}>
                <TouchableOpacity
                    key={String(index)}
                    disabled={!selected.on && teacher.category === "Teacher"}
                    onPress={() => pressTeacher(teacher.category, teacher.id, index)}
                    style={{ ...styles.conatinerItem, borderWidth: verifyTeacherSelected(teacher.category, index) }}>
                    {
                        teacher.image ?
                            <Image
                                style={styles.img}
                                source={{ uri: `${teacher.image}?time=${new Date()}` }} />
                            :
                            <Icon
                                size={60}
                                style={styles.img}
                                name={"user-circle-o"}
                                color={Colors.TEXT_PRIMARY_LIGHT_PLUS} />
                    }
                    <View style={styles.containerText}>
                        <View style={styles.conatinerRow}>
                            <TextDefault
                                styleText={styles.txtTitle}
                                style={styles.containerName}
                                children={teacher.name ? teacher.name : "Sem Professor(a)"} />
                            {
                                Boolean(teacher.category != "Teacher") &&
                                <Icon
                                    name={"exchange-alt"}
                                    lib={"FontAwesome5"}
                                    color={Colors.PRIMARY} />
                            }
                        </View>
                        <TextDefault
                            children={subTitle}
                            styleText={styles.txtSubtitle} />
                    </View>
                </TouchableOpacity>
            </Shimmer >
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
