import React from 'react';

import { StorageResume } from '../storage';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext';
import { Screen, Note, Input, ButtonDefault, TextDefault , Select} from '../../../helpers';

export const Language = ({ state, reload }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const modal = React.useContext(ModalContext);
    const levels = ["Básico", "Intermediário", "Avançado", "Fluente"]

    const [level, setLevel] = React.useState(hasIndex() ? state.data[state.index].level : "");
    const [language, setLanguage] = React.useState(hasIndex() ? state.data[state.index].language : "");

    const save = () => {
        StorageResume.saveLanguage(level, language)
            .then(data => modal.configErrorModal({ msg: Strings.updated, positivePress: reload }))
            .catch(status => modal.configErrorModal({ status }))
    }


    const edit = () => {
        StorageResume.editLanguage(level, language, state.data[state.index].id)
            .then(data => modal.configErrorModal({ msg: Strings.updated, positivePress: reload }))
            .catch(status => modal.configErrorModal({ status }))
    }

    const remove = () => {
        StorageResume.deleteLanguage(state.data[state.index].id)
            .then(data => modal.configErrorModal({ msg: Strings.languageDeleted, positivePress: reload }))
            .catch(status => modal.configErrorModal({ status }))
    }

    const pressButton = () =>
        hasIndex() ? edit() : save()


    return (
        <Screen>
            <Note text={Strings.descriptionLanguage} />
            <Input
                text={language}
                iconName={"pencil"}
                placeholder={"Idioma"}
                defaultValue={language}
                iconLib={"MaterialCommunityIcons"}
                onchange={text => setLanguage(text)} />
            <Select
                value={level}
                options={levels}
                initialValue={"Level"}
                changeValue={value => setLevel(value)} />
            <ButtonDefault
                text={"Salvar"}
                onPress={pressButton}
                active={Boolean(language && level)} />
            {
                hasIndex() &&
                <TextDefault
                    onPress={remove}
                    children={"Excluir Idioma"} />
            }
        </Screen>
    )
}