import React from 'react';

import { StorageResume } from '../storage';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext';
import { Screen, Note, Input, ButtonDefault, TextDefault, TextArea } from '../../../helpers';

export const Project = ({ state, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const modal = React.useContext(ModalContext);

    const [url, setUrl] = React.useState(hasIndex() ? state.data[state.index].url : "");
    const [name, setName] = React.useState(hasIndex() ? state.data[state.index].name : "");
    const [description, setDescription] = React.useState(hasIndex() ? state.data[state.index].description : "");

    const save = () => {
        StorageResume.saveProject(name, url, description)
            .then(data => modal.configErrorModal({ msg: Strings.updated, positivePress: reload }))
            .catch(status => modal.configErrorModal({ status }))
    }


    const edit = () => {
        StorageResume.editProject(name, url, description, state.data[state.index].id)
            .then(data => modal.configErrorModal({ msg: Strings.updated, positivePress: reload }))
            .catch(status => modal.configErrorModal({ status }))
    }

    const remove = () => {
        StorageResume.deleteProject(state.data[state.index].id)
            .then(data => modal.configErrorModal({ msg: Strings.projectDeleted, positivePress: reload }))
            .catch(status => modal.configErrorModal({ status }))
    }

    const pressButton = () =>
        hasIndex() ? edit() : save()


    return (
        <Screen>
            <Note text={Strings.descriptionProject} />
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