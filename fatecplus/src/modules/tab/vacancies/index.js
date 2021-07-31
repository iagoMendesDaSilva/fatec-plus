import styles from './style';

import React from 'react';
import { View, KeyboardAvoidingView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';

import { Storage } from '../../../services';
import { StorageVacancie } from './storage';
import Colors from '../../../constants/colors';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext'
import { HeaderList, TextDefault, Shimmer, Icon, FloatingButton } from '../../../helpers'

export const Vacancies = ({ navigation, route }) => {

    const modal = React.useContext(ModalContext);

    const [user, setUser] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);
    const [filter, setFilter] = React.useState({ data: [], text: "" });
    const [refreshing, setRefreshing] = React.useState(false);
    const [vacancies, setVacancies] = React.useState({ data: Array(5).fill({}) });

    React.useEffect(() => navigation.addListener('focus', () => getUser()), [])

    const getUser = async () => {
        const currentUser = await Storage.getUser()
        StorageVacancie.getUser(currentUser.id)
            .then(data => {
                setUser(data)
                getVacancies(data.category, data.id, data.internship, data.job)
            })
            .catch(status => modal.configErrorModal({ status }))
    }

    const getVacancies = (category, id, internship, job) => {
        if (category === "Company" || category === "Internship Coordinator")
            getVacanciesByCompany(id)
        else
            getAllVacancies(category === "Student", internship, job)
    }

    const configVacancies = (jobs, isStudent, internship, job) => {
        const data = jobs.filter(item => {
            let itemValid = item;
            if (isStudent)
                itemValid = item.internship === internship || item.job === job ? item : null
            if (item.date)
                itemValid = checkDeadLine(item.date) ? item : null
            return itemValid
        })
        setVacancies({ data })
    }

    const getFormatedDate = () => {
        const today = new Date()
        const year = String(today.getFullYear())
        let month = String(today.getMonth() + 1)
        let day = String(today.getDate())

        if (day.length === 1) day = "0" + day
        if (month.length === 1) month = "0" + month
        return `${year}-${month}-${day}`
    }

    const checkDeadLine = date =>
        Boolean(date >= getFormatedDate())


    const getDeadLineColor = date => {
        const today = getFormatedDate()
        if (date === today)
            return Colors.error
        if (date > today)
            return Colors.warning
        if (!date)
            return Colors.success
        return "gray"
    }


    const getVacanciesByCompany = id => {
        setLoaded(false,
            StorageVacancie.getVacanciesByCompany(id)
                .then(data => setVacancies({ data }))
                .catch(status => configModal(status))
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
                .catch(status => configModal(status))
                .finally(() => {
                    route.params = null;
                    setRefreshing(false)
                    setLoaded(true)
                }))
    }

    const configModal = status =>
        modal.configErrorModal({
            status,
            msg: Strings.failVacancies,
            positivePress: () => navigation.replace("Login")
        })

    const onRefresh = () => {
        setRefreshing(true)
        getUser()
    }

    const getRefreshControl = () =>
        <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()} />

    const filterCompanies = text => {
        const data = vacancies.data.filter(value =>
            value.name.toUpperCase().includes(text.toUpperCase()))
        setFilter({ data, text })
    }

    const getHeader = () =>
        <TextDefault
            styleText={styles.txtSubtitle}
            children={"Sem vagas"} />

    const verifyHeader = () =>
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
                modal.configErrorModal({
                    msg: user.category === "Company" ? Strings.requested : Strings.indicated,
                    positivePress: () => {
                        route.params = null
                        navigation.goBack()
                    }
                })
            )
            .catch(status =>
                modal.configErrorModal({
                    status,
                    positivePress: () => navigation.goBack()
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
                placeholder={"Pesquisar..."}
                onClose={() => setFilter({ data: [] })}
                onchange={text => filterCompanies(text)} />
            <FlatList
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={getRefreshControl()}
                keyExtractor={(_, index) => String(index)}
                data={filter.text ? filter.data : vacancies.data}
                renderItem={({ item, index }) => renderItem(item, index)}
                ListHeaderComponent={verifyHeader() && getHeader}
            />
            {
                Boolean(user.category === "Company" || user.category === "Internship Coordinator") &&
                <FloatingButton
                    onPress={() => navigation.navigate("Vacancy")} />
            }
        </KeyboardAvoidingView>
    );
};