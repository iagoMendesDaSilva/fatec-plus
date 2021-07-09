import { View,Text } from 'react-native';
import React, { useState, useEffect } from 'react';


export const Students =  ({navigation}) => {


    return (
        <View style={{backgroundColor:"black", flex:1}}>
            <Text onPress={()=>navigation.navigate("Resume")}>vagas</Text>
        </View>
    );
};