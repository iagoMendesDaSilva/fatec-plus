import React from 'react';

import Strings from '../../constants/strings';
import { ButtonDefault, Input, Note, Screen, TextDefault } from '../../helpers';

export const Network = (props) => {

    const params = props.route.params;

    const [url, setUrl] = React.useState("");
    const [name, setName] = React.useState("");
    const [index, setIndex] = React.useState(null);

    React.useEffect(() => getValues(), [])

    const send = (exclude = false) => {
        props.navigation.navigate("ResumeRegister", {
            item: {
                index,
                type: "network",
                data: exclude ? null : { name, url },
            }
        })
    }

    const getValues = () => {
        if (params) {
            setUrl(params.data.url);
            setIndex(params.index);
            setName(params.data.name);
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
                onPress={send}
                active={Boolean(name && url)} />
            {
                Boolean(Number.isInteger(index)) &&
                <TextDefault
                    onPress={() => send(true)}
                    children={"Excluir Rede"} />
            }
        </Screen>
    )
}