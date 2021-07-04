import styles from './style';

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import Strings from '../../../constants/strings';
import { StorageRegister } from '../storage';
import { ModalContext } from '../../../routes/modalContext';
import { ButtonDefault, Select, ContractedList, TextDefault, SwicthDefault, Screen } from '../../../helpers';


export const ResumeRegister = (props) => {

    let params = props.route.params;
    const modal = React.useContext(ModalContext);

    const [job, setJob] = React.useState(false);
    const [course, setCourse] = React.useState("");
    const [loading, setLoading] = React.useState(false)
    const [internship, setInternship] = React.useState(false);
    const [courses, setCourses] = React.useState({ data: [] });
    const [projects, setProjects] = React.useState({ data: [] });
    const [networks, setNetworks] = React.useState({ data: [] });
    const [languages, setLanguages] = React.useState({ data: [] });
    const [formations, setFormations] = React.useState({ data: [] });
    const [experiences, setExperiencies] = React.useState({ data: [] });

    React.useEffect(() => {
        getDefaultValues()
        getCourses()
    }, [])

    React.useEffect(() => {
        getItems()
    }, [params])

    const formatCourses = data => {
        let courses = [];
        data.forEach(course => courses.push(course.name));
        setCourses({ data: courses })
    }

    const getCourses = () => {
        setLoading(true)
        StorageRegister.getCourses()
            .then(data => formatCourses(data))
            .catch(status => modal.configErrorModal({ status: 404, msg: Strings.coursesFail }))
            .finally(() => setLoading(false))
    }

    const nextStage = () => {
        const data = {
            course: course,
            projects: projects,
            networks: networks,
            languages: languages,
            formations: formations,
            experiences: experiences,
            ...params,
        }
        props.navigation.navigate("ChangePassword", data);
    }

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

    const getDefaultValues = () => {
        if (params && params.data) {
            setCourse(params.data.course)
            setProjects({ data: params.data.projects })
            setNetworks({ data: params.data.networks })
            setLanguages({ data: params.data.languages })
            setFormations({ data: params.data.formations })
            setExperiencies({ data: params.data.experiences })
        }

    }

    const buttonActive = () =>
        Boolean(course && Boolean(job || internship))

    const addItem = type =>
        props.navigation.navigate(type)

    const editItem = (index, screen, state) =>
        props.navigation.navigate(screen, { data: state.data[index], index });

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
                                showAll={() => props.navigation.navigate("ListItems", { type: "Networks", data: networks.data })}
                                onPress={index => editItem(index, "Network", networks)}
                                addPress={() => addItem("Network")} />
                            <ContractedList
                                title={"Idiomas"}
                                keyArray={"language"}
                                items={languages.data}
                                showAll={() => console.log(1)}
                                onPress={index => editItem(index, "Language", languages)}
                                addPress={() => addItem("Language")} />
                            <ContractedList
                                title={"Projetos"}
                                keyArray={"name"}
                                items={projects.data}
                                showAll={() => console.log(1)}
                                onPress={index => editItem(index, "Project", projects)}
                                addPress={() => addItem("Project")} />
                            <ContractedList
                                keyArray={"title"}
                                title={"Formações"}
                                items={formations.data}
                                showAll={() => console.log(1)}
                                onPress={index => editItem(index, "Formation", formations)}
                                addPress={() => addItem("Formation")} />
                            <ContractedList
                                keyArray={"job"}
                                title={"Experiências"}
                                items={experiences.data}
                                showAll={() => console.log(1)}
                                onPress={index => editItem(index, "Experience", experiences)}
                                addPress={() => addItem("Experience")} />
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
                            text={"Próximo"}
                            onPress={nextStage}
                            active={buttonActive()} />
                    </View>
            }
        </Screen>
    );
};