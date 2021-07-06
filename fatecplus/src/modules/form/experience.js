
import React from 'react';

import Strings from '../../constants/strings';
import DatePicker from 'react-native-date-picker';

import Colors from '../../constants/colors';
import { ModalContext } from '../../routes/modalContext';
import { ButtonDefault, Input, Note, DatePickerDefault, Screen, TextDefault } from '../../helpers';

export const Experience = (props) => {

    const params = props.route.params;

    const modal = React.useContext(ModalContext);

    const [job, setJob] = React.useState("");
    const [index, setIndex] = React.useState(null);
    const [endYear, setEndYear] = React.useState("");
    const [startYear, setStartYear] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [company, setCompany] = React.useState("");
    const [picker, setPicker] = React.useState({ on: false, start: true });

    React.useEffect(() => getValues(), [])

    const send = (exclude = false) => {
        if (endYear < startYear && endYear)
            modal.configErrorModal({ status: 404, msg: Strings.dateEndFail })
        else {
            props.navigation.navigate("ResumeRegister", {
                item: {
                    index,
                    type: "experience",
                    data: exclude ? null : { job, endYear, startYear, company },
                }
            });
        }
    }

    const getValues = () => {
        if (params) {
            setIndex(params.index)
            setJob(params.data.job);
            setEndYear(params.data.endYear);
            setStartYear(params.data.startYear);
            setCompany(params.data.company);
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

    return (
        <Screen>
            <Note text={Strings.descriptionExperience} />
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
                    textColor={"white"}
                    androidVariant={"iosClone"}
                    fadeToColor={Colors.background}
                    onDateChange={value => changeDate(value)} />
            }
            <ButtonDefault
                text={"Salvar"}
                onPress={send}
                active={Boolean(job && startYear && company)} />
            {
                Boolean(Number.isInteger(index)) &&
                <TextDefault
                    onPress={() => send(true)}
                    children={"Excluir Experiência"} />
            }
        </Screen>
    )
}