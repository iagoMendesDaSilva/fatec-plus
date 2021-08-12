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
            requiredTimeBeforeSearch={0}
            stylesItemText={styles.stylesItemText}
            placeHolder={"Pesquisar endereço"}
            requiredCharactersBeforeSearch={1}
            stylesContainer={styles.stylesContainer}
            onSelect={place => selectAddress(place)}
            googleApiKey={Values.GOOGLE_PLACES_KEY}
            textInputProps={{ placeholderTextColor: Colors.TEXT_PRIMARY_LIGHT }} />
    );
}

const styles = StyleSheet.create({
    stylesContainer: {
        top: 7,
        left: '10%',
        width: "75%",
        borderRadius: 30,
        overflow: "hidden",
    },
    stylesItem: {
        backgroundColor: Colors.BACKGROUND_LIGHT_PLUS,
    },
    stylesItemText: {
        color: Colors.TEXT_PRIMARY,
    },
    stylesList: {
        backgroundColor: Colors.BACKGROUND_LIGHT_PLUS,
    },
    stylesInput: {
        height: 45,
        overflow: "hidden",
        color: Colors.TEXT_PRIMARY,
        backgroundColor: Colors.BACKGROUND_LIGHT_PLUS,
    },
});
