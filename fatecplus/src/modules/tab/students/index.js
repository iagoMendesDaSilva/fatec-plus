import styles from './style';

import React, { useState, useEffect, useContext } from 'react';
import { View, KeyboardAvoidingView, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';

import { Storage } from '../../../services';
import { StorageStudent } from './storage';
import Colors from '../../../constants/colors';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext'
import { HeaderList, TextDefault, Shimmer, Icon } from '../../../helpers'

export const Students = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [loaded, setLoaded] = useState(false);
    const [filter, setFilter] = useState({ data: [], text: "" });
    const [refreshing, setRefreshing] = useState(false);
    const [students, setStudents] = useState({ data: Array(5).fill({}) });

    useEffect(() => getStudents(), [])

    const getStudents = () => {
        setLoaded(false,
            StorageStudent.getStudents()
                .then(data => verifyCurrentUser(data))
                .catch(status => modal.set(status))
                .finally(() => {
                    setRefreshing(false)
                    setLoaded(true)
                }));
    }

    const verifyCurrentUser = async data => {
        const user = await Storage.getUser()
        const filteredData = data.filter(value => value.id != user.id)
        setStudents({ data: filteredData })
    }

    const finishIndication = () => {
        route.params = null
        navigation.goBack()
    }

    const goToStudent = id => {
        if (route.params) {
            StorageStudent.solicit(route.params.job, id)
                .then(data => modal.set({ msg: route.params.msg, positivePress: finishIndication }))
                .catch(status => () => modal.set({ status, positivePress: finishIndication }))
        } else
            navigation.navigate("Student", { id })
    }

    const renderItem = ({ id, image, name, studying }, index) => {
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
                            children={studying} />
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

    const getEmptyComponent = () =>
        <TextDefault
            styleText={styles.txtSubtitle}
            style={styles.containerEmpty}
            children={filter.text ? "Aluno(a) não encontrado" : "Sem Alunos"} />

    const verifyEmpty = () =>
        Boolean(students.data.length === 0 || filter.data.length === 0 && filter.text)

    return (
        <KeyboardAvoidingView
            style={styles.conatinerAll}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <HeaderList
                title={"Alunos"}
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
