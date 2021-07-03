
import React from 'react';

import Strings from '../../constants/strings';
import { ButtonDefault, Input, Note, TextArea, Screen } from '../../helpers';

export const Project = (props) => {

    const params = props.route.params;

    const [url, setUrl] = React.useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => getValues(), [])

    const save = () => {
        props.navigation.navigate("ResumeRegister", {
            item: { type: "project", data: { name, url, description } }
        })
    }

    const getValues = () => {
        if (params) {
            setUrl(params.url);
            setName(params.name);
            setDescription(params.description);
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
                    onPress={save}
                    active={Boolean(name)} />
        </Screen>
    )
}