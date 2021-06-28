import styles from './style';

import React from 'react';
import { View, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


import Colors from '../../../constants/colors';
import { Input, ButtonDefault, ImagePicker, DatePickerDefault } from '../../../helpers';


export const MainRegister = (props) => {

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [picker, setPicker] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [birthDate, setBirthDate] = React.useState(false);
    const [image, setImage] = React.useState({ photo: "", base64: "" });

    const nextStage = () => {
        console.log("a");
    }

    const buttonActive = () =>
        Boolean(email && name && phone && birthDate && username)

    const getImage = () => {
        const options = {
            mediaType: "photo",
            includeBase64: true,
        }
        launchImageLibrary((options), data =>
            setImage({ photo: data.uri, base64: data.base64 }));
    }

    const changeDate = (event, value) => {
        if (event.type === 'set') {
            const date = new Date(value)
            const year = String(date.getFullYear())
            let month = String(date.getMonth() + 1)
            let day = String(date.getDate())

            if (day.length === 1) day = "0" + day
            if (month.length === 1) month = "0" + month

            setPicker(false)
            setBirthDate(day + "/" + month + "/" + year)
        }
    }

    return (
        <View style={styles.containerAll}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.containerContent}>
                <ImagePicker
                    image={image.photo}
                    getImage={getImage} />
                <View style={styles.containerInputs}>
                    <Input
                        text={name}
                        iconName={"pencil"}
                        placeholder={"Nome"}
                        onchange={text => setName(text)}
                        iconLib={"MaterialCommunityIcons"} />
                    <Input
                        text={username}
                        iconName={"user"}
                        placeholder={"Usuário"}
                        onchange={text => setUsername(text)} />
                    <Input
                        text={email}
                        iconName={"email"}
                        placeholder={"Email"}
                        iconLib={"MaterialIcons"}
                        onchange={text => setEmail(text)} />
                    <Input
                        text={phone}
                        iconName={"phone"}
                        placeholder={"Telefone"}
                        onchange={text => setPhone(text)} />
                </View>
                <DatePickerDefault
                    title={birthDate}
                    onPress={() => setPicker(!picker)} />
                {picker &&
                    <DateTimePicker
                        mode={"date"}
                        display="default"
                        value={new Date()}
                        onChange={(event, value) => changeDate(event, value)} />
                }
                <ButtonDefault
                    text={"Próximo"}
                    loading={loading}
                    style={styles.button}
                    onPress={nextStage}
                    active={buttonActive()} />
            </ScrollView>
        </View>
    );
};