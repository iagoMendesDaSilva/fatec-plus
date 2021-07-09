import styles from './style';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';

import { StorageRegister } from '../storage';
import Colors from '../../../constants/colors';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext';
import { Input, ButtonDefault, ImagePicker, DatePickerDefault, TextArea, Screen, Select } from '../../../helpers';


export const MainRegister = (props) => {

    const today = {
        day: new Date().getDate(),
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
    }

    const params = props.route.params;
    const modal = React.useContext(ModalContext);

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [picker, setPicker] = React.useState(false);
    const [course, setCourse] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [birthDate, setBirthDate] = React.useState(null);
    const [description, setDescription] = React.useState("");
    const [courses, setCourses] = React.useState({ data: [] });
    const [image, setImage] = React.useState({ photo: "", base64: "" });
    const [date, setDate] = React.useState(new Date(today.year - 18, today.month, today.day));

    React.useEffect(() => {
        getCourses();
        getDefaultValues();
    }, [])

    const nextStage = () => {
        const formatedDate = birthDate ? birthDate.split("/").reverse().join("-") : null;

        const data = {
            email,
            name,
            phone,
            course,
            username,
            description,
            birthDate: formatedDate,
            category: params.category,
            image: image.base64 ? image.base64 : null,
        }
        props.navigation.navigate("AddressRegister", data);
    }

    const getDefaultValues = () => {
        if (params && params.data) {
            setEmail(params.data.email)
            setName(params.data.name)
            setImage(params.data.image)
            setPhone(params.data.phone)
            setCourse(params.data.course)
            setBirthDate(params.data.birthDate)
            setUsername(params.data.username)
            setDescription(params.data.description)
        }
    }

    const formatCourses = data => {
        let courses = [];
        data.forEach(course => courses.push(course.name));
        setCourses({ data: courses })
    }

    const getCourses = () => {
        StorageRegister.getCourses()
            .then(data => formatCourses(data))
            .catch(status =>
                modal.configErrorModal({ msg: Strings.coursesFail, status: 404, positivePress: () => props.navigation.goBack() }))
    }

    const buttonActive = () => {
        const phoneValid = params.category == "Teacher" ? true : Boolean(phone)
        const birthDateValid = params.category != "Student" ? true : Boolean(birthDate)
        const courseValid = params.category == "Student" ? Boolean(course) : true
        return Boolean(email && name && birthDateValid && username && phoneValid && courseValid)
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

    const checkPhone = value => {
        if ((/^\d+$/).test(value) || value === "")
            setPhone(value)
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
                        onchange={text => checkPhone(text)} />
                }
                {
                    params.category === "Student" &&
                    <>
                        <Select
                            value={course}
                            iconName={"book-open"}
                            options={courses.data}
                            iconLib={"fontawesome5"}
                            initialValue={"Escolha seu curso"}
                            changeValue={value => setCourse(value)} />
                        <DatePickerDefault
                            title={birthDate}
                            onPress={() => setPicker(!picker)}
                            deleteValue={() => setBirthDate("")}
                            initialValue={"Data de Nascimento"} />
                    </>
                }
                {
                    picker &&
                    <DatePicker
                        date={date}
                        mode={"date"}
                        locale={"pt-br"}
                        textColor={"white"}
                        androidVariant={"iosClone"}
                        fadeToColor={Colors.background}
                        onDateChange={value => changeDate(value)}
                        maximumDate={new Date(today.year - 16, today.month, today.day)}
                        minimumDate={new Date(today.year - 120, today.month, today.day)} />
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