import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StorageVacancy } from '../storage';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext'
import { Screen, Note, Input, TextArea, ButtonDefault, TextDefault, SwicthDefault, Select } from '../../../helpers';

export const Requirement = ({ state, setState, idJob = false, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const modal = React.useContext(ModalContext);

    const levels = ["Básico", "Intermediário", "Avançado"]

    const [level, setLevel] = React.useState(hasIndex() ? state.data[state.index].level : "");
    const [name, setName] = React.useState(hasIndex() ? state.data[state.index].name : "");
    const [description, setDescription] = React.useState(hasIndex() ? state.data[state.index].description : "");
    const [mandatory, setMandatory] = React.useState(hasIndex() ? state.data[state.index].mandatory : false);


    const save = value => {
        if (idJob) {
            StorageVacancy.saveRequirement(name, description, level, mandatory, idJob)
                .then(data => modal.configErrorModal({ msg: Strings.updated, positivePress: reload }))
                .catch(status => modal.configErrorModal({ status }))
        } else
            setState({ data: [...state.data, value], visible: false, index: false })
    }

    const edit = value => {
        if (idJob) {
            StorageVacancy.editRequirement(name, description, level, mandatory, state.data[state.index].id)
                .then(data => modal.configErrorModal({ msg: Strings.updated, positivePress: reload }))
                .catch(status => modal.configErrorModal({ status }))
        } else {
            let data = state.data
            data[state.index] = value
            setState({ data, visible: false, index: false })
        }
    }

    const remove = () => {
        if (idJob) {
            StorageVacancy.deleteRequirement(state.data[state.index].id)
                .then(data => modal.configErrorModal({ msg: Strings.requirementDeleted, positivePress: reload }))
                .catch(status => modal.configErrorModal({ status }))
        } else {
            let data = state.data
            data.splice(state.index, 1)
            setState({ data, visible: false, index: false })
        }
    }

    const pressButton = () => {
        const value = { name, description, level, mandatory }
        hasIndex() ? edit(value) : save(value)
    }

    return (
        <Screen>
            <Note text={Strings.descriptionRequirement} />
            <Input
                text={name}
                maxLength={30}
                defaultValue={name}
                iconName={"pencil"}
                placeholder={"Nome"}
                capitalize={"sentences"}
                onchange={text => setName(text)}
                iconLib={"MaterialCommunityIcons"} />
            <Select
                value={level}
                iconName={"push-pin"}
                options={levels}
                iconLib={"MaterialIcons"}
                initialValue={"Nível"}
                changeValue={value => setLevel(value)} />
            <View style={styles.containerSwitch}>
                <SwicthDefault
                    on={mandatory}
                    changeValue={value => setMandatory(value)} />
                <TextDefault
                    children={"Obrigatório"}
                    style={styles.containerTxtSwitch} />
            </View>
            <TextArea
                text={description}
                defaultValue={description}
                placeholder={"Descrição"}
                onchange={value => setDescription(value)} />
            <ButtonDefault
                text={"Salvar"}
                onPress={() => pressButton()}
                active={Boolean(name && level)} />
            {
                hasIndex() &&
                <TextDefault
                    onPress={() => remove()}
                    children={"Excluir Benefício"} />
            }
        </Screen>
    )
}
const styles = StyleSheet.create({
    containerSwitch: {
        width: "90%",
        alignItems: "center",
        flexDirection: 'row',
    },
    containerTxtSwitch: {
        marginLeft: 10,
    },
});