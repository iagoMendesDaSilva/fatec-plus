import React from 'react';

import Strings from '../../../constants/strings';
import { Screen, Note, Input, TextArea, ButtonDefault, TextDefault } from '../../../helpers';

export const Benefit = ({ state, setState }) => {

    const hasIndex = () =>
        Number.isInteger(state.index)

    const [name, setName] = React.useState(hasIndex() ? state.data[state.index].name : "");
    const [description, setDescription] = React.useState(hasIndex() ? state.data[state.index].description : "");


    const save = value =>
        setState({ data: [...state.data, value], visible: false, index: false })


    const edit = value => {
        let data = state.data
        data[state.index] = value
        setState({ data, visible: false, index: false })
    }

    const remove = () => {
        let data = state.data
        data.splice(state.index, 1)
        setState({ data, visible: false, index: false })
    }

    const pressButton = () => {
        const value = { name, description }
        hasIndex() ? edit(value) : save(value)
    }

    return (
        <Screen>
            <Note text={Strings.descriptionBenefit} />
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