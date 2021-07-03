import React from 'react';

import Strings from '../../constants/strings';
import { ButtonDefault, Input, Note, Select, Screen } from '../../helpers';

export const Language = (props) => {

    const params = props.route.params;
    const levels = ["Básico", "Intermediário", "Avançado"]

    const [level, setLevel] = React.useState("");
    const [language, setLanguage] = React.useState("");

    React.useEffect(() => getValues(), [])

    const save = () => {
        props.navigation.navigate("ResumeRegister", {
            item: { type: "language", data: { level, language } }
        })
    }

    const getValues = () => {
        if (params) {
            setLevel(params.level);
            setLanguage(params.language);
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
                onPress={save}
                active={Boolean(language && level)} />
        </Screen>
    )
}