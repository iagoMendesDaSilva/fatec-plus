
import React from 'react';

import Strings from '../../constants/strings';
import { ButtonDefault, Input, Note, TextArea, Screen, TextDefault } from '../../helpers';

export const Project = (props) => {

    const params = props.route.params;

    const [url, setUrl] = React.useState("");
    const [name, setName] = React.useState("");
    const [index, setIndex] = React.useState(null);
    const [description, setDescription] = React.useState("");

    React.useEffect(() => getValues(), [])

    const send = (exclude = false) => {
        props.navigation.navigate("ResumeRegister", {
            item: {
                index,
                type: "project",
                data: exclude ? null : { name, url, description },
            }
        })
    }

    const getValues = () => {
        if (params) {
            setUrl(params.data.url);
            setIndex(params.index);
            setName(params.data.name);
            setDescription(params.data.description);
        }
    }

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
                onPress={send}
                active={Boolean(name)} />
            {
                Boolean(Number.isInteger(index)) &&
                <TextDefault
                    onPress={() => send(true)}
                    children={"Excluir Projeto"} />
            }
        </Screen>
    )
}