import React from 'react';
import DatePicker from 'react-native-date-picker';

import { StorageResume } from '../storage';
import Colors from '../../../constants/colors';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext';
import { Screen, Note, Input, ButtonDefault, TextDefault, DatePickerDefault } from '../../../helpers';

export const Experience = ({ state, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const unFormatDate = date =>
        date ? date.split("-").reverse().join("/") : null

    const formatDate = date =>
        date ? date.split("/").reverse().join("-") : null;


    const modal = React.useContext(ModalContext);

    const [date, setDate] = React.useState(new Date());
    const [picker, setPicker] = React.useState({ on: false, start: true });
    const [job, setJob] = React.useState(hasIndex() ? state.data[state.index].job : "");
    const [company, setCompany] = React.useState(hasIndex() ? state.data[state.index].company : "");
    const [endYear, setEndYear] = React.useState(hasIndex() ? unFormatDate(state.data[state.index].end_year) : "");
    const [startYear, setStartYear] = React.useState(hasIndex() ? unFormatDate(state.data[state.index].start_year) : "");

    const dateIsValid = () =>
        Boolean(endYear > startYear || !endYear)

    const changeDate = value => {
        const date = new Date(value)
        const year = String(date.getFullYear())
        let month = String(date.getMonth() + 1)
        let day = String(date.getDate())

        if (day.length === 1) day = "0" + day
        if (month.length === 1) month = "0" + month
        const dateFormated = day + "/" + month + "/" + year

        setDate(date)
        picker.start ? setStartYear(dateFormated) : setEndYear(dateFormated);
    }

    const save = () => {
        if (dateIsValid()) {
            StorageResume.saveExperience(job, company, formatDate(endYear), formatDate(startYear))
                .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
                .catch(status => modal.set({ status }))
        } else
            modal.set({ msg: Strings.ERROR_DATE })
    }

    const edit = () => {
        if (dateIsValid()) {
            StorageResume.editExperience(job, company, formatDate(endYear), formatDate(startYear), state.data[state.index].id)
                .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
                .catch(status => modal.set({ status }))
        } else
            modal.set({ msg: Strings.ERROR_DATE })
    }

    const remove = () => {
        StorageResume.deleteExperience(state.data[state.index].id)
            .then(data => modal.set({ msg: Strings.DELETED_EXPERIENCE, positivePress: reload }))
            .catch(status => modal.set({ status }))
    }

    const pressButton = () =>
        hasIndex() ? edit() : save()

    return (
        <Screen>
            <Note text={Strings.DESCRIPTION_EXPERIENCE} />
            <Input
                text={job}
                maxLength={100}
                defaultValue={job}
                iconName={"pencil"}
                placeholder={"Cargo"}
                onchange={text => setJob(text)}
                iconLib={"MaterialCommunityIcons"} />
            <Input
                text={company}
                maxLength={100}
                iconName={"pencil"}
                placeholder={"Empresa"}
                defaultValue={company}
                onchange={text => setCompany(text)}
                iconLib={"MaterialCommunityIcons"} />
            <DatePickerDefault
                title={startYear}
                initialValue={"Data de iníco"}
                deleteValue={() => setStartYear("")}
                onPress={() => setPicker({ on: !picker.on, start: true })} />
            <DatePickerDefault
                title={endYear}
                initialValue={"Data de término"}
                deleteValue={() => setEndYear("")}
                open={Boolean(picker.on && !picker.start)}
                onPress={() => setPicker({ on: !picker.on, start: false })} />
            {
                picker.on &&
                <DatePicker
                    date={date}
                    mode={"date"}
                    locale={"pt-br"}
                    textColor={Colors.TEXT_PRIMARY}
                    maximumDate={new Date()}
                    androidVariant={"iosClone"}
                    fadeToColor={Colors.BACKGROUND}
                    onDateChange={value => changeDate(value)} />
            }
            <ButtonDefault
                text={"Salvar"}
                onPress={pressButton}
                active={Boolean(job && startYear && company)} />
            {
                hasIndex() &&
                <TextDefault
                    onPress={remove}
                    children={"Excluir Experiência"} />
            }
        </Screen>
    )
}
