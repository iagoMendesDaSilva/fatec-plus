import styles from './style';

import React from 'react';
import { View, KeyboardAvoidingView, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';

import { Storage } from '../../../services';
import { StorageStudent } from './storage';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext'
import { HeaderList, TextDefault, Shimmer } from '../../../helpers'

export const Students = ({ navigation, route }) => {

    const modal = React.useContext(ModalContext);

    const [loaded, setLoaded] = React.useState(false);
    const [filter, setFilter] = React.useState({ data: [], text: "" });
    const [refreshing, setRefreshing] = React.useState(false);
    const [students, setStudents] = React.useState({ data: Array(5).fill({}) });

    React.useEffect(() => getStudents(), [])


    const getStudents = () => {
        setLoaded(false,
            StorageStudent.getStudents()
                .then(data => verifyCurrentUser(data))
                .catch(status => configModal(status))
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

    const configModal = status =>
        modal.configErrorModal({
            status,
            msg: Strings.failStudents,
            positivePress: () => navigation.replace("Login")
        })

    const closeIndication = () => {
        route.params = null
        navigation.goBack()
    }

    const goToStudent = id => {
        if (route.params) {
            StorageStudent.solicit(route.params.job, id)
                .then(data => modal.configErrorModal({ msg: route.params.msg, positivePress: closeIndication }))
                .catch(status => () => modal.configErrorModal({ status, positivePress: closeIndication }))
        } else
            navigation.navigate("Student", { id })
    }

    const renderItem = ({ id, image, name, studying }, index) => {
        return (
            <Shimmer style={styles.itemShimmer} visible={loaded}>
                <TouchableOpacity
                    onPress={() => goToStudent(id)}
                    key={String(index)}
                    style={styles.conatinerItem}>
                    <Image
                        style={styles.img}
                        source={{ uri: image }}
                        defaultSource={require("../../../assets/img/user_male.png")} />
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
            onRefresh={() => onRefresh()} />

    const filterCompanies = text => {
        const data = students.data.filter(value =>
            value.name.toUpperCase().includes(text.toUpperCase()))
        setFilter({ data, text })
    }

    const getHeader = () =>
        <TextDefault
            styleText={styles.txtSubtitle}
            children={"Sem alunos"} />

    const verifyHeader = () =>
        Boolean(students.data.length === 0 || filter.data.length === 0 && filter.text)

    return (
        <KeyboardAvoidingView
            style={styles.conatinerAll}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <HeaderList
                title={"Alunos"}
                placeholder={"Pesquisar..."}
                onClose={() => setFilter({ data: [] })}
                onchange={text => filterCompanies(text)} />
            <FlatList
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={getRefreshControl()}
                keyExtractor={(_, index) => String(index)}
                data={filter.text ? filter.data : students.data}
                renderItem={({ item, index }) => renderItem(item, index)}
                ListHeaderComponent={verifyHeader() && getHeader}
            />
        </KeyboardAvoidingView>
    );
};