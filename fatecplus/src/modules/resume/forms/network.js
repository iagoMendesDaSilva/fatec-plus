import React ,{useState,useContext}from 'react';

import { StorageResume } from '../storage';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext';
import { Screen, Note, Input, ButtonDefault, TextDefault } from '../../../helpers';

export const Network = ({ state, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const modal = useContext(ModalContext);

    const [url, setUrl] = useState(hasIndex() ? state.data[state.index].url : "");
    const [name, setName] = useState(hasIndex() ? state.data[state.index].name : "");

    const save = () => {
        StorageResume.saveNetwork(name, url)
            .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
            .catch(status => modal.set({ status }))
    }


    const edit = () => {
        StorageResume.editNetwork(name, url, state.data[state.index].id)
            .then(data => modal.set({ msg: Strings.UPDATED, positivePress: reload }))
            .catch(status => modal.set({ status }))
    }

    const remove = () => {
        StorageResume.deleteNetwork(state.data[state.index].id)
            .then(data => modal.set({ msg: Strings.DELETED_NETWORK, positivePress: reload }))
            .catch(status => modal.set({ status }))
    }

    const pressButton = () =>
        hasIndex() ? edit() : save()


    return (
        <Screen>
            <Note text={Strings.DESCRIPTION_NETWORK} />
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
            <ButtonDefault
                text={"Salvar"}
                onPress={pressButton}
                active={Boolean(name && url)} />
            {
                hasIndex() &&
                <TextDefault
                    onPress={remove}
                    children={"Excluir Rede"} />
            }
        </Screen>
    )
}
