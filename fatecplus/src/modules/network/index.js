import React from 'react';

import Strings from '../../constants/strings';
import { ButtonDefault, Input, Note, Screen } from '../../helpers';

export const Network = (props) => {

    const params = props.route.params;

    const [url, setUrl] = React.useState("");
    const [name, setName] = React.useState("");

    React.useEffect(() => getValues(), [])

    const save = () => {
        props.navigation.navigate("ResumeRegister", {
            item: { type: "network", data: { name, url } }
        })
    }

    const getValues = () => {
        if (params) {
            setUrl(params.url);
            setName(params.name);
        }
    }

    return (
        <Screen>
            <Note text={Strings.descriptionNetwork} />
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
                onPress={save}
                active={Boolean(name && url)} />
        </Screen>
    )
}