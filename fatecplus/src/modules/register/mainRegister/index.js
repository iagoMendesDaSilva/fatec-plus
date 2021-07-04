import styles from './style';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';

import Colors from '../../../constants/colors';
import { Input, ButtonDefault, ImagePicker, DatePickerDefault, TextArea, Screen } from '../../../helpers';


export const MainRegister = (props) => {

    const params = props.route.params;

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [picker, setPicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [username, setUsername] = React.useState("");
    const [birthDate, setBirthDate] = React.useState(null);
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState({ photo: "", base64: "" });

    React.useEffect(() => getDefaultValues(), [])

    const nextStage = () => {
        const data = {
            email: email,
            name: name,
            phone: phone,
            birthDate: birthDate,
            username: username,
            description: description,
            category: params.category,
            image: image.base64 ? image.base64 : null,
        }
        const screen = params.category == "Teacher" ? "ChangePassword" : "AddressRegister"
        props.navigation.navigate(screen, data);
    }

    const getDefaultValues = () => {
        if (params && params.data) {
            setEmail(params.data.email)
            setName(params.data.name)
            setImage(params.data.image)
            setPhone(params.data.phone)
            setBirthDate(params.data.birthDate)
            setUsername(params.data.username)
            setDescription(params.data.description)
        }
    }

    const buttonActive = () => {
        const phoneValid = params.category == "Teacher" ? true : Boolean(phone)
        const birthDateValid = params.category != "Student" ? true : Boolean(birthDate)
        return Boolean(email && name && birthDateValid && username && phoneValid)
    }

    const getImage = () => {
        launchImageLibrary(({ mediaType: "photo", includeBase64: true }), data =>
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

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => setPicker(false)}
            style={styles.containerAll}>
            <Screen>
                <ImagePicker
                    image={image.photo}
                    getImage={getImage} />
                <Input
                    text={name}
                    iconName={"pencil"}
                    defaultValue={name}
                    placeholder={"Nome"}
                    capitalize={"sentences"}
                    onchange={text => setName(text)}
                    iconLib={"MaterialCommunityIcons"} />
                <Input
                    maxLength={20}
                    text={username}
                    iconName={"user"}
                    placeholder={"Usuário"}
                    defaultValue={username}
                    onchange={text => setUsername(text)} />
                <Input
                    text={email}
                    defaultValue={email}
                    iconName={"email"}
                    placeholder={"Email"}
                    type={"email-address"}
                    iconLib={"MaterialIcons"}
                    onchange={text => setEmail(text)} />
                {
                    params.category != "Teacher" &&
                    <Input
                        text={phone}
                        maxLength={11}
                        type={"phone-pad"}
                        iconName={"phone"}
                        defaultValue={phone}
                        placeholder={"Telefone"}
                        onchange={text => setPhone(text)} />
                }
                {
                    params.category === "Student" &&
                    <DatePickerDefault
                        title={birthDate}
                        onPress={() => setPicker(!picker)} 
                        deleteValue={() => setBirthDate("")} 
                        initialValue={"Data de Nascimento"}/>
                }
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
                <TextArea
                    text={description}
                    defaultValue={description}
                    placeholder={"Descrição"}
                    onchange={value => setDescription(value)} />
                <ButtonDefault
                    onPress={nextStage}
                    text={"Próximo"}
                    active={buttonActive()} />
            </Screen>
        </TouchableOpacity>
    );
};