import React from 'react';

import Strings from '../../constants/strings';
import { ButtonDefault, Input, Note, Select, Screen, TextDefault } from '../../helpers';

export const Language = (props) => {

    const params = props.route.params;
    const levels = ["Básico", "Intermediário", "Avançado", "Fluente"]

    const [level, setLevel] = React.useState("");
    const [index, setIndex] = React.useState(null);
    const [language, setLanguage] = React.useState("");

    React.useEffect(() => getValues(), [])

    const send = (exclude = false) => {
        props.navigation.navigate("ResumeRegister", {
            item: {
                index,
                type: "language",
                data: exclude ? null : { level, language },
            }
        })
    }

    const getValues = () => {
        if (params) {
            setIndex(params.index)
            setLevel(params.data.level);
            setLanguage(params.data.language);
        }
    }

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
                onPress={send}
                active={Boolean(language && level)} />
            {
                Boolean(Number.isInteger(index)) &&
                <TextDefault
                    onPress={() => send(true)}
                    children={"Excluir Idioma"} />
            }
        </Screen>
    )
}