import styles from './style';

import React from 'react';
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

    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [location, setLocation] = React.useState({ lat: -22.2335121, lng: -49.6461569, name: "" });

    const nextStage = () => {
        const data = {
            address: location.name,
            state:state.toUpperCase(),
            city:city.charAt(0).toUpperCase() + city.slice(1),
            ...params,
        }
        params.data
        ?   editAddress(data)
        : props.navigation.navigate("ChangePassword", data);
    }

    const editAddress = async data => {
        StorageRegister.editAddress(data, params.data.id)
            .then(data =>
                modal.set({ msg: Strings.UPDATED, positivePress: () => props.navigation.goBack() }))
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

    const getCityandState = data => {
        data.forEach(item => {
            if (item.address_components) {
                item.address_components.forEach(address => {
                    if (address.types.includes("administrative_area_level_1") && item.types.includes("political"))
                        setState(address.short_name)
                    if (address.types.includes("administrative_area_level_2") && item.types.includes("political"))
                        setCity(address.short_name)
                });
            }
        });
    }

    const getLocation = (lat, lng) => {
        Geocoder.from(lat, lng)
            .then(location => {
                getCityandState(location.results)
                setLocation({ lat, lng, name: location.results[0].formatted_address })
            })
            .catch(error => modal.set({ msg: Strings.ERROR_GEOLOCATION, status: 404 }))
    }

    const changeMap = place => {
        const { lat, lng } = place.result.geometry.location;
        getLocation(lat, lng)
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
            <AddressInput
                onSelect={place => changeMap(place)} />
            <View style={styles.containerAddress}>
                <TouchableOpacity
                    hitSlop={styles.hitSlop}
                    onPress={getCurrentLocation}>
                    <Icon
                        size={25}
                        lib={location.name?'Ionicons':'MaterialCommunityIcons'}
                        name={location.name?'location-sharp':'crosshairs-gps'} />
                </TouchableOpacity>
                <TextDefault
                    lines={2}
                    styleText={styles.txtAddress}
                    style={styles.containerTxtAddress}
                    children={location.name ? location.name : "Localização atual"} />
                <ButtonDefault
                    text={"Próximo"}
                    style={styles.button}
                    onPress={nextStage}
                    active={Boolean(location.name)} />
            </View>
            <MapView
                style={styles.map}
                region={getRegion()}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE} >
                <MapView.Marker
                    coordinate={{ latitude: location.lat, longitude: location.lng }} />
            </MapView>
        </View >
    );
};
