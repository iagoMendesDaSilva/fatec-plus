
import styles from './style';

import React from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import Strings from '../../constants/strings';
import Colors from '../../constants/colors';
import { StorageVacancy } from './storage';
import { Benefit, Requirement } from './form';
import { ModalContext } from '../../routes/modalContext';
import { Screen, Input, SwicthDefault, TextDefault, TextArea, DatePickerDefault, ButtonDefault, ContractedList, Arrow } from '../../helpers';

export const Vacancy = ({ navigation, route }) => {

    const params = route.params
    const modal = React.useContext(ModalContext);

    const [job, setJob] = React.useState(false)
    const [name, setName] = React.useState("")
    const [subject, setSubject] = React.useState("")
    const [picker, setPicker] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [receive, setReceive] = React.useState(false);
    const [date, setDate] = React.useState(new Date())
    const [deadline, setDeadline] = React.useState("");
    const [description, setDescription] = React.useState("")
    const [internship, setInternship] = React.useState(false)
    const [benefits, setBenefits] = React.useState({ data: [], visible: false, index: false })
    const [requirements, setRequirements] = React.useState({ data: [], visible: false, index: false })

    React.useEffect(() => getDefaultValues(), [])

    const getDefaultValues = () => {
        if (params) {
            StorageVacancy.getVacancy(params.id)
                .then(data => configVacancy(data))
                .catch(status => modal.configErrorModal({ status, positivePress: () => navigation.goBack() }))
        }
    }

    const configVacancy = data => {
        setJob(data.job)
        setName(data.name)
        setInternship(data.internship)
        setSubject(data.subject_email)
        setDescription(data.description)
        setReceive(data.receive_by_email)
        setDeadline(unFormatDate(data.date))
        setBenefits({ data: data.benefits, visible: false, index: false })
        setRequirements({ data: data.requirements, visible: false, index: false })
    }

    const changeDate = value => {
        const date = new Date(value)
        const year = String(date.getFullYear())
        let month = String(date.getMonth() + 1)
        let day = String(date.getDate())

        if (day.length === 1) day = "0" + day
        if (month.length === 1) month = "0" + month

        setDate(date)
        setDeadline(day + "/" + month + "/" + year)
    }

    const pressButton = () => {
        setLoading(true)
        params ? editVacancy() : saveVacancy()
    }

    const editVacancy = () => {
        StorageVacancy.editVacancy(name, formatDate(deadline), internship, job, receive, subject, description, params.id)
            .then(data =>
                modal.configErrorModal({ msg: Strings.updated, positivePress: () => navigation.goBack() }))
            .catch(status => modal.configErrorModal({ status }))
            .finally(() => setLoading(false))
    }

    const saveVacancy = () => {
        StorageVacancy.saveVacancy(name, formatDate(deadline), internship, job, receive, subject, description, benefits.data, requirements.data)
            .then(data =>
                modal.configErrorModal({ msg: Strings.createdVacancy, positivePress: () => navigation.goBack() }))
            .catch(status => modal.configErrorModal({ status }))
            .finally(() => setLoading(false))
    }

    const activeButton = () => {
        const email = receive ? Boolean(subject) : true
        return Boolean(name && email && Boolean(internship || job))
    }

    const showFormBenefit = index =>
        setBenefits({ data: benefits.data, visible: true, index })

    const showFormRequirements = index =>
        setRequirements({ data: requirements.data, visible: true, index })

    const pressArrow = () => {
        if (benefits.visible || requirements.visible) {
            setBenefits({ data: benefits.data, index: false, visible: false })
            setRequirements({ data: requirements.data, index: false, visible: false })
        } else
            navigation.goBack()
    }

    const formatDate = date =>
        date ? date.split("/").reverse().join("-") : null;

    const unFormatDate = date =>
        date ? date.split("-").reverse().join("/") : null

    return (
        <>
            <Arrow onPress={pressArrow} />
            <Screen>
                {
                    benefits.visible &&
                    <Benefit
                        state={benefits}
                        setState={setBenefits}
                        reload={getDefaultValues}
                        idJob={params && params.id} />
                }
                {
                    requirements.visible &&
                    <Requirement
                        state={requirements}
                        reload={getDefaultValues}
                        setState={setRequirements}
                        idJob={params && params.id} />
                }
                {
                    !benefits.visible && !requirements.visible &&
                    <>
                        <Input
                            text={name}
                            maxLength={20}
                            iconName={"pencil"}
                            defaultValue={name}
                            placeholder={"Nome"}
                            capitalize={"sentences"}
                            iconLib={"MaterialCommunityIcons"}
                            onchange={text => setName(text)} />

                        <DatePickerDefault
                            title={deadline}
                            initialValue={"Sem prazo"}
                            onPress={() => setPicker(!picker)}
                            deleteValue={() => setDeadline("")} />

                        {
                            picker &&
                            <DatePicker
                                date={date}
                                mode={"date"}
                                locale={"pt-br"}
                                textColor={"white"}
                                minimumDate={new Date()}
                                androidVariant={"iosClone"}
                                fadeToColor={Colors.background}
                                onDateChange={value => changeDate(value)} />
                        }
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
                        <View style={styles.containerSwitch}>
                            <SwicthDefault
                                on={receive}
                                changeValue={value => setReceive(value)} />
                            <TextDefault
                                children={"Receber currículos por email"}
                                style={styles.containerTxtSwitch} />
                        </View>
                        {
                            receive &&
                            <Input
                                text={subject}
                                maxLength={50}
                                iconName={"email"}
                                defaultValue={name}
                                capitalize={"sentences"}
                                iconLib={"MaterialIcons"}
                                placeholder={"Assunto do email"}
                                onchange={text => setSubject(text)} />

                        }
                        <ContractedList
                            title={"Benefícios"}
                            keyArray={'name'}
                            onPress={showFormBenefit}
                            items={benefits.data}
                            items={benefits.data} />
                        <ContractedList
                            title={"Requisitos"}
                            keyArray={'name'}
                            onPress={showFormRequirements}
                            items={requirements.data}
                            items={requirements.data} />
                        <TextArea
                            text={description}
                            defaultValue={description}
                            placeholder={"Descrição"}
                            onchange={value => setDescription(value)} />

                        <ButtonDefault
                            text={"Salvar"}
                            loading={loading}
                            onPress={pressButton}
                            active={activeButton()}
                        />
                    </>
                }
            </Screen>
        </>
    )
}