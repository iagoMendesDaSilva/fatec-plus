import styles from './style';

import React, { useState } from 'react';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import { TouchableOpacity, View, PermissionsAndroid as Permission } from 'react-native';

import { StorageRegister } from '../storage';
import Values from '../../../constants/values';
import Strings from '../../../constants/strings';
import mapStyle from '../../../assets/mapStyle.json';
import { ModalContext } from '../../../routes/modalContext';
import { Icon, AddressInput, TextDefault, ButtonDefault } from '../../../helpers';

export const AddressRegister = (props) => {

    Geocoder.init(Values.GOOGLE_PLACES_KEY);

    const params = props.route.params;
    const modal = React.useContext(ModalContext);

    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [location, setLocation] = useState({ lat: Values.FATEC_LATITUDE, lng: Values.FATEC_LONGITUDE, name: "" });

    const nextStage = () => {
        const data = {
            address: location.name,
            state: state.toUpperCase(),
            city: city.charAt(0).toUpperCase() + city.slice(1),
            ...params,
        }
        params.data
            ? editAddress(data)
            : props.navigation.navigate("ChangePassword", data);
    }

    const editAddress = async data => {
        StorageRegister.editAddress(data, params.data.id)
            .then(resp => modal.set({ msg: Strings.UPDATED, back: true }))
            .catch(status => modal.set({ status, msg: Strings.ERROR_UPDATE }))
    }

    const getCurrentLocation = async () => {
        const granted = await Permission.request(Permission.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (granted === Permission.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                place => getLocation(place.coords.latitude, place.coords.longitude),
                error => modal.set({ msg: Strings.ERROR_GEOLOCATION, status: 404 }),
                { enableHighAccuracy: true }
            );
        }
    }

    const searchLocation = place => {
        const { lat, lng } = place.result.geometry.location;
        getLocation(lat, lng)
    }

    const getLocation = (lat, lng) => {
        Geocoder.from(lat, lng)
            .then(location => verifyInfoLocation(lat, lng, location))
            .catch(error => modal.set({ msg: Strings.ERROR_GEOLOCATION, status: 404 }))
    }

    const verifyInfoLocation = (lat, lng, location) => {
        const addressValues = getAddressValues(location.results)
        const { state, city, address } = addressValues
        if (state && city && address) {
            setLocation({ lat, lng, name: address })
            setCity(city)
            setState(state)
        } else
            throw new Error("Can't get address.")
    }

    const getAddressValues = data => {
        let city = null;
        let state = null;
        let address = data[0] ? data[0].formatted_address : null;
        data.forEach(item =>
            item.address_components.forEach(address => {
                if (address.types.includes("administrative_area_level_1") && item.types.includes("political"))
                    state = address.short_name
                if (address.types.includes("administrative_area_level_2") && item.types.includes("political"))
                    city = address.short_name
            }))
        return { city, state, address }
    }

    const getRegion = () => {
        return {
            latitude: location.lat,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
            longitude: location.lng,
        }
    }

    return (
        <View style={styles.containerAll}>
            <AddressInput onSelect={place => searchLocation(place)} />
            <TouchableOpacity
                hitSlop={styles.hitSlop}
                style={styles.currentLocation}
                onPress={getCurrentLocation}>
                <Icon
                    size={25}
                    name={'crosshairs-gps'}
                    lib={'MaterialCommunityIcons'} />
            </TouchableOpacity>
            <View style={styles.containerAddress}>
                <Icon
                    size={25}
                    lib={'Ionicons'}
                    name={'location-sharp'} />
                <TextDefault
                    lines={2}
                    styleText={styles.txtAddress}
                    style={styles.containerTxtAddress}
                    children={location.name ? location.name : "Sem localização"} />
                <ButtonDefault
                    style={styles.button}
                    onPress={nextStage}
                    active={Boolean(location.name)}
                    text={params.data ? "Salvar" : "Próximo"} />
            </View>
            <MapView
                style={styles.map}
                region={getRegion()}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE} >
                <MapView.Marker coordinate={{ latitude: location.lat, longitude: location.lng }} />
            </MapView>
        </View >
    );
};
