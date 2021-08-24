import styles from './style';

import React, { useState, useEffect, useContext } from 'react';
import { View, KeyboardAvoidingView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';

import Colors from '~colors';
import Strings from '~strings';
import { ModalContext } from '~contexts'
import { StorageVacancie } from './storage';
import { Calendar, Storage } from '~services';
import { HeaderList, TextDefault, Shimmer, Icon, FloatingButton } from '~components'

export const Vacancies = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [filter, setFilter] = React.useState({ data: [], text: "" });
    const [refreshing, setRefreshing] = useState(false);
    const [vacancies, setVacancies] = useState({ data: Array(5).fill({}) });

    useEffect(() => navigation.addListener('focus', () => getUser()), [])

    const getUser = async () => {
        const currentUser = await Storage.getUser()
        StorageVacancie.getUser(currentUser.id)
            .then(data => {
                setUser(data)
                getVacancies(data.category, data.id, data.internship, data.job)
            })
            .catch(status => modal.set({ status }))
            .finally(() => setRefreshing(false))
    }

    const getVacancies = (category, id, internship, job) => {
        if (category === "Company")
            getVacanciesByCompany(id)
        else
            getAllVacancies(category === "Student", internship, job)
    }

    const getVacanciesByCompany = id => {
        setLoaded(false,
            StorageVacancie.getVacanciesByCompany(id)
                .then(data => setVacancies({ data }))
                .catch(status => modal.set({ status }))
                .finally(() => {
                    route.params = null;
                    setRefreshing(false)
                    setLoaded(true)
                }))
    }

    const getAllVacancies = (isStudent, internship, job) => {
        setLoaded(false,
            StorageVacancie.getVacancies()
                .then(data => configVacancies(data, isStudent, internship, job))
                .catch(status => modal.set({ status }))
                .finally(() => {
                    route.params = null;
                    setRefreshing(false)
                    setLoaded(true)
                }))
    }

    const configVacancies = (jobs, isStudent, internship, job) => {
        const data = jobs.filter(item => {
            let itemValid = item;
            if (isStudent)
                itemValid = item.internship === internship || item.job === job ? item : null
            if (item.date)
                itemValid = Calendar.isSameOrAfterToday(item.date) ? item : null
            return itemValid
        })
        setVacancies({ data })
    }


    const getDeadLineColor = date => {
        if (Calendar.isSameToday(date))
            return Colors.ERROR
        if (Calendar.isAfterToday(date))
            return Colors.WARNING
        if (!date)
            return Colors.SUCCESS
        return "gray"
    }

    const onRefresh = () => {
        setRefreshing(true)
        getUser()
    }

    const getRefreshControl = () =>
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />

    const filterCompanies = text => {
        const data = vacancies.data.filter(value =>
            value.name.toUpperCase().includes(text.toUpperCase()))
        setFilter({ data, text })
    }

    const getEmptyComponent = () =>
        <TextDefault
            styleText={styles.txtSubtitle}
            style={styles.containerEmpty}
            children={filter.text ? "Vaga não encontrada" : "Sem Vagas"} />

    const verifyEmpty = () =>
        Boolean(vacancies.data.length === 0 || filter.data.length === 0 && filter.text)

    const unFormatDate = date =>
        date ? date.split("-").reverse().join("/") : null

    const goToJob = id => {
        if (route.params) {
            requestOrIndicate(id, route.params.studentId)
        } else
            navigation.navigate("Job", { id })
    }

    const requestOrIndicate = (vacancyId, studentId) => {
        StorageVacancie.solicit(vacancyId, studentId)
            .then(() =>
                modal.set({
                    msg: user.category === "Company" ? Strings.REQUESTED : Strings.INDICATED,
                    positivePress: () => {
                        route.params = null
                        navigation.goBack()
                    }
                })
            )
            .catch(status =>
                modal.set({
                    status,
                    back: true
                }))
    }

    const renderItem = ({ id, name, date }, index) => {
        return (
            <Shimmer style={styles.itemShimmer} visible={loaded}>
                <TouchableOpacity
                    onPress={() => goToJob(id)}
                    key={String(index)}
                    style={styles.conatinerItem}>
                    <View style={styles.containerText}>
                        <TextDefault
                            children={name}
                            styleText={styles.txtTitle} />
                        <TextDefault
                            styleText={styles.txtSubtitle}
                            children={date ? unFormatDate(date) : "Sem prazo"} />
                    </View>
                    <Icon
                        size={25}
                        lib={"Ionicons"}
                        name={"time-outline"}
                        color={getDeadLineColor(date)} />
                </TouchableOpacity>
            </Shimmer>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.conatinerAll}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <HeaderList
                title={"Vagas"}
                text={filter.text}
                placeholder={"Pesquisar..."}
                onClose={() => setFilter({ data: [], text: "" })}
                onchange={text => filterCompanies(text)} />
            <FlatList
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={getRefreshControl()}
                keyExtractor={(_, index) => String(index)}
                data={filter.text ? filter.data : vacancies.data}
                renderItem={({ item, index }) => renderItem(item, index)}
                ListEmptyComponent={verifyEmpty() && getEmptyComponent}
            />
            {
                Boolean(user.category === "Company") &&
                <FloatingButton
                    onPress={() => navigation.navigate("JobForm")} />
            }
        </KeyboardAvoidingView>
    );
};
