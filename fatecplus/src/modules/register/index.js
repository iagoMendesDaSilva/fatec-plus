import styles from './style';

import React from 'react';
import { View, ScrollView } from 'react-native';

import  Strings from '../../constants/strings';
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
                    <Card
                        title={"Aluno(a)"}
                        onPress={() => nextStage("Student")}
                        description={Strings.descriptionStudent}
                        source={require("../../assets/img/category_student.png")} />
                    <Card
                        title={"Empresa"}
                        onPress={() => nextStage("Company")}
                        description={Strings.descriptionCompany}
                        source={require("../../assets/img/category_company.png")} />
                    <Card
                        title={"Professor(a)"}
                        onPress={() => nextStage("Teacher")}
                        description={Strings.descriptionTeacher}
                        source={require("../../assets/img/category_teacher.png")} />
                </View>
            </ScrollView>
        </View>
    );
};