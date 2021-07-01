import styles from './style';

import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import { StorageRegister } from '../storage';
import { ButtonDefault, Select } from '../../../helpers';
import { ModalContext } from '../../../routes/modalContext';


export const ResumeRegister = (props) => {

    const params = props.route.params;
    const modal = React.useContext(ModalContext);

    const [job, setJob] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [courses, setCourses] = React.useState({ data: [] });
    const [course, setCourse] = React.useState("Cursando");
    const [internship, setInternship] = React.useState(false);
    const [projects, setProjects] = React.useState({ data: [] });
    const [networks, setNetworks] = React.useState({ data: [] });
    const [languages, setLanguages] = React.useState({ data: [] });
    const [formations, setFormations] = React.useState({ data: [] });
    const [experiences, setExperiencies] = React.useState({ data: [] });

    React.useEffect(() => {
        getDefaultValues()
        getCourses()
    }, [])

    const formatCourses = data => {
        let courses = [];
        data.forEach(course => courses.push(course.name));
        setCourses({ data: courses })
    }

    const getCourses = () => {
        setLoading(true)
        StorageRegister.getCourses()
            .then(data => formatCourses(data))
            .catch(status => modal.configErrorModal({ status }))
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

    return (
        <View
            style={styles.containerAll}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.containerScroll}>
                {
                    loading
                        ?
                        <ActivityIndicator color={"white"} size={"large"} />
                        :
                        <View>
                            <Select
                                value={course}
                                options={courses.data}
                                changeValue={value => setCourse(value)} />
                            <ButtonDefault
                                text={"Próximo"}
                                onPress={nextStage}
                                active={buttonActive()} />
                        </View>
                }


            </ScrollView>
        </View>
    );
};