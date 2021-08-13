import styles from './style';

import React, { useContext, useState, useEffect } from 'react';
import { View, Image, RefreshControl, SectionList, TouchableOpacity, } from 'react-native';

import Colors from '../../constants/colors';
import Strings from '../../constants/strings';
import { StorageCoordinator } from './storage';
import { ModalContext } from '../../routes/modalContext'
import { Screen, TextDefault, Shimmer, Icon } from '../../helpers'

export const Coordinators = ({ navigation, route }) => {

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
                                .catch(status => modal.set(status)))
                        .catch(status => modal.set(status)))
                .catch(status => modal.set(status))
                .finally(() => {
                    setSelected({on: false, coodinator: -1, teacher: -1})
                    setRefreshing(false)
                    setLoaded(true)
                }));
    }

    const configList = (coodinators, courses, teachers) => {
        let dataTeachers = []
        let dataCoordinators = []

        teachers.forEach(teacher => dataTeachers.push({ teacher, subTitle: `${teacher.city}-${teacher.state}` }));
        courses.forEach(item => dataCoordinators.push({ teacher: coodinators.filter(teacher => teacher.id === item.id_internship_coordinator)[0], subTitle: item.name, courseId: item.id }));

        setTeachers({
            data: [
                { title: "Coordenadores de estágio", data: dataCoordinators },
                { title: "Professores", data: dataTeachers }
            ]
        })
    }

    const changeCoordinators = teacherId => {
        const courseId = teachers.data[0].data[selected.coodinator].courseId
        console.log(teacherId);
        StorageCoordinator.changeCoordinator(teacherId, courseId)
        .then(resp => onRefresh())
        .catch(status => modal.set({ status }))
    }

   const confirmChangeCoordinator=id=>
    modal.set({
        options: true,
        iconLib: "fontawesome5",
        iconName: "people-arrows",
        iconColor: Colors.WARNING,
        title: "Alterar coordenador de estágio",
        positivePress: ()=>changeCoordinators(id),
        msg: Strings.CONFIRM_CHANGE_COORDINATOR,
    })

    const renderItem = ({ teacher, subTitle }, index) => {
        return (
            <Shimmer style={styles.itemShimmer} visible={loaded}>
                <TouchableOpacity
                    key={String(index)}
                    disabled={!selected.on && teacher.category === "Teacher"}
                    onPress={() => teacher.category != "Teacher" ? setSelected({ coodinator: index, on: Boolean(index != selected.coodinator || !selected.on) }) : confirmChangeCoordinator(teacher.id)}
                    style={{ ...styles.conatinerItem, borderWidth: teacher.category != "Teacher" && selected.coodinator === index && selected.on ? .75 : 0 }}>
                    <Image
                        style={styles.img}
                        source={{ uri: `${teacher.image}?time=${new Date()}` }}
                        defaultSource={require("../../assets/img/user_male.png")} />
                    <View style={styles.containerText}>
                        <View style={styles.conatinerRow}>
                            <TextDefault
                                styleText={styles.txtTitle}
                                children={teacher.name}
                                style={styles.containerName} />
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
