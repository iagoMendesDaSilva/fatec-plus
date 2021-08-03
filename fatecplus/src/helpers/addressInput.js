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
            stylesList={styles.stylesList}
            stylesItem={styles.stylesItem}
            stylesInput={styles.stylesInput}
            requiredTimeBeforeSearch={100}
            stylesItemText={styles.stylesItemText}
            placeHolder={"Pesquisar endereço"}
            stylesContainer={styles.stylesContainer}
            googleApiKey={Values.GOOGLE_PLACES_KEY}
            onSelect={place => selectAddress(place)}
            textInputProps={{ placeholderTextColor: Colors.TEXT_PRIMARY_LIGHT }} />
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
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    stylesItemText: {
        color: Colors.TEXT_PRIMARY,
    },
    stylesList: {
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
    stylesInput: {
        height: 45,
        color: Colors.TEXT_PRIMARY,
        overflow: "hidden",
        backgroundColor: Colors.BACKGROUND_LIGHT,
    },
});
