import React,{useContext,useState} from 'react';
import DatePicker from 'react-native-date-picker';

import Colors from '~colors';
import Strings from '~strings';
import { Calendar } from '~services';
import { ModalContext } from '~contexts';
import { StorageResume } from '../storage';
import { Screen, Note, Input, ButtonDefault, TextDefault, DatePickerDefault } from '~components';

export const Formation = ({ state, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)


    const modal = useContext(ModalContext);

    const [date, setDate] = useState(new Date());
    const [picker, setPicker] = useState({ on: false, start: true });
    const [title, setTitle] = useState(hasIndex() ? state.data[state.index].title : "");
    const [subTitle, setSubTitle] = useState(hasIndex() ? state.data[state.index].subtitle : "");
    const [workload, setWorkload] = useState(hasIndex() ? String(state.data[state.index].workload) : "");
    const [endYear, setEndYear] = useState(hasIndex() ? state.data[state.index].end_year : "");
    const [startYear, setStartYear] = useState(hasIndex() ? state.data[state.index].start_year : "");

    const changeDate = value => {
        const date = new Date(value)
        setDate(date)
        picker.start ? setStartYear(date) : setEndYear(date);
    }

    const save = () => {
        if (Calendar.isSameOrAfter(startYear,endYear)) {
            StorageResume.saveFormation(title, subTitle, Calendar.unFormat(endYear), Calendar.unFormat(startYear), verifyWorkload(workload) ? workload : null)
                .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
                .catch(status => modal.set({ status }))
        } else
            modal.set({ msg: Strings.ERROR_DATE })
    }

    const edit = () => {
        if (Calendar.isSameOrAfter(startYear,endYear)) {
            StorageResume.editFormation(title, subTitle, Calendar.unFormat(endYear), Calendar.unFormat(startYear), verifyWorkload(workload), state.data[state.index].id)
                .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
                .catch(status => modal.set({ status }))
        } else
            modal.set({ msg: Strings.ERROR_DATE })
    }

    const verifyWorkload = date =>
        Boolean(Number(date)) ? date : null

    const remove = () => {
        StorageResume.deleteFormation(state.data[state.index].id)
            .then(data => modal.set({ msg: Strings.DELETED_FORMATION, positivePress: reload }))
            .catch(status => modal.set({ status }))
    }

    const pressButton = () =>
        hasIndex() ? edit() : save()

    return (
        <Screen>
            <Note text={Strings.DESCRIPTION_FORMATION} />
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
                initialValue={"Data de iníco"}
                close={() => setPicker(false)}
                title={Calendar.format(startYear)}
                picker={picker.on && picker.start}
                deleteValue={() => setStartYear("")}
                onPress={() => setPicker({ on: !picker.on, start: true })} />
            <DatePickerDefault
                close={() => setPicker(false)}
                title={Calendar.format(endYear)}
                initialValue={"Data de término"}
                picker={picker.on && !picker.start}
                deleteValue={() => setEndYear("")}
                open={Boolean(picker.on && !picker.start)}
                onPress={() => setPicker({ on: !picker.on, start: false })} />
            {
                picker.on &&
                <DatePicker
                    date={date}
                    mode={"date"}
                    locale={"pt-br"}
                    maximumDate={new Date()}
                    androidVariant={"iosClone"}
                    textColor={Colors.TEXT_PRIMARY}
                    fadeToColor={Colors.BACKGROUND}
                    onDateChange={value => changeDate(value)} />
            }
            <Input
                mask={"[000]"}
                maxLength={3}
                text={workload}
                type={"numeric"}
                iconLib={"AntDesign"}
                iconName={"calendar"}
                defaultValue={workload}
                placeholder={"Duração (horas)"}
                onchange={text => setWorkload(text)} />
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
