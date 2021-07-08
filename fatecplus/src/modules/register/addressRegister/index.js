import styles from './style';

import React from 'react';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import { TouchableOpacity, View, PermissionsAndroid as Permission } from 'react-native';

import Values from '../../../constants/values';
import Strings from '../../../constants/strings';
import mapStyle from '../../../assets/mapStyle.json';
import { ModalContext } from '../../../routes/modalContext';
import { Icon, AddressInput, TextDefault, ButtonDefault } from '../../../helpers';

export const AddressRegister = (props) => {

    Geocoder.init(Values.google_places_key);

    const params = props.route.params;
    const modal = React.useContext(ModalContext);

    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [location, setLocation] = React.useState({ lat: -22.2335121, lng: -49.6461569, name: "" });

    const nextStage = () => {
        const data = {
            city,
            state,
            address: location.name,
            ...params,
        }
        const screen = params.category == "Student" ? "ResumeRegister" : "ChangePassword"
        props.navigation.navigate(screen, data);
    }

    const getCurrentLocation = async () => {
        const granted = await Permission.request(Permission.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (granted === Permission.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                place => getLocation(place.coords.latitude, place.coords.longitude),
                error => modal.configErrorModal({ msg: Strings.currentLocationError, status: 404 }),
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
            .catch(error => modal.configErrorModal({ msg: Strings.locationError, status: 404 }))
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
                        lib={'Ionicons'}
                        name={'location-sharp'} />
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