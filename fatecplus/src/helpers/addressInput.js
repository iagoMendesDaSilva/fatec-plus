import React from 'react';
import { StyleSheet } from 'react-native';
import PlacesInput from 'react-native-places-input';

import Colors from '../constants/colors';
import Values from '../constants/values';

export const AddressInput = ({ onSelect }) => {

    return (
        <PlacesInput
            language={"pt-br"}
            queryTypes={"address"}
            placeHolder={"Endereço"}
            stylesList={styles.stylesList}
            stylesItem={styles.stylesItem}
            stylesInput={styles.stylesInput}
            requiredTimeBeforeSearch={500}
            stylesItemText={styles.stylesItemText}
            stylesContainer={styles.stylesContainer}
            googleApiKey={Values.google_places_key}
            onSelect={place => onSelect && onSelect(place)}
            textInputProps={{ placeholderTextColor: "rgba(255,255,255,.5)" }} />
    );
}

const styles = StyleSheet.create({
    stylesContainer: {
        left: '10%',
        width: "85%",
    },
    stylesItem: {
        borderColor: "rgba(255,255,255,.5)",
        backgroundColor: Colors.background_light,
    },
    stylesItemText: {
        color: "rgba(255,255,255,.75)",
    },
    stylesList: {
        backgroundColor: Colors.background,
    },
    stylesInput: {
        height: 45,
        color: "white",
        borderRadius: 200,
        backgroundColor: Colors.background_light,
    },
});