import styles from './style';

import React, { useState, useEffect, useContext } from 'react';
import { View, KeyboardAvoidingView, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';

import Colors from '~colors';
import { Storage } from '~services';
import { ModalContext } from '~contexts';
import { StorageStudent } from './storage';
import { HeaderList, TextDefault, Shimmer, Icon } from '~components'

export const Students = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [loaded, setLoaded] = useState(false);
    const [filter, setFilter] = useState({ data: [], text: "" });
    const [refreshing, setRefreshing] = useState(false);
    const [students, setStudents] = useState({ data: Array(5).fill({}) });

    useEffect(() => navigation.addListener("blur", clearParams), [])

    useEffect(() => navigation.addListener("focus", getStudents), [route.params])

    const getStudents = () =>
        route.params && route.params.jobId ? getSubscriptions() : getAllStudents()

    const clearParams = () =>
        navigation.setParams({ jobId: false, job: false, msg: false });

    const getAllStudents = () => {
        StorageStudent.getStudents()
            .then(data => verifyCurrentUser(data))
            .catch(status => modal.set({ status }))
            .finally(() => {
                setRefreshing(false)
                setLoaded(true)
            })
    }

    const getSubscriptions = () => {
        StorageStudent.getSubscriptions(route.params.jobId)
            .then(data => setStudents({ data }))
            .catch(status => modal.set({ status }))
            .finally(() => {
                setRefreshing(false)
                setLoaded(true)
            })
    }

    const verifyCurrentUser = async data => {
        const user = await Storage.getUser()
        const filteredData = data.filter(value => value.id != user.id)
        setStudents({ data: filteredData })
    }

    const finishIndication = () => {
        clearParams()
        navigation.goBack()
    }

    const goToStudent = id => {
        if (route.params && !route.params.jobId && route.params.job) {
            StorageStudent.indicate(route.params.job, id)
                .then(data => modal.set({ msg: route.params.msg, positivePress: finishIndication }))
                .catch(status => () => modal.set({ status, positivePress: finishIndication }))
        } else
            navigation.navigate("Student", { id })
    }

    const renderItem = ({ id, image, name, course }, index) => {
        return (
            <Shimmer style={styles.itemShimmer} visible={loaded}>
                <TouchableOpacity
                    key={String(index)}
                    style={styles.conatinerItem}
                    onPress={() => goToStudent(id)}>
                    {
                        image ?
                            <Image
                                style={styles.img}
                                source={{ uri: `${image}?time=${new Date()}` }} />
                            :
                            <Icon
                                size={60}
                                style={styles.img}
                                name={"user-circle-o"}
                                color={Colors.TEXT_PRIMARY_LIGHT_PLUS} />
                    }
                    <View style={styles.containerText}>
                        <TextDefault
                            children={name}
                            styleText={styles.txtTitle} />
                        <TextDefault
                            styleText={styles.txtSubtitle}
                            children={course ? course.name : ""} />
                    </View>
                </TouchableOpacity>
            </Shimmer>
        );
    }

    const onRefresh = () => {
        setRefreshing(true)
        getStudents()
    }

    const getRefreshControl = () =>
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />

    const filterStudents = text => {
        const data = students.data.filter(value =>
            value.name.toUpperCase().includes(text.toUpperCase()))
        setFilter({ data, text })
    }

    const verifyText = () => {
        if (route.params && route.params.jobId) {
            return filter.text
                ? "Inscrito não encontrado"
                : "Sem inscritos"
        } else{

            return filter.text
                ? "Aluno(a) não encontrado"
                : "Sem Alunos"
        }
    }

    const getEmptyComponent = () =>
        <TextDefault
            children={verifyText()}
            styleText={styles.txtSubtitle}
            style={styles.containerEmpty} />

    const verifyEmpty = () =>
        Boolean(students.data.length === 0 || filter.data.length === 0 && filter.text)

    return (
        <KeyboardAvoidingView
            style={styles.conatinerAll}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <HeaderList
                title={route.params && route.params.jobId ? "Inscritos" : "Alunos"}
                text={filter.text}
                placeholder={"Pesquisar..."}
                onClose={() => setFilter({ data: [], text: "" })}
                onchange={text => filterStudents(text)} />
            <FlatList
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={getRefreshControl()}
                keyExtractor={(_, index) => String(index)}
                data={filter.text ? filter.data : students.data}
                renderItem={({ item, index }) => renderItem(item, index)}
                ListEmptyComponent={verifyEmpty() && getEmptyComponent}
            />
        </KeyboardAvoidingView>
    );
};
