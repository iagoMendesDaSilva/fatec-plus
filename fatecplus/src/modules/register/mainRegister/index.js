import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';

import { Calendar } from '../../../services';
import { StorageRegister } from '../storage';
import Colors from '../../../constants/colors';
import Strings from '../../../constants/strings';
import { ModalContext } from '../../../routes/modalContext';
import { Input, ButtonDefault, ImagePicker, DatePickerDefault, TextArea, Screen, Select } from '../../../helpers';

export const MainRegister = (props) => {

    const params = props.route.params;
    const modal = React.useContext(ModalContext);

    const category = params.data ? params.data.category : params.category;

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [picker, setPicker] = useState(false);
    const [course, setCourse] = useState(null);
    const [username, setUsername] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [description, setDescription] = useState("");
    const [courses, setCourses] = useState({ data: [] });
    const [image, setImage] = useState({ photo: "", base64: "" });
    const [date, setDate] = useState(Calendar.getDateRegister());

    useEffect(() => {
        getCourses();
        verifyEditUser();
    }, [])

    const getCourses = () => {
        StorageRegister.getCourses()
            .then(data => formatCourses(data))
            .catch(status => modal.set({ msg: Strings.ERROR_COURSES, status, back: true }))
    }

    const verifyEditUser = () => {
        if (params && params.data) {
            setEmail(params.data.email)
            setName(params.data.name)
            setPhone(params.data.phone)
            setCourse(params.data.course)
            setUsername(params.data.username)
            setDescription(params.data.description)
            setBirthDate(Calendar.format(params.data.birthDate))
            setImage(params.data.image ? { photo: params.data.image, base64: "" } : { photo: "", base64: "" })
        }
    }

    const formatCourses = data => {
        let courses = [];
        data.forEach(course => courses.push(course.name));
        setCourses({ data: courses })
    }

    const nextStage = () => {
        const data = {
            email,
            name,
            phone,
            course,
            category,
            username,
            description,
            birthDate: Calendar.unFormat(birthDate),
            image: image.base64 ? image.base64 : null,
        }
        params.data
            ? editUser(data)
            : verifyFields({ ...data, internship: true, job: true });
    }

    const verifyFields = data => {
        StorageRegister.verifyEmail(email)
            .then(status => modal.set({ msg: Strings.CONFLICT_EMAIL, status }))
            .catch(status => status === 404 ?
                StorageRegister.verifyUsername(username)
                    .then(status => modal.set({ msg: Strings.CONFLICT_USERNAME, status }))
                    .catch(status => status === 404 ?
                        props.navigation.navigate("AddressRegister", data)
                        : modal.set({ status }))
                : modal.set({ status }))
    }

    const editUser = async data => {
        await StorageRegister.changeImage(image.base64 ? image.base64 : null)
            .then(data => console.log(data))
            .catch(status => console.log(status))
        StorageRegister.editUser(data, params.data.id)
            .then(data =>
                modal.set({ msg: Strings.UPDATED, back: true, status:404 }))
            .catch(status => modal.set({ status, msg: Strings.ERROR_UPDATE }))
    }


    const buttonActive = () => {
        const courseValid = category != "Student" ? true : Boolean(course)
        const birthDateValid = category != "Student" ? true : Boolean(birthDate)
        const phoneValid = category === "Teacher" ? true : Boolean(phone.length===17)
        return Boolean(email && name && birthDateValid && username && phoneValid && courseValid)
    }

    const getImage = () => {
        launchImageLibrary(({ mediaType: "photo", includeBase64: true }), data => {
            data.fileSize / 1000 >= 4000
                ? modal.set({ msg: Strings.ERROR_IMAGE, status: 404 })
                : setImage({ photo: data.uri, base64: data.base64 })
        })
    }

    const changeDate = value => {
        const date = new Date(value)
        setDate(date)
        setBirthDate(Calendar.format(date))
    }

    return (
        <Screen>
            <ImagePicker
                image={image.photo}
                getImage={getImage} />
            <Input
                text={name}
                capitalize={"words"}
                defaultValue={name}
                iconName={"pencil"}
                placeholder={"Nome"}
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
                category != "Teacher" &&
                <Input
                    text={phone}
                    maxLength={17}
                    type={"phone-pad"}
                    iconName={"phone"}
                    defaultValue={phone}
                    placeholder={"Telefone"}
                    mask={"+55 [00] [00000]-[0000]"}
                    onchange={text => setPhone(text)} />
            }
            {
                category === "Student" &&
                <>
                    <Select
                        value={course}
                        iconName={"book"}
                        options={courses.data}
                        iconLib={"fontawesome5"}
                        initialValue={"Escolha seu curso"}
                        changeValue={value => setCourse(value)} />
                    <DatePickerDefault
                        picker={picker}
                        title={birthDate}
                        close={() => setPicker(false)}
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
                    androidVariant={"iosClone"}
                    textColor={Colors.TEXT_PRIMARY}
                    fadeToColor={Colors.BACKGROUND}
                    minimumDate={Calendar.getMinimumAge()}
                    maximumDate={Calendar.getMaximumAge()}
                    onDateChange={value => changeDate(value)} />
            }
            <TextArea
                text={description}
                defaultValue={description}
                placeholder={"Descrição"}
                onchange={value => setDescription(value)} />
            <ButtonDefault
                onPress={nextStage}
                active={buttonActive()}
                text={params.data ? "Salvar" : "Próximo"} />
        </Screen>
    );
};
