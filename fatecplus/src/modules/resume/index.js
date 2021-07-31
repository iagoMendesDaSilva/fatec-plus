
import styles from './style';

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Storage } from '../../services';
import { StorageResume } from './storage';
import Strings from '../../constants/strings';
import { ModalContext } from '../../routes/modalContext';
import { Network, Language, Project, Formation, Experience } from './form';
import { ContractedList, TextDefault, SwicthDefault, Screen, Note, Arrow } from '../../helpers';

export const Resume = ({ navigation, route }) => {

    const modal = React.useContext(ModalContext);

    const [job, setJob] = React.useState(false);
    const [loading, setLoading] = React.useState(true)
    const [internship, setInternship] = React.useState(false);
    const [projects, setProjects] = React.useState({ data: [], visible: false, index: false })
    const [networks, setNetworks] = React.useState({ data: [], visible: false, index: false })
    const [languages, setLanguages] = React.useState({ data: [], visible: false, index: false })
    const [formations, setFormations] = React.useState({ data: [], visible: false, index: false })
    const [experiences, setExperiencies] = React.useState({ data: [], visible: false, index: false })

    React.useEffect(() => getDefaultValues(), [])

    const getDefaultValues = async () => {
        const user = await Storage.getUser()
        StorageResume.getUser(user.id)
            .then(data => {
                formatResume(data)
                setLoading(false)
            })
            .catch(status => modal.configErrorModal({ status, positivePress: () => navigation.goBack() }))
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
            .catch(status => modal.configErrorModal({status}))
    }

    const setJobSwitch = async value => {
        const user = await Storage.getUser()
        StorageResume.editJobUser(value, user.id)
            .then(data => setJob(value))
            .catch(status =>  modal.configErrorModal({status}))
    }

    return (
        <>
            <Arrow onPress={pressArrow} />
            <Screen>
                {
                    loading
                        ?
                        <ActivityIndicator color={"white"} size={"large"} />
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
                                        <Note text={Strings.descriptionResume} />
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