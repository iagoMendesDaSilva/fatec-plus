import styles from './style';

import React from 'react';
import { View } from 'react-native';

import Strings from '~strings';
import { TextDefault, Card, Screen } from '~components';

export const Register = ({ navigation }) => {

    const nextStage = category =>
        navigation.navigate("MainRegister", { category })

    return (
        <Screen center={false}>
            <TextDefault
                lines={2}
                styleText={styles.txtTitle}
                children={"Selecione o\ntipo de usuário!"} />
            <View style={styles.containerContent}>
                <Card
                    title={"Aluno(a)"}
                    onPress={() => nextStage("Student")}
                    description={Strings.DESCRIPTION_STUDENT}
                    source={require("../../assets/img/category_student.png")} />
                <Card
                    title={"Empresa"}
                    onPress={() => nextStage("Company")}
                    description={Strings.DESCRIPTION_COMPANY}
                    source={require("../../assets/img/category_company.png")} />
                <Card
                    title={"Professor(a)"}
                    onPress={() => nextStage("Teacher")}
                    description={Strings.DESCRIPTION_TEACHER}
                    source={require("../../assets/img/category_teacher.png")} />
            </View>
        </Screen>
    );
};
