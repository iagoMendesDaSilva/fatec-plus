import styles from './style';

import React from 'react';
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary } from 'react-native-image-picker';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import Colors from '../../../constants/colors';
import { Input, ButtonDefault, ImagePicker, DatePickerDefault } from '../../../helpers';


export const MainRegister = (props) => {

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [picker, setPicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [username, setUsername] = React.useState("");
    const [birthDate, setBirthDate] = React.useState(false);
    const [image, setImage] = React.useState({ photo: "", base64: "" });

    const nextStage = () => {
        const data = {
            email: email,
            name: name,
            phone: phone,
            username: username,
            birthDate: birthDate,
            category: props.route.params.type,
            image: image.base64 ? image.base64 : null,
        }
        // props.navigation.navigate("Tela", data);
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

    const changeDate = value => {
        const date = new Date(value)
        const year = String(date.getFullYear())
        let month = String(date.getMonth() + 1)
        let day = String(date.getDate())

        if (day.length === 1) day = "0" + day
        if (month.length === 1) month = "0" + month

        setDate(date)
        setBirthDate(day + "/" + month + "/" + year)
    }

    const closeDatePicker = () => setPicker(false)

    return (
        <View style={styles.containerAll}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.containerContent}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={closeDatePicker}
                    style={styles.containerPressable}>
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
                    {
                        picker &&
                        <DatePicker
                            date={date}
                            mode={"date"}
                            textColor={"white"}
                            locale={"pt-br"}
                            androidVariant={"iosClone"}
                            fadeToColor={Colors.background}
                            onDateChange={value => changeDate(value)} />
                    }
                    <ButtonDefault
                        text={"Próximo"}
                        style={styles.button}
                        onPress={nextStage}
                        active={buttonActive()} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};