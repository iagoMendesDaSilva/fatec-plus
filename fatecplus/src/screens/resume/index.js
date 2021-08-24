
import styles from './style';

import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';

import Strings from '~strings';
import { Storage } from '~services';
import { ModalContext } from '~contexts';
import { StorageResume } from './storage';
import { Network, Language, Project, Formation, Experience } from './forms';
import { ContractedList, TextDefault, SwicthDefault, Screen, Note, Arrow, Load } from '~components';

export const Resume = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [job, setJob] = useState(false);
    const [loading, setLoading] = useState(true)
    const [internship, setInternship] = useState(false);
    const [projects, setProjects] = useState({ data: [], visible: false, index: false })
    const [networks, setNetworks] = useState({ data: [], visible: false, index: false })
    const [languages, setLanguages] = useState({ data: [], visible: false, index: false })
    const [formations, setFormations] = useState({ data: [], visible: false, index: false })
    const [experiences, setExperiencies] = useState({ data: [], visible: false, index: false })

    useEffect(() => getDefaultValues(), [])

    const getDefaultValues = async () => {
        const user = await Storage.getUser()
        StorageResume.getUser(user.id)
            .then(data => {
                formatResume(data)
                setLoading(false)
            })
            .catch(status => modal.set({ status, back:true}))
    }

    const formatResume = data => {
        setJob(data.job)
        setInternship(data.internship)
        setProjects({ data: data.projects, visible: false, index: false })
        setLanguages({ data: data.languages, visible: false, index: false })
        setFormations({ data: data.formations, visible: false, index: false })
        setExperiencies({ data: data.experiences, visible: false, index: false })
        setNetworks({ data: data.social_networks, visible: false, index: false })
    }

    const showForm = (index, data, setState) =>
        setState({ data, visible: true, index })

    const pressArrow = () => {
        if (networks.visible || projects.visible || languages.visible || formations.visible || experiences.visible) {
            setProjects({ data: projects.data, visible: false, index: false })
            setLanguages({ data: languages.data, visible: false, index: false })
            setFormations({ data: formations.data, visible: false, index: false })
            setExperiencies({ data: experiences.data, visible: false, index: false })
            setNetworks({ data: networks.data, visible: false, index: false })
        } else
            navigation.goBack()
    }

    const setInternshipSwicth = async value => {
        const user = await Storage.getUser()
        StorageResume.editInternshipUser(value, user.id)
            .then(data => setInternship(value))
            .catch(status => modal.set({ status }))
    }

    const setJobSwitch = async value => {
        const user = await Storage.getUser()
        StorageResume.editJobUser(value, user.id)
            .then(data => setJob(value))
            .catch(status => modal.set({ status }))
    }

    return (
        <>
            <Arrow onPress={pressArrow} />
            <Screen>
                {
                    loading
                        ?
                        <Load />
                        :
                        <>
                            {
                                networks.visible &&
                                <Network
                                    state={networks}
                                    reload={getDefaultValues} />
                            }
                            {
                                languages.visible &&
                                <Language
                                    state={languages}
                                    reload={getDefaultValues} />
                            }
                            {
                                projects.visible &&
                                <Project
                                    state={projects}
                                    reload={getDefaultValues} />
                            }
                            {
                                formations.visible &&
                                <Formation
                                    state={formations}
                                    reload={getDefaultValues} />
                            }
                            {
                                experiences.visible &&
                                <Experience
                                    state={experiences}
                                    reload={getDefaultValues} />
                            }
                            {
                                Boolean(!networks.visible && !projects.visible && !languages.visible && !formations.visible && !experiences.visible) &&
                                <View style={styles.containerContent}>
                                    <View>
                                        <Note text={Strings.DESCRIPTION_RESUME} />
                                        <ContractedList
                                            title={"Redes"}
                                            keyArray={'name'}
                                            items={networks.data}
                                            onPress={index => showForm(index, networks.data, setNetworks)} />
                                        <ContractedList
                                            title={"Idiomas"}
                                            keyArray={'language'}
                                            items={languages.data}
                                            onPress={index => showForm(index, languages.data, setLanguages)} />
                                        <ContractedList
                                            title={"Projetos"}
                                            keyArray={'name'}
                                            items={projects.data}
                                            onPress={index => showForm(index, projects.data, setProjects)} />
                                        <ContractedList
                                            title={"Formações"}
                                            keyArray={'title'}
                                            items={formations.data}
                                            onPress={index => showForm(index, formations.data, setFormations)} />
                                        <ContractedList
                                            title={"Experiências"}
                                            keyArray={'job'}
                                            items={experiences.data}
                                            onPress={index => showForm(index, experiences.data, setExperiencies)} />
                                        <TextDefault
                                            children={"Filtrar vagas por:"}
                                            styleText={styles.txtTitle} />
                                        <View style={styles.containerSwitch}>
                                            <SwicthDefault
                                                on={internship}
                                                changeValue={value => setInternshipSwicth(value)} />
                                            <TextDefault
                                                children={"Estágio"}
                                                style={styles.containerTxtSwitch} />
                                        </View>
                                        <View style={styles.containerSwitch}>
                                            <SwicthDefault
                                                on={job}
                                                changeValue={value => setJobSwitch(value)} />
                                            <TextDefault
                                                children={"Trabalho"}
                                                style={styles.containerTxtSwitch} />
                                        </View>
                                    </View>
                                </View>
                            }
                        </>
                }
            </Screen>
        </>
    );
};
