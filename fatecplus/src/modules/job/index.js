import styles from './style';

import { View } from 'react-native';
import React, { useState, useEffect } from 'react';

import { StorageJob } from './storage';
import Colors from '../../constants/colors';
import Strings from '../../constants/strings';
import { Storage } from '../../services';
import { ModalContext } from '../../routes/modalContext'
import { Screen, TextDefault, ImagePicker, ButtonSmall, OptionMenu, Load, Arrow, ModalContact } from '../../helpers'

export const Job = ({ navigation, route }) => {

    const modal = React.useContext(ModalContext);

    const [job, setJob] = useState({});
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingSub, setLoadingSub] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [permission, setPermission] = useState({ indicate: false, subscribe: false, request: false })


    useEffect(() => {
        getJob()
        navigation.addListener('focus', () => getJob())
    }, [])

    const getJob = async () => {
        const user = await Storage.getUser()

        StorageJob.getJob(route.params.id)
            .then(async data => {
                configPermission(user, data.job, data.company)
                setJob(data.job)
                setCompany(data.company)
                setLoading(false)
            })
            .catch(status => modal.set({ status }))
    }


    const configPermission = (user, job, company) => {
        const category = user.category;
        const subscribe = Boolean(category === "Student")
        let request = Boolean(category === "Company" || category === "Internship Coordinator" && company.id === user.id)
        let indicate = Boolean(category === "Teacher" || category === "Internship Coordinator" && company.id != user.id)
        setPermission({ indicate, subscribe, request })
        subscribe && verifySubscribed(job.id)
    }

    const verifySubscribed = id => {
        StorageJob.verifySubscribed(id)
            .then(data => setSubscribed(true))
            .catch(status => console.log(status));
    }

    const unFormatDate = date =>
        date ? date.split("-").reverse().join("/") : null


    const renderItemRequeriment = (item, index) =>
        <View style={styles.containerItem} key={String(index)}>
            <TextDefault
                children={item.name}
                styleText={styles.txtTitle} />
            <View style={styles.containerRow}>
                <TextDefault
                    children={item.level}
                    styleText={styles.txtSubtitleRow} />
                <TextDefault
                    children={item.mandatory ? "Obrigatório" : "Diferencial"}
                    styleText={item.mandatory ? styles.txtSubtitleLink : styles.txtSubtitle} />
            </View>
            {
                Boolean(item.description) &&
                <TextDefault
                    lines={0}
                    children={item.description}
                    styleText={styles.txtSubtitle} />
            }
        </View>

    const renderItemBenefit = (item, index) =>
        <View style={styles.containerItem} key={String(index)}>
            <TextDefault
                styleText={styles.txtTitle}
                children={item.name} />
            {
                Boolean(item.description) &&
                <TextDefault
                    lines={0}
                    children={item.description}
                    styleText={styles.txtSubtitle} />
            }
        </View>

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
            title: "Aviso",
            iconColor: Colors.WARNING,
            iconLib: "FontAwesome",
            positivePress: subscribe,
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
        navigation.navigate("Vacancy", { id: job.id })

    const deleteJob = () => {
        StorageJob.deleteJob(job.id)
            .then(data =>
                modal.set({ msg: Strings.DELETED_VACANCY, positivePress: () => navigation.goBack() }))
            .catch(status => modal.set({ status }))
    }

    const confirmDeleteJob = () => {
        modal.set({
            options: true,
            title: "Excluir vaga",
            iconName: "trash",
            msg: Strings.CONFIRM_DELETE_VACANCY,
            iconLib: "fontawesome",
            iconColor: Colors.ERROR,
            positivePress: deleteJob,
        })
    }

    const pressArrow = () =>
        navigation.navigate("Home", { screen: "Vacancies", params: null })

    return (
        <View style={styles.containerAll}>
            <Arrow onPress={pressArrow} />
            <ModalContact
                email={company.email}
                open={showModal}
                phone={company.phone}
                onClose={() => setShowModal(false)} />
            <Screen center={false}>
                {
                    loading ?
                        <Load backgroundColor={Colors.BACKGROUND} />
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
                                            loading={loadingSub}
                                            onPress={choiceStudent}
                                            text={getTitleButton()}
                                            style={styles.button} />
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
                                    styleText={styles.txtSubtitleLink} />
                                <TextDefault
                                    styleText={styles.txtDate}
                                    children={job.date ? `Inscrições até ${unFormatDate(job.date)}` : "Sem prazo para inscrições"} />
                                <TextDefault
                                    lines={2}
                                    styleText={styles.txtDate}
                                    children={company.address} />
                                {
                                    Boolean(job.description) &&
                                    <TextDefault
                                        lines={0}
                                        children={job.description}
                                        styleText={styles.txtSubtitle} />
                                }

                                {
                                    job.requirements.length > 0 &&
                                    <>
                                        <TextDefault
                                            children={"Requisitos"}
                                            styleText={styles.txtTopicLine} />
                                        {
                                            job.requirements.map((item, index) => renderItemRequeriment(item, index))
                                        }
                                    </>

                                }
                                {
                                    job.benefits.length > 0 &&
                                    <>
                                        <TextDefault
                                            children={"Benefícios"}
                                            styleText={styles.txtTopicLine} />
                                        {
                                            job.benefits.map((item, index) => renderItemBenefit(item, index))
                                        }
                                    </>

                                }
                            </View>
                        </>
                }
            </Screen>
        </View>
    );
};
