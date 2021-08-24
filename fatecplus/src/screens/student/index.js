import styles from './style';

import { View, Linking, SectionList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import Strings from '~strings';
import { StorageUser } from './storage';
import { ModalContext } from '~contexts';
import { Storage, Calendar } from '~services';
import { Screen, TextDefault, ImagePicker, ButtonSmall, Arrow, Load, ModalContact } from '~components'

export const Student = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [user, setUser] = useState(false);
    const [info, setInfo] = useState({ data: [] })
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [permission, setPermission] = useState({ indicate: false, request: false })

    useEffect(() => getCurrentUser(), [])

    const getCurrentUser = async () => {
        const object = await Storage.getUser()
        getUser(object)
    }

    const getUser = user => {
        StorageUser.getUser(route.params.id)
            .then(data => {
                setUser(data)
                configInfo(data)
                configPermission(user)
                setLoading(false)
            })
            .catch(status => modal.set({ status }))
    }

    const configInfo = user => {
        setInfo({
            data: [
                { title: "Idiomas", data: user.languages },
                { title: "Redes", data: user.social_networks },
                { title: "Formações", data: user.formations },
                { title: "Experiências", data: user.experiences },
                { title: "Projetos", data: user.projects },
            ]
        })
    }

    const getAge = () =>
        new Date().getFullYear() - user.birth_date.split("-")[0]

    const configPermission = user => {
        const category = user.category;
        let indicate = Boolean(category === "Teacher")
        let request = Boolean(category === "Company")
        setPermission({ indicate, request })
    }

    const openLink = async url => {
        const supported = await Linking.canOpenURL(url);
        supported ? await Linking.openURL(url) : modal.set({ msg: Strings.ERROR_LINK })
    }

    const choiceVacancy = () =>
        navigation.navigate("Vacancies", { studentId: user.id })

    const pressArrow = () =>
        navigation.navigate("Home", { screen: "Students", params: null })

    const renderItem = (item, index) =>
        <View key={String(index)}>
            <TextDefault
                children={item.name}
                styleText={styles.txtTitle} />
            <TextDefault
                children={item.title}
                styleText={styles.txtTitle} />
            <TextDefault
                children={item.language}
                styleText={styles.txtTitle} />
            <TextDefault
                children={item.job}
                styleText={styles.txtTitle} />
            <TextDefault
                children={item.level}
                styleText={styles.txtSubtitle} />
            <TextDefault
                children={item.url}
                onPress={() => openLink(item.url)}
                styleText={styles.txtSubtitleLink} />
            <TextDefault
                children={item.subtitle}
                styleText={styles.txtSubtitle} />
            <TextDefault
                children={item.company}
                styleText={styles.txtSubtitle} />
            <TextDefault
                lines={0}
                children={item.description}
                styleText={styles.txtSubtitle} />
            {
                Boolean(item.start_year) &&
                <View style={styles.containerRow}>
                    <TextDefault
                        children={Calendar.format(item.start_year)}
                        styleText={styles.txtSubtitleRow} />
                    <TextDefault
                        styleText={styles.txtSubtitleRow}
                        children={item.end_year ? `- ${Calendar.format(item.end_year)}` : "- Presente"} />
                    {
                        Boolean(item.workload) &&
                        <TextDefault
                            styleText={styles.txtSubtitleRow}
                            children={`- ${item.workload}h`} />
                    }
                </View>
            }
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
                email={user.email}
                open={showModal}
                phone={user.phone}
                onClose={() => setShowModal(false)} />
            <Screen center={false}>
                {
                    loading ?
                        <Load />
                        :
                        <>
                            <View style={styles.containerHeader}>
                                <ImagePicker image={user.image} disabled />
                                <TextDefault
                                    children={user.name}
                                    styleText={styles.txtName} />
                                <TextDefault
                                    children={user.studying}
                                    styleText={styles.txtCourse} />
                                <TextDefault
                                    styleText={styles.txtAddress}
                                    children={`${user.city}-${user.state}`} />
                                <View style={styles.containerButtons}>
                                    {
                                        Boolean(permission.request || permission.indicate) &&
                                        <ButtonSmall
                                            style={styles.button}
                                            onPress={choiceVacancy}
                                            text={permission.indicate ? "INDICAR" : "SOLICITAR"} />
                                    }
                                    <ButtonSmall
                                        outline
                                        text={"Contato"}
                                        style={styles.button}
                                        onPress={() => setShowModal(true)} />
                                </View>
                            </View>
                            <View style={styles.containerContent}>
                                <TextDefault
                                    children={"Sobre"}
                                    styleText={styles.txtTopic} />
                                <TextDefault
                                    styleText={styles.txtText}
                                    children={`${getAge()} anos`} />
                                <TextDefault
                                    lines={0}
                                    styleText={styles.txtText}
                                    children={user.description ? user.description : 'Sem descrição sobre o aluno(a).'} />
                                {Boolean(info.data && info.data[0].data.length > 0) &&
                                    <View style={styles.separator} />
                                }
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
