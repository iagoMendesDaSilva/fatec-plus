import React, {useContext,useState} from 'react';

import Strings from '~strings';
import { ModalContext } from '~contexts';
import { StorageVacancy } from '../storage';
import { Screen, Note, Input, TextArea, ButtonDefault, TextDefault } from '~components';

export const Benefit = ({ state, setState, idJob = false, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const modal = useContext(ModalContext);

    const [name, setName] = useState(hasIndex() ? state.data[state.index].name : "");
    const [description, setDescription] = useState(hasIndex() ? state.data[state.index].description : "");


    const save = value => {
        if (idJob) {
            StorageVacancy.saveBenefit(name, description, idJob)
                .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
                .catch(status => modal.set({ status }))
        } else
            setState({ data: [...state.data, value], visible: false, index: false })
    }


    const edit = value => {
        if (idJob) {
            StorageVacancy.editBenefit(name, description, state.data[state.index].id)
            .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
            .catch(status => modal.set({ status }))
        } else {
            let data = state.data
            data[state.index] = value
            setState({ data, visible: false, index: false })
        }
    }

    const remove = () => {
        if(idJob){
            StorageVacancy.deleteBenefit(state.data[state.index].id)
            .then(data => modal.set({ msg: Strings.DELETED_BENEFIT, positivePress: reload }))
            .catch(status => modal.set({ status }))
        }else{
            let data = state.data
            data.splice(state.index, 1)
            setState({ data, visible: false, index: false })
        }
    }

    const pressButton = () => {
        const value = { name, description }
        hasIndex() ? edit(value) : save(value)
    }

    return (
        <Screen>
            <Note text={Strings.DESCRIPTION_BENEFIT} />
            <Input
                text={name}
                maxLength={30}
                defaultValue={name}
                iconName={"pencil"}
                placeholder={"Nome"}
                capitalize={"sentences"}
                onchange={text => setName(text)}
                iconLib={"MaterialCommunityIcons"} />
            <TextArea
                text={description}
                defaultValue={description}
                placeholder={"Descrição"}
                onchange={value => setDescription(value)} />
            <ButtonDefault
                text={"Salvar"}
                onPress={() => pressButton()}
                active={Boolean(name)} />
            {
                hasIndex() &&
                <TextDefault
                    onPress={() => remove()}
                    children={"Excluir Benefício"} />
            }
        </Screen>
    )
}
