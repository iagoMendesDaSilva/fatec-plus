import React from 'react';
import DatePicker from 'react-native-date-picker';

import { StorageResume } from '../storage';
import Colors from '../../../constants/colors';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext';
import { Screen, Note, Input, ButtonDefault, TextDefault, DatePickerDefault } from '../../../helpers';

export const Formation = ({ state, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const unFormatDate = date =>
        date ? date.split("-").reverse().join("/") : null

    const formatDate = date =>
        date ? date.split("/").reverse().join("-") : null;

    const unFormatHour = hour =>
        hour ? hour.split(":")[0] : null

    const FormatHour = hour =>
        hour ? `${hour}:00:00` : null

    const modal = React.useContext(ModalContext);

    const [date, setDate] = React.useState(new Date());
    const [picker, setPicker] = React.useState({ on: false, start: true });
    const [title, setTitle] = React.useState(hasIndex() ? state.data[state.index].title : "");
    const [subTitle, setSubTitle] = React.useState(hasIndex() ? state.data[state.index].subtitle : "");
    const [endYear, setEndYear] = React.useState(hasIndex() ? unFormatDate(state.data[state.index].end_year) : "");
    const [startYear, setStartYear] = React.useState(hasIndex() ? unFormatDate(state.data[state.index].start_year) : "");
    const [workload, setWorkload] = React.useState(hasIndex() ? unFormatHour(state.data[state.index].workload) : "");

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

    const changeTime = value => {
        value === '' && setWorkload(value)
        if ((/^\d+$/.test(value)) && Number(value))
            setWorkload(value)
    }

    const save = () => {
        if (dateIsValid()) {
            StorageResume.saveFormation(title, subTitle, formatDate(endYear), formatDate(startYear), FormatHour(workload))
                .then(data => modal.configErrorModal({ msg: Strings.updated, positivePress: reload }))
                .catch(status => modal.configErrorModal({ status }))
        } else
            modal.configErrorModal({ msg: Strings.dateEndFail })
    }

    const edit = () => {
        if (dateIsValid()) {
            StorageResume.editFormation(title, subTitle, formatDate(endYear), formatDate(startYear), FormatHour(workload), state.data[state.index].id)
                .then(data => modal.configErrorModal({ msg: Strings.updated, positivePress: reload }))
                .catch(status => modal.configErrorModal({ status }))
        } else
            modal.configErrorModal({ msg: Strings.dateEndFail })
    }

    const remove = () => {
        StorageResume.deleteFormation(state.data[state.index].id)
            .then(data => modal.configErrorModal({ msg: Strings.benefitDeleted, positivePress: reload }))
            .catch(status => modal.configErrorModal({ status }))
    }

    const pressButton = () =>
        hasIndex() ? edit() : save()

    return (
        <Screen>
            <Note text={Strings.descriptionFormation} />
            <Input
                text={title}
                maxLength={100}
                defaultValue={title}
                iconName={"pencil"}
                placeholder={"Título"}
                onchange={text => setTitle(text)}
                iconLib={"MaterialCommunityIcons"} />
            <Input
                text={subTitle}
                maxLength={100}
                iconName={"pencil"}
                placeholder={"Subtítulo"}
                defaultValue={subTitle}
                onchange={text => setSubTitle(text)}
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
                    textColor={"white"}
                    maximumDate={new Date()}
                    androidVariant={"iosClone"}
                    fadeToColor={Colors.background}
                    onDateChange={value => changeDate(value)} />
            }
            <Input
                maxLength={3}
                text={workload}
                type={"numeric"}
                iconLib={"AntDesign"}
                iconName={"calendar"}
                defaultValue={workload}
                placeholder={"Duração (horas)"}
                onchange={text => changeTime(text)} />
            <ButtonDefault
                text={"Salvar"}
                onPress={pressButton}
                active={Boolean(title && startYear)} />
            {
                hasIndex() &&
                <TextDefault
                    onPress={remove}
                    children={"Excluir Formação"} />
            }
        </Screen>
    )
}