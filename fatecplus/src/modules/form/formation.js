
import React from 'react';

import Strings from '../../constants/strings';
import DatePicker from 'react-native-date-picker';

import Colors from '../../constants/colors';
import { ButtonDefault, Input, Note, DatePickerDefault, Screen, TextDefault } from '../../helpers';

export const Formation = (props) => {

    const params = props.route.params;

    const [title, setTitle] = React.useState("");
    const [index, setIndex] = React.useState(null);
    const [subTitle, setSubTitle] = React.useState("");
    const [endYear, setEndYear] = React.useState("");
    const [startYear, setStartYear] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [workload, setWorkload] = React.useState("");
    const [picker, setPicker] = React.useState({ on: false, start: true });

    React.useEffect(() => getValues(), [])

    const send = (exclude = false) => {
        props.navigation.navigate("ResumeRegister", {
            item: {
                index,
                type: "formation",
                data: exclude ? null : { title, subTitle, endYear, startYear, workload },
            }
        })
    }

    const getValues = () => {
        if (params) {
            setIndex(params.index)
            setTitle(params.data.title);
            setSubTitle(params.data.subTitle);
            setEndYear(params.data.endYear);
            setStartYear(params.data.startYear);
            setWorkload(params.data.workload);
        }
    }

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
                onPress={send}
                active={Boolean(title && startYear)} />
            {
                Boolean(Number.isInteger(index)) &&
                <TextDefault
                    onPress={() => send(true)}
                    children={"Excluir Formação"} />
            }
        </Screen>
    )
}