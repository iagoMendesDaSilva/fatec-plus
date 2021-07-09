
import styles from './style';

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Storage } from '../../services';
import Strings from '../../constants/strings';
import { StorageResume } from './storage';
import { ModalContext } from '../../routes/modalContext';
import { Select, ContractedList, TextDefault, SwicthDefault, Screen, ButtonDefault } from '../../helpers';

export const Resume = ({ navigation, route }) => {

    let params = route.params;
    const modal = React.useContext(ModalContext);

    const [job, setJob] = React.useState(false);
    const [course, setCourse] = React.useState("");
    const [loading, setLoading] = React.useState(true)
    const [internship, setInternship] = React.useState(false);
    const [courses, setCourses] = React.useState({ data: [] });
    const [projects, setProjects] = React.useState({ data: [] });
    const [networks, setNetworks] = React.useState({ data: [] });
    const [languages, setLanguages] = React.useState({ data: [] });
    const [formations, setFormations] = React.useState({ data: [] });
    const [experiences, setExperiencies] = React.useState({ data: [] });

    React.useEffect(() => {
        getCourses();
        getValues();
    }, [])

    React.useEffect(() => getItems(), [params])

    const formatCourses = data => {
        let courses = [];
        data.forEach(course => courses.push(course.name));
        setCourses({ data: courses })
    }

    const formatResume = data => {
        setJob(data.job)
        setCourse(data.studying)
        setInternship(data.internship)
        setProjects({ data: data.projects })
        setLanguages({ data: data.languages })
        setFormations({ data: data.formations })
        setExperiencies({ data: data.experiences })
        setNetworks({ data: data.social_network })
    }

    const goBack = (msg, status) =>
        modal.configErrorModal({ msg, status, positivePress: () => navigation.goBack() })

    const getCourses = () => {
        StorageResume.getCourses()
            .then(data => formatCourses(data))
            .catch(status => goBack(Strings.coursesFail, status))
    }

    const getValues = async () => {
        const user = await Storage.getUser()
        user ?
            StorageResume.getUser(user.id)
                .then(data => formatResume(data))
                .catch(status => goBack(Strings.userFail, status))
            :
            goBack(Strings.userFail, 404)
        setLoading(false)
    }

    const showAll = (type, state) =>
        navigation.navigate("ListItems", { type, data: state.data })

    const addItem = type =>
        navigation.navigate(type)

    const editItem = (index, screen, state) =>
        navigation.navigate(screen, { data: state.data[index], index });

    const verifyAddPutDelete = (state, setState, item) => {
        if (Number.isInteger(item.index)) {
            let data = state.data;
            item.data ? data[item.index] = item.data : data.splice(item.index, 1)
            setState({ data })
        } else {
            setState({ data: [...state.data, item.data] })
        }
    }

    const verifyItem = item => {
        switch (item.type) {
            case "project":
                verifyAddPutDelete(projects, setProjects, item)
                break;
            case "network":
                verifyAddPutDelete(networks, setNetworks, item)
                break;
            case "language":
                verifyAddPutDelete(languages, setLanguages, item)
                break;
            case "formation":
                verifyAddPutDelete(formations, setFormations, item)
                break;
            case "experience":
                verifyAddPutDelete(experiences, setExperiencies, item)
                break;
            default:
                console.log("Unknown type " + item);
        }
    }

    const getItems = () => {
        if (params && params.item)
            verifyItem(params.item)
    }

    const buttonActive = () =>
        Boolean(course && Boolean(job || internship))

    const save = () => {
        console.log(1);
    }

    return (
        <Screen >
            {
                loading
                    ?
                    <ActivityIndicator color={"white"} size={"large"} />
                    :
                    <View style={styles.containerContent}>
                        <View>
                            <TextDefault
                                children={"Cursando"}
                                styleText={styles.txtSection}
                                style={styles.containerSection} />
                            <Select
                                value={course}
                                options={courses.data}
                                initialValue={"Escolha seu curso"}
                                changeValue={value => setCourse(value)} />
                            <TextDefault
                                styleText={styles.txtSection}
                                style={styles.containerSection}
                                children={"Informações adicionais"} />
                            <ContractedList
                                title={"Redes"}
                                keyArray={"name"}
                                items={networks.data}
                                addPress={() => addItem("Network")}
                                showAll={() => showAll("Networks", networks)}
                                onPress={index => editItem(index, "Network", networks)} />
                            <ContractedList
                                title={"Idiomas"}
                                keyArray={"language"}
                                items={languages.data}
                                addPress={() => addItem("Language")}
                                showAll={() => showAll("Languages", languages)}
                                onPress={index => editItem(index, "Language", languages)} />
                            <ContractedList
                                title={"Projetos"}
                                keyArray={"name"}
                                items={projects.data}
                                addPress={() => addItem("Project")}
                                showAll={() => showAll("Projects", projects)}
                                onPress={index => editItem(index, "Project", projects)} />
                            <ContractedList
                                keyArray={"title"}
                                title={"Formações"}
                                items={formations.data}
                                addPress={() => addItem("Formation")}
                                showAll={() => showAll("Formations", formations)}
                                onPress={index => editItem(index, "Formation", formations)} />
                            <ContractedList
                                keyArray={"job"}
                                title={"Experiências"}
                                items={experiences.data}
                                addPress={() => addItem("Experience")}
                                showAll={() => showAll("Experiences", experiences)}
                                onPress={index => editItem(index, "Experience", experiences)} />
                            <View style={styles.containerSwitch}>
                                <SwicthDefault
                                    on={internship}
                                    changeValue={value => setInternship(value)} />
                                <TextDefault
                                    children={"Estágio"}
                                    style={styles.containerTxtSwitch} />
                            </View>
                            <View style={styles.containerSwitch}>
                                <SwicthDefault
                                    on={job}
                                    changeValue={value => setJob(value)} />
                                <TextDefault
                                    children={"Trabalho"}
                                    style={styles.containerTxtSwitch} />
                            </View>
                        </View>
                        <ButtonDefault
                            text={"Salvar"}
                            onPress={save}
                            active={buttonActive()} />
                    </View>
            }
        </Screen>
    );
};