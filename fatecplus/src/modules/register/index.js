import styles from './style';
import { View, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';

import { Storage } from '../../services';
import Strings from '../../constants/strings';
import { StorageRecovery } from './storage';
import { ModalContext } from '../../routes/modalContext';
import { TextDefault, Input, ButtonDefault, Card } from '../../helpers';

export const Register = ({ navigation }) => {

    const modal = useContext(ModalContext);

    const [type, setType] = useState(false);
    const [loading, setLoading] = useState(false);

    const nextStage = () => {
      
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
                        selected={type === "Student"}
                        onPress={() => setType("Student")}
                        description={Strings.descriptionStudent}
                        source={require("../../assets/img/category_student.png")} />
                    <Card
                        title={"Empresa"}
                        selected={type === "Company"}
                        onPress={() => setType("Company")}
                        description={Strings.descriptionCompany}
                        source={require("../../assets/img/category_company.png")} />
                    <Card
                        title={"Professor(a)"}
                        selected={type === "Teacher"}
                        onPress={() => setType("Teacher")}
                        description={Strings.descriptionTeacher}
                        source={require("../../assets/img/category_teacher.png")} />
                    <ButtonDefault
                        text={"Próximo"}
                        loading={loading}
                        style={styles.button}
                        onPress={nextStage}
                        active={Boolean(type)} />
                </View>
            </ScrollView>
        </View>
    );
};