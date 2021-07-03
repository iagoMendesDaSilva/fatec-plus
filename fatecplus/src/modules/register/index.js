import styles from './style';

import React from 'react';
import { View } from 'react-native';

import Strings from '../../constants/strings';
import { TextDefault, Card, Screen } from '../../helpers';

export const Register = ({ navigation }) => {

    const nextStage = category => {
        navigation.navigate("MainRegister", { category })
    }

    return (
        <Screen>
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
        </Screen>
    );
};