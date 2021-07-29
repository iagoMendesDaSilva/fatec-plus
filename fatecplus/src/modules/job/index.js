import styles from './style';

import React from 'react';
import { View, Linking, Animated, Dimensions, TouchableOpacity } from 'react-native';

import { StorageJob } from './storage';
import Colors from '../../constants/colors';
import Strings from '../../constants/strings';
import { Storage, Animate } from '../../services';
import { ModalContext } from '../../routes/modalContext'
import { Screen, TextDefault, ImagePicker, ButtonSmall, Icon, Load, ModalBottom } from '../../helpers'

export const Job = ({ navigation, route }) => {

    const modal = React.useContext(ModalContext);

    const [job, setJob] = React.useState({});
    const [company, setCompany] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [loadingSub, setLoadingSub] = React.useState(false);
    const [subscribed, setSubscribed] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [permission, setPermission] = React.useState({ indicate: false, subscribe: false })


    React.useEffect(() => getJob(), [])

    const getJob = async () => {
        const user = await Storage.getUser()

        StorageJob.getJob(route.params.id)
            .then(async data => {
                configPermission(user, data.job)
                setJob(data.job)
                setCompany(data.company)
                setLoading(false)
            })
            .catch(status => modal.configErrorModal({ status }))
    }


    const configPermission = (user, job) => {
        const category = user.category;
        let subscribe = Boolean(category === "Student")
        let indicate = Boolean(category === "Teacher" || category == "Internship Coordinator")
        setPermission({ indicate, subscribe })
        subscribe && verifySubscribed(job.id)
    }

    const verifySubscribed = id => {
        console.log(id);
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
            : navigation.navigate("Students", { job: job.id })

    const getTitleButton = () =>
        permission.indicate
            ? "INDICAR"
            : subscribed ? "INSCRITO" : "INSCREVER-SE"


    const confirmSubscription = () => {
        modal.configErrorModal({
            options: true,
            iconName: "warning",
            title: "Aviso",
            iconColor: Colors.warning,
            iconLib: "FontAwesome",
            positivePress: subscribe,
            msg: Strings.confirmSub,
        })
    }

    const subscribe = async () => {
        setLoadingSub(true)
        const indication = route.params.indication || null;
        StorageJob.subscribe(job.id, indication)
            .then(data => setSubscribed(true))
            .catch(status => modal.configErrorModal({ status }))
            .finally(() => setLoadingSub(false))
    }

    const unSubscribe = async () => {
        setLoadingSub(true)
        StorageJob.unSubscribe(job.id)
            .then(data => setSubscribed(false))
            .catch(status => modal.configErrorModal({ status }))
            .finally(() => setLoadingSub(false))
    }

    const getTypeJob = () => {
        if (job.internship && job.job)
            return "Estágio ou Efetivo"
        else
            job.internship ? "Estágio" : "Efetivo"
    }

    return (
        <View style={styles.containerAll}>
            <ModalBottom
                open={showModal}
                title={"Contato"}
                onClose={() => setShowModal(false)}>
                <TextDefault
                    children={"Telefone"}
                    styleText={styles.txtSubtitleLink} />
                <TextDefault
                    children={company.phone}
                    styleText={styles.txtCourse} />
                <TextDefault
                    children={"Email"}
                    styleText={styles.txtSubtitleLink} />
                <TextDefault
                    children={company.email}
                    styleText={styles.txtCourse} />
            </ModalBottom>
            <Screen center={false}>
                {
                    loading ?
                        <Load backgroundColor={Colors.background} />
                        :
                        <>
                            <View style={styles.containerHeader}>
                                <ImagePicker image={company.image} disabled />
                                <TextDefault
                                    children={job.name}
                                    styleText={styles.txtName} />
                                <TextDefault
                                    styleText={styles.txtAddress}
                                    children={`${company.city}-${company.state}`} />
                                <TextDefault
                                    styleText={styles.txtDate}
                                    children={job.date ? unFormatDate(job.date) : "Sem prazo"} />
                                <View style={styles.containerButtons}>
                                    {
                                        Boolean(permission.subscribe || permission.indicate) &&
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
                            <View style={styles.containerContent}>
                                <TextDefault
                                    children={"Sobre"}
                                    styleText={styles.txtTopic} />
                                <TextDefault
                                    children={getTypeJob()}
                                    styleText={styles.txtSubtitleLink} />
                                <TextDefault
                                    lines={0}
                                    children={job.description ? job.description : 'Sem descrição sobre a vaga.'}
                                    styleText={styles.txtText} />

                                {
                                    job.requirements.length > 0 &&
                                    <>
                                        <TextDefault
                                            children={"Requisitos"}
                                            styleText={styles.txtTopic} />
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
                                            styleText={styles.txtTopic} />
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