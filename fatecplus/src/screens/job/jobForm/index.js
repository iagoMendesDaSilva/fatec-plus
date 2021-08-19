
import styles from './style';

import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import Colors from '~colors';
import Strings from '~strings';
import { Calendar } from '~services';
import { ModalContext } from '~contexts';
import { StorageVacancy } from './storage';
import { Benefit, Requirement } from './forms';
import { Screen, Input, SwicthDefault, TextDefault, TextArea, DatePickerDefault, ButtonDefault, ContractedList, Arrow } from '~components';

export const JobForm = ({ navigation, route }) => {

    const params = route.params
    const modal = useContext(ModalContext);

    const [job, setJob] = useState(false)
    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [picker, setPicker] = useState(false);
    const [loading, setLoading] = useState(false)
    const [receive, setReceive] = useState(false);
    const [date, setDate] = useState(new Date())
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("")
    const [internship, setInternship] = useState(false)
    const [benefits, setBenefits] = useState({ data: [], visible: false, index: false })
    const [requirements, setRequirements] = useState({ data: [], visible: false, index: false })

    useEffect(() => getDefaultValues(), [])

    const getDefaultValues = () => {
        if (params) {
            StorageVacancy.getVacancy(params.id)
                .then(data => configVacancy(data.job))
                .catch(status => modal.set({ status, back:true }))
        }
    }

    const configVacancy = data => {
        setJob(data.job)
        setName(data.name)
        setDeadline(data.date)
        setInternship(data.internship)
        setSubject(data.subject_email)
        setDescription(data.description)
        setReceive(data.receive_by_email)
        setBenefits({ data: data.benefits, visible: false, index: false })
        setRequirements({ data: data.requirements, visible: false, index: false })
    }

    const pressButton = () => {
        setLoading(true)
        params ? editVacancy() : saveVacancy()
    }

    const editVacancy = () => {
        StorageVacancy.editVacancy(name, Calendar.unFormat(deadline), internship, job, receive, subject, description, params.id)
            .then(data =>
                modal.set({ msg: Strings.UPDATED, back:true }))
            .catch(status => modal.set({ status }))
            .finally(() => setLoading(false))
    }

    const saveVacancy = () => {
        StorageVacancy.saveVacancy(name, Calendar.unFormat(deadline), internship, job, receive, subject, description, benefits.data, requirements.data)
            .then(data =>
                modal.set({ msg: Strings.CREATED_VACANCY, back:true }))
            .catch(status => modal.set({ status }))
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
                            picker={picker}
                            initialValue={"Sem prazo"}
                            close={() => setPicker(false)}
                            title={Calendar.format(deadline)}
                            onPress={() => setPicker(!picker)}
                            deleteValue={() => setDeadline("")} />

                        {
                            picker &&
                            <DatePicker
                                date={date}
                                mode={"date"}
                                locale={"pt-br"}
                                minimumDate={new Date()}
                                androidVariant={"iosClone"}
                                textColor={Colors.TEXT_PRIMARY}
                                fadeToColor={Colors.BACKGROUND}
                                onDateChange={value => setDate(new Date(value))} />
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
                            items={benefits.data} />
                        <ContractedList
                            title={"Requisitos"}
                            keyArray={'name'}
                            onPress={showFormRequirements}
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
