import styles from './style';

import React from 'react';

import { Input, ButtonDefault, TextDefault, Screen } from '../../../helpers';


export const AddressRegister = (props) => {

    const params = props.route.params;

    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [road, setRoad] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [number, setNumber] = React.useState("");

    React.useEffect(() => getDefaultValues(), [])

    const nextStage = () => {
        const data = {
            city: city,
            state: state,
            road: road,
            district: district,
            number: number,
            ...params,
        }
        const screen = params.category == "Student" ? "ResumeRegister" : "ChangePassword"
        props.navigation.navigate(screen, data);
    }

    const getDefaultValues = () => {
        if (params && params.data) {
            setCity(params.data.city)
            setState(params.data.state)
            setRoad(params.data.road)
            setDistrict(params.data.district)
            setNumber(params.data.number)
        }
    }

    const buttonActive = () =>
        Boolean(city && state && road && district && number)

    return (
        <Screen>
                <TextDefault
                    style={styles.logo}
                    children={"Fatec +"}
                    styleText={styles.txtLogo} />
                <Input
                    text={city}
                    defaultValue={city}
                    iconLib={"Entypo"}
                    iconName={"address"}
                    placeholder={"Cidade"}
                    capitalize={"sentences"}
                    onchange={text => setCity(text)} />
                <Input
                    text={state}
                    maxLength={2}
                    iconLib={"Entypo"}
                    defaultValue={state}
                    iconName={"address"}
                    placeholder={"Estado"}
                    capitalize={"characters"}
                    onchange={text => setState(text)} />
                <Input
                    text={district}
                    iconLib={"Entypo"}
                    iconName={"address"}
                    defaultValue={district}
                    placeholder={"Bairro"}
                    capitalize={"sentences"}
                    onchange={text => setDistrict(text)} />
                <Input
                    text={road}
                    iconLib={"Entypo"}
                    defaultValue={road}
                    placeholder={"Rua"}
                    iconName={"address"}
                    capitalize={"sentences"}
                    onchange={text => setRoad(text)} />
                <Input
                    text={number}
                    type={"numeric"}
                    iconLib={"Entypo"}
                    iconName={"address"}
                    defaultValue={number}
                    placeholder={"Número"}
                    onchange={text => setNumber(text)} />
                <ButtonDefault
                    text={"Próximo"}
                    onPress={nextStage}
                    active={buttonActive()} />
           </Screen>
    );
};