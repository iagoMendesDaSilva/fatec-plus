import styles from './style';

import React from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';

import mapStyle from '../../../assets/mapStyle.json';
import { Input, ButtonDefault, TextDefault, Screen, AddressInput } from '../../../helpers';


export const AddressRegister = (props) => {

    const params = props.route.params;

    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [road, setRoad] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [number, setNumber] = React.useState("");
    const[location, setLocation] = React.useState({lat:-22.217583, lng:-49.950523});

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

    const changeMap = place => {
        const { lat, lng } = place.result.geometry.location;
        setLocation({lat, lng})
    }

    return (
        <View style={styles.containerAll}>


            <AddressInput onSelect={place => changeMap(place)} />
            <MapView
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >
            </MapView>
        </View >
    );
};