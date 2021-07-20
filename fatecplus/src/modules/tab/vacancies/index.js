import styles from './style';

import React from 'react';
import { View, KeyboardAvoidingView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';

import { Storage } from '../../../services';
import { StorageVacancie } from './storage';
import Colors from '../../../constants/colors';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext'
import { HeaderList, TextDefault, Shimmer, Icon, FloatingButton } from '../../../helpers'

export const Vacancies = ({ navigation }) => {

    const modal = React.useContext(ModalContext);

    const [user, setUser] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);
    const [filter, setFilter] = React.useState({ data: [], text: "" });
    const [refreshing, setRefreshing] = React.useState(false);
    const [vacancies, setVacancies] = React.useState({ data: Array(5).fill({}) });

    React.useEffect(() => navigation.addListener('focus', () => getUser()), [])

    const getUser = async () => {
        const currentUser = await Storage.getUser()
        setUser(currentUser)
        getVacancies(currentUser.category, currentUser.id)
    }

    const getVacancies = (category, id) => {
        category === "Company" || category === "Internship Coordinator"
            ? getVacanciesByCompany(id)
            : getAllVacancies()
    }

    const configVacancies = (jobs) => {
        jobs.map(item => item.date && checkDeadLine(item.date))
        setVacancies({ data: jobs })
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
        return Colors.success
    }


    const getVacanciesByCompany = id => {
        setLoaded(false,
            StorageVacancie.getVacanciesByCompany(id)
                .then(data => configVacancies(data))
                .catch(status => configModal(status))
                .finally(() => {
                    setRefreshing(false)
                    setLoaded(true)
                }))
    }

    const getAllVacancies = () => {
        setLoaded(false,
            StorageVacancie.getVacancies()
                .then(data => configVacancies(data))
                .catch(status => configModal(status))
                .finally(() => {
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
        getVacancies(user.category, user.id)
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


    const goToVacancie = id =>
        Boolean(user.category === "Company" || user.category === "Internship Coordinator")
            ? navigation.navigate("Vacancy", { id })
            : console.log(1);

    const renderItem = ({ id, name, date }, index) => {
        return (
            <Shimmer style={styles.itemShimmer} visible={loaded}>
                <TouchableOpacity
                    onPress={() => goToVacancie(id)}
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