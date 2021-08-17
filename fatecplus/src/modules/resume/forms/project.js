import React, { useState, useContext } from 'react';

import { StorageResume } from '../storage';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext';
import { Screen, Note, Input, ButtonDefault, TextDefault, TextArea } from '../../../helpers';

export const Project = ({ state, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const modal = useContext(ModalContext);

    const [url, setUrl] = useState(hasIndex() ? state.data[state.index].url : "");
    const [name, setName] = useState(hasIndex() ? state.data[state.index].name : "");
    const [description, setDescription] = useState(hasIndex() ? state.data[state.index].description : "");

    const save = () => {
        StorageResume.saveProject(name, url, description)
            .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
            .catch(status => modal.set({ status }))
    }


    const edit = () => {
        StorageResume.editProject(name, url, description, state.data[state.index].id)
            .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
            .catch(status => modal.set({ status }))
    }

    const remove = () => {
        StorageResume.deleteProject(state.data[state.index].id)
            .then(data => modal.set({ msg: Strings.DELETED_PROJECT, positivePress: reload }))
            .catch(status => modal.set({ status }))
    }

    const pressButton = () =>
        hasIndex() ? edit() : save()


    return (
        <Screen>
            <Note text={Strings.DESCRIPTION_PROJECT} />
            <Input
                text={name}
                maxLength={20}
                defaultValue={name}
                iconName={"pencil"}
                placeholder={"Nome"}
                onchange={text => setName(text)}
                iconLib={"MaterialCommunityIcons"} />
            <Input
                text={url}
                defaultValue={url}
                maxLength={false}
                iconName={"web"}
                placeholder={"URL"}
                onchange={text => setUrl(text)}
                iconLib={"MaterialCommunityIcons"} />
            <TextArea
                text={description}
                placeholder={"Descrição"}
                defaultValue={description}
                onchange={text => setDescription(text)} />
            <ButtonDefault
                text={"Salvar"}
                onPress={pressButton}
                active={Boolean(name)} />
            {
                hasIndex() &&
                <TextDefault
                    onPress={remove}
                    children={"Excluir Projeto"} />
            }
        </Screen>
    )
}
