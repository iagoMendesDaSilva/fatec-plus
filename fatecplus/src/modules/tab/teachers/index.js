import styles from './style';

import React from 'react';
import { View, KeyboardAvoidingView, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';

import { Storage } from '../../../services';
import { StorageTeacher } from './storage';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext'
import { HeaderList, TextDefault, Shimmer } from '../../../helpers'

export const Teachers = ({ navigation }) => {

    const modal = React.useContext(ModalContext);

    const [loaded, setLoaded] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [filter, setFilter] = React.useState({ data: [], text: "" });
    const [teachers, setTeachers] = React.useState({ data: Array(5).fill({}) });

    React.useEffect(() => getTeachers(), [])

    const getTeachers = () => {
        setLoaded(false,
            StorageTeacher.getCoordinators()
                .then(coordinators =>
                    StorageTeacher.getTeachers()
                        .then(teachers => verifyCurrentUser(coordinators.concat(teachers)))
                        .catch(status => configModal(status)))
                .catch(status => configModal(status))
                .finally(() => {
                    setRefreshing(false)
                    setLoaded(true)
                }));
    }

    const verifyCurrentUser = async data => {
        const user = await Storage.getUser()
        const filteredData = data.filter(value => value.id != user.id)
        setTeachers({ data: filteredData })
    }

    const configModal = status =>
        modal.configErrorModal({
            status,
            msg: Strings.failTeachers,
            positivePress: () => navigation.replace("Login")
        })

    const goToTeacher = id =>
        console.log(1);
    // navigation.navigate("", { id })

    const renderItem = ({ id, image, name, category }, index) => {
        return (
            <Shimmer style={styles.itemShimmer} visible={loaded}>
                <TouchableOpacity
                    onPress={() => goToTeacher(id)}
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
                            children={category ? category === "Teacher" ? "Professor(a)" : "Coordenador(a)" :""} />
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

    const filterCompanies = text => {
        const data = teachers.data.filter(value =>
            value.name.toUpperCase().includes(text.toUpperCase()))
        setFilter({ data, text })
    }

    const getHeader = () =>
        <TextDefault
            styleText={styles.txtSubtitle}
            children={"Sem Professores"} />

    const verifyHeader = () =>
        Boolean(teachers.data.length === 0 || filter.data.length === 0 && filter.text)

    return (
        <KeyboardAvoidingView
            style={styles.conatinerAll}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <HeaderList
                title={"Professores"}
                placeholder={"Pesquisar..."}
                onClose={() => setFilter({ data: [] })}
                onchange={text => filterCompanies(text)} />
            <FlatList
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={getRefreshControl()}
                keyExtractor={(_, index) => String(index)}
                data={filter.text ? filter.data : teachers.data}
                renderItem={({ item, index }) => renderItem(item, index)}
                ListHeaderComponent={verifyHeader() && getHeader}
            />
        </KeyboardAvoidingView>
    );
};