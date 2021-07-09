import { View,Text } from 'react-native';
import React, { useState, useEffect } from 'react';


export const Vacancies =  ({navigation}) => {


    return (
        <View>
            <Text onPress={()=>navigation.navigate("Resume")}>vagas</Text>
        </View>
    );
};