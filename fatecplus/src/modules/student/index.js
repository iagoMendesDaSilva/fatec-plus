import styles from './style';

import React from 'react';
import { View, Linking, Animated, Dimensions, TouchableOpacity } from 'react-native';

import { Storage, Animate } from '../../services';
import { StorageUser } from './storage';
import Colors from '../../constants/colors';
import { ModalContext } from '../../routes/modalContext'
import { Screen, TextDefault, ImagePicker, ButtonSmall, Icon, Load, ModalBottom } from '../../helpers'

export const Student = ({ navigation, route }) => {

    const modal = React.useContext(ModalContext);

    const [user, setUser] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(false);
    const [permission, setPermission] = React.useState({ indicate: false, request: false })

    React.useEffect(() => getCurrentUser(), [])

    const getCurrentUser = async () => {
        const object = await Storage.getUser()
        setCurrentUser(object)
        getUser(object)
    }

    const getUser = user => {
        StorageUser.getUser(route.params.id)
            .then(data => {
                setUser(data)
                configPermission(user)
                setLoading(false)
            })
            .catch(status => modal.configErrorModal({ status }))
    }

    const getAge = () =>
        new Date().getFullYear() - user.birth_date.split("-")[0]

    const configPermission = user => {
        const category = user.category;
        let indicate = Boolean(category === "Teacher")
        let request = Boolean(category === "Company" || category === "Internship Coordinator")
        setPermission({ indicate, request })
    }

    const openLink = async url => {
        const supported = await Linking.canOpenURL(url);
        supported && await Linking.openURL(url);
    }

    const unFormatDate = date =>
        date ? date.split("-").reverse().join("/") : null


    const unFormatHour = hour =>
        hour ? hour.split(":")[0] : null


    const renderItemNetwork = (item, index) =>
        <View style={styles.containerItem} key={String(index)}>
            <TextDefault
                children={item.name}
                styleText={styles.txtTitle} />
            <TextDefault
                children={item.url}
                onPress={() => openLink(item.url)}
                styleText={styles.txtSubtitleLink} />
        </View>

    const renderItemLanguage = (item, index) =>
        <View style={styles.containerItem} key={String(index)}>
            <TextDefault
                styleText={styles.txtTitle}
                children={item.language} />
            <TextDefault
                children={item.level}
                styleText={styles.txtSubtitle} />
        </View>

    const renderItemProject = (item, index) =>
        <View style={styles.containerItem} key={String(index)}>
            <TextDefault
                children={item.name}
                styleText={styles.txtTitle} />
            {
                Boolean(item.url) &&
                <TextDefault
                    children={item.url}
                    onPress={() => openLink(item.url)}
                    styleText={styles.txtSubtitleLink} />
            }
            {
                Boolean(item.description) &&
                <TextDefault
                    children={item.description}
                    styleText={styles.txtSubtitle} />
            }
        </View>


    const renderItemFormation = (item, index) =>
        <View style={styles.containerItem} key={String(index)}>
            <TextDefault
                children={item.title}
                styleText={styles.txtTitle} />
            {
                Boolean(item.subtitle) &&
                <TextDefault
                    children={item.subtitle}
                    styleText={styles.txtSubtitle} />
            }
            <View style={styles.containerRow}>
                <TextDefault
                    children={unFormatDate(item.start_year)}
                    styleText={styles.txtSubtitleRow} />
                <TextDefault
                    styleText={styles.txtSubtitleRow}
                    children={item.endYear ? unFormatDate(item.endYear) : "Em andamento"} />
                {
                    Boolean(item.workload) &&
                    <TextDefault
                        styleText={styles.txtSubtitleRow}
                        children={unFormatHour(item.workload) + "h"} />
                }
            </View>
        </View>

    const renderItemExperience = (item, index) =>
        <View style={styles.containerItem} key={String(index)}>
            <TextDefault
                children={item.job}
                styleText={styles.txtTitle} />
            <TextDefault
                children={item.company}
                styleText={styles.txtSubtitle} />
            <View style={styles.containerRow}>
                <TextDefault
                    children={unFormatDate(item.start_year)}
                    styleText={styles.txtSubtitleRow} />
                <TextDefault
                    styleText={styles.txtSubtitleRow}
                    children={item.endYear ? unFormatDate(item.end_year) : "Presente"} />
            </View>
        </View>

    const choiceVacancy = () =>
        navigation.navigate("Vacancies", { student: user.id })

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
                    children={user.phone}
                    styleText={styles.txtCourse} />
                <TextDefault
                    children={"Email"}
                    styleText={styles.txtSubtitleLink} />
                <TextDefault
                    children={user.email}
                    styleText={styles.txtCourse} />
            </ModalBottom>
            <Screen center={false}>
                {
                    loading ?
                        <Load backgroundColor={Colors.background} />
                        :
                        <>
                            <View style={styles.containerHeader}>
                                <ImagePicker image={user.image} disabled />
                                <TextDefault
                                    children={user.name}
                                    styleText={styles.txtName} />
                                <TextDefault
                                    styleText={styles.txtCourse}
                                    children={user.studying} />
                                <TextDefault
                                    styleText={styles.txtAddress}
                                    children={`${user.city}-${user.state}`} />
                                <View style={styles.containerButtons}>
                                    {
                                        Boolean(permission.request || permission.indicate) &&
                                        <ButtonSmall
                                            onPress={choiceVacancy}
                                            text={permission.indicate ? "INDICAR" : "SOLICITAR"}
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
                                    children={`${getAge()} anos`}
                                    styleText={styles.txtText} />
                                <TextDefault
                                    lines={0}
                                    children={user.description ? user.description : 'Sem descrição sobre o aluno.'}
                                    styleText={styles.txtText} />
                                {
                                    user.languages.length > 0 &&
                                    <>
                                        <TextDefault
                                            children={"Idiomas"}
                                            styleText={styles.txtTopic} />
                                        {
                                            user.languages.map((item, index) => renderItemLanguage(item, index))
                                        }
                                    </>

                                }
                                {
                                    user.social_networks.length > 0 &&
                                    <>
                                        <TextDefault
                                            children={"Redes"}
                                            styleText={styles.txtTopic} />
                                        {
                                            user.social_networks.map((item, index) => renderItemNetwork(item, index))
                                        }
                                    </>

                                }
                                {
                                    user.formations.length > 0 &&
                                    <>
                                        <TextDefault
                                            children={"Formações"}
                                            styleText={styles.txtTopic} />
                                        {
                                            user.formations.map((item, index) => renderItemFormation(item, index))
                                        }
                                    </>

                                }
                                {
                                    user.experiences.length > 0 &&
                                    <>
                                        <TextDefault
                                            children={"Experiências"}
                                            styleText={styles.txtTopic} />
                                        {
                                            user.experiences.map((item, index) => renderItemExperience(item, index))
                                        }
                                    </>

                                }
                                {
                                    user.projects.length > 0 &&
                                    <>
                                        <TextDefault
                                            children={"Projetos"}
                                            styleText={styles.txtTopic} />
                                        {
                                            user.projects.map((item, index) => renderItemProject(item, index))
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