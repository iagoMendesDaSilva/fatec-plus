import React, {useState,useContext} from 'react';
import DatePicker from 'react-native-date-picker';

import Colors from '~colors';
import Strings from '~strings';
import { Calendar } from '~services';
import { ModalContext } from '~contexts';
import { StorageResume } from '../storage';
import { Screen, Note, Input, ButtonDefault, TextDefault, DatePickerDefault } from '~components';

export const Experience = ({ state, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const modal = useContext(ModalContext);

    const [date, setDate] =useState(new Date());
    const [picker, setPicker] =useState({ on: false, start: true });
    const [job, setJob] =useState(hasIndex() ? state.data[state.index].job : "");
    const [company, setCompany] =useState(hasIndex() ? state.data[state.index].company : "");
    const [endYear, setEndYear] =useState(hasIndex() ? state.data[state.index].end_year: "");
    const [startYear, setStartYear] =useState(hasIndex() ? state.data[state.index].start_year : "");

    const changeDate = value => {
        const date = new Date(value)
        setDate(date)
        picker.start ? setStartYear(date) : setEndYear(date);
    }

    const save = () => {
        if (Calendar.isSameOrAfter(startYear, endYear)) {
            StorageResume.saveExperience(job, company, Calendar.unFormat(endYear), Calendar.unFormat(startYear))
                .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
                .catch(status => modal.set({ status }))
        } else
            modal.set({ msg: Strings.ERROR_DATE })
    }

    const edit = () => {
        if (Calendar.isSameOrAfter(startYear, endYear)) {
            StorageResume.editExperience(job, company, Calendar.unFormat(endYear), Calendar.unFormat(startYear), state.data[state.index].id)
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
                close={()=>setPicker(false)}
                initialValue={"Data de iníco"}
                title={Calendar.format(startYear)}
                picker={picker.on && picker.start} 
                deleteValue={() => setStartYear("")}
                onPress={() => setPicker({ on: !picker.on, start: true })} />
            <DatePickerDefault
                close={()=>setPicker(false)}
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
