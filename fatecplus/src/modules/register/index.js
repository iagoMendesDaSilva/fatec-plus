import styles from './style';

import React from 'react';
import { View, ScrollView } from 'react-native';

import types from './storage';
import { TextDefault, Card } from '../../helpers';

export const Register = ({ navigation }) => {

    const nextStage = type => {
        navigation.navigate("MainRegister", { type })
    }

    return (
        <View style={styles.containerAll}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.containerScroll}>
                <TextDefault
                    lines={2}
                    styleText={styles.txtTitle}
                    children={"Selecione o\ntipo de usuário!"} />
                <View style={styles.containerContent}>
                    {
                        types.map((_, index) =>
                            <Card
                                key={String(index)}
                                title={types[index].title}
                                source={types[index].img}
                                description={types[index].description}
                                onPress={() => nextStage(types[index].type)} />
                        )
                    }
                </View>
            </ScrollView>
        </View>
    );
};