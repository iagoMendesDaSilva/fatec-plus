import styles from './style';

import { View, SectionList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import { StorageJob } from './storage';
import Colors from '../../constants/colors';
import Strings from '../../constants/strings';
import { Storage, Calendar } from '../../services';
import { ModalContext } from '../../routes/modalContext'
import { Screen, TextDefault, ImagePicker, ButtonSmall, OptionMenu, Load, Arrow, ModalContact, Icon } from '../../helpers'

export const Job = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [job, setJob] = useState({});
    const [info, setInfo] = useState({ data: [] })
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState({});
    const [loadingSub, setLoadingSub] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [permission, setPermission] = useState({ indicate: false, subscribe: false, request: false })


    useEffect(() => navigation.addListener('focus', () => getJob()), [])

    const getJob = async () => {
        const user = await Storage.getUser()

        StorageJob.getJob(route.params.id)
            .then(async data => {
                configPermission(user, data.job, data.company)
                setJob(data.job)
                configInfo(data.job)
                setCompany(data.company)
                setLoading(false)
            })
            .catch(status => modal.set({ status }))
    }


    const configPermission = (user, job, company) => {
        const category = user.category;
        const subscribe = Boolean(category === "Student")
        let indicate = Boolean(category === "Teacher" || category === "Internship Coordinator" && company.id != user.id)
        let request = Boolean(category === "Company" || category === "Internship Coordinator" && company.id === user.id)
        setPermission({ indicate, subscribe, request })
        subscribe && verifySubscribed(job.id)
    }

    const verifySubscribed = id => {
        StorageJob.verifySubscribed(id)
            .then(data => setSubscribed(true))
            .catch(status => console.log(status));
    }

    const choiceStudent = () =>
        permission.subscribe
            ? subscribed ? unSubscribe() : confirmSubscription()
            : navigation.navigate("Students", { job: job.id, msg: permission.indicate ? Strings.INDICATED : Strings.REQUESTED })

    const getTitleButton = () =>
        permission.indicate
            ? "INDICAR"
            : permission.request
                ? "SOLICITAR"
                : subscribed ? "INSCRITO" : "INSCREVER-SE"



    const confirmSubscription = () => {
        modal.set({
            options: true,
            iconName: "warning",
            positivePress: subscribe,
            iconLib: "FontAwesome",
            title: "Confirmar inscrição",
            iconColor: Colors.WARNING,
            msg: Strings.CONFIRM_SUBSCRIPTION,
        })
    }

    const subscribe = async () => {
        setLoadingSub(true)
        const indication = route.params.indication || null;
        StorageJob.subscribe(job.id, indication)
            .then(data => {
                setSubscribed(true)
                job.receive_by_email && sendResume()
            })
            .catch(status => modal.set({ status }))
            .finally(() => setLoadingSub(false))
    }

    const sendResume = () => {
        StorageJob.sendResume(job.id)
            .then(data => console.log(data))
            .catch(status => console.log(status))
    }

    const unSubscribe = async () => {
        setLoadingSub(true)
        StorageJob.unSubscribe(job.id)
            .then(data => setSubscribed(false))
            .catch(status => modal.set({ status }))
            .finally(() => setLoadingSub(false))
    }

    const getTypeJob = () => {
        if (job.internship && job.job)
            return "Estágio ou Efetivo"
        else
            return job.internship ? "Estágio" : "Efetivo"
    }

    const editJob = () =>
        navigation.navigate("JobForm", { id: job.id })

    const deleteJob = () => {
        StorageJob.deleteJob(job.id)
            .then(data =>
                modal.set({ msg: Strings.DELETED_VACANCY, positivePress: () => navigation.goBack() }))
            .catch(status => modal.set({ status }))
    }

    const confirmDeleteJob = () => {
        modal.set({
            options: true,
            iconName: "trash",
            title: "Excluir vaga",
            iconLib: "fontawesome",
            positivePress: deleteJob,
            iconColor: Colors.ERROR,
            msg: Strings.CONFIRM_DELETE_VACANCY,
        })
    }

    const configInfo = job => {
        setInfo({
            data: [
                { title: "Requisitos", data: job.requirements },
                { title: "Benefícios", data: job.benefits },
            ]
        })
    }

    const pressArrow = () =>
        navigation.navigate("Home", { screen: "Vacancies", params: null })

    const renderItem = (item, index) =>
        <View key={String(index)}>
            <TextDefault
                children={item.name}
                styleText={styles.txtTitle} />
            <View style={styles.containerRow}>
                <TextDefault
                    children={item.level}
                    styleText={styles.txtSubtitleRow} />
                {
                    Boolean(item.hasOwnProperty("mandatory")) &&
                    < TextDefault
                        children={item.mandatory ? "Obrigatório" : "Diferencial"}
                        styleText={item.mandatory ? styles.txtSubtitleLink : styles.txtSubtitle} />
                }
            </View>
            <TextDefault
                lines={0}
                children={item.description}
                styleText={styles.txtSubtitle} />
        </View>

    const renderSection = (title) =>
        <>
            {
                title != info.data[0].title &&
                <View style={styles.separator} />
            }
            <TextDefault
                children={title}
                styleText={styles.txtTopic} />
        </>

    const renderItemItemSeparator = () =>
        <View style={styles.separator} />

    return (
        <View style={styles.containerAll}>
            <Arrow onPress={pressArrow} />
            <ModalContact
                open={showModal}
                email={company.email}
                phone={company.phone}
                onClose={() => setShowModal(false)} />
            <Screen center={false}>
                {
                    loading ?
                        <Load />
                        :
                        <>
                            <View style={styles.containerHeader}>
                                <ImagePicker image={company.image} disabled />
                                <TextDefault
                                    children={job.name}
                                    styleText={styles.txtName} />
                                <TextDefault
                                    styleText={styles.txtCompany}
                                    children={company.name} />
                                <TextDefault
                                    styleText={styles.txtAddress}
                                    children={`${company.city}-${company.state}`} />
                                <View style={styles.containerButtons}>
                                    {
                                        Boolean(permission.subscribe || permission.indicate || permission.request) &&
                                        <ButtonSmall
                                            style={styles.button}
                                            loading={loadingSub}
                                            text={getTitleButton()}
                                            onPress={choiceStudent} />
                                    }
                                    <ButtonSmall
                                        outline
                                        text={"Contato"}
                                        onPress={() => setShowModal(true)}
                                        style={styles.button} />
                                </View>
                            </View>
                            {
                                Boolean(permission.request) &&
                                <OptionMenu
                                    options={[
                                        { title: "Editar", onPress: editJob },
                                        { title: "Excluir", onPress: confirmDeleteJob }
                                    ]}
                                />
                            }
                            <View style={styles.containerContent}>
                                <TextDefault
                                    children={"Sobre"}
                                    styleText={styles.txtTopic} />
                                <TextDefault
                                    children={getTypeJob()}
                                    styleText={styles.txtType} />
                                <TextDefault
                                    styleText={styles.txtTextHeader}
                                    children={job.date ? `Inscrições até ${Calendar.format(job.date)}` : "Sem prazo para inscrições"} />
                                <TextDefault
                                    lines={0}
                                    styleText={styles.txtTextHeader}
                                    children={`Endereço: ${company.address}`} />
                                <TextDefault
                                    lines={0}
                                    styleText={styles.txtTextHeader}
                                    children={job.description ? job.description : 'Sem descrição sobre a vaga.'} />
                                <View style={styles.separator} />
                                <SectionList
                                    sections={info.data}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => renderItem(item, index)}
                                    ItemSeparatorComponent={(() => renderItemItemSeparator())}
                                    renderSectionHeader={({ section: { title, data } }) => data.length > 0 && renderSection(title)} />
                            </View>
                        </>
                }
            </Screen>
        </View>
    );
};
