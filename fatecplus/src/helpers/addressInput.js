import React from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import PlacesInput from 'react-native-places-input';

import Colors from '../constants/colors';
import Values from '../constants/values';

export const AddressInput = ({ onSelect }) => {

    const selectAddress = place => {
        if (onSelect) {
            onSelect(place);
            Keyboard.dismiss();
        }
    }

    return (
        <PlacesInput
            language={"pt-br"}
            clearQueryOnSelect
            queryTypes={"address"}
            stylesList={styles.stylesList}
            stylesItem={styles.stylesItem}
            stylesInput={styles.stylesInput}
            requiredTimeBeforeSearch={100}
            stylesItemText={styles.stylesItemText}
            placeHolder={"Pesquisar endereço"}
            stylesContainer={styles.stylesContainer}
            googleApiKey={Values.google_places_key}
            onSelect={place => selectAddress(place)}
            textInputProps={{ placeholderTextColor: "rgba(255,255,255,.5)" }} />
    );
}

const styles = StyleSheet.create({
    stylesContainer: {
        left: '10%',
        width: "85%",
        borderRadius: 30,
        overflow: "hidden",
    },
    stylesItem: {
        backgroundColor: Colors.background_light,
    },
    stylesItemText: {
        color: "rgba(255,255,255,.75)",
    },
    stylesList: {
        backgroundColor: Colors.background_light,
    },
    stylesInput: {
        height: 45,
        color: "white",
        overflow: "hidden",
        backgroundColor: Colors.background_light,
    },
});