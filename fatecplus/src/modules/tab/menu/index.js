import styles from './style';

import React from 'react';
import { View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { StorageMenu } from './storage';
import Colors from '../../../constants/colors';
import { Storage, Notification } from '../../../services';
import { ImagePicker, Screen, TextDefault, ItemList } from '../../../helpers';

export const Menu = ({ navigation }) => {

    const [user, setUser] = React.useState({})
    const [image, setImage] = React.useState({ photo: "", base64: "" });

    React.useEffect(() => {
        getUser()
        navigation.addListener('focus', () => getUser())
    }, [])

    const getImage = () => {
        launchImageLibrary(({ mediaType: "photo", includeBase64: true }), data => {
            if (data.uri && data.base64) {
                setImage({ photo: data.uri, base64: data.base64 });
                changeImage(data.base64)
            }
        });
    }

    const changeImage = image => {
        StorageMenu.changeImage(image)
            .then(a => console.log(a))
            .catch(status => setImage({ photo: "", base64: "" }))
    }

    const getUser = async () => {
        const currentUser = await Storage.getUser()
        if (currentUser) {
            StorageMenu.getUser(currentUser.id)
                .then(data => setUser(data))
                .catch(status => console.log(status))
        }
    }

    const logout = async () => {
        await StorageMenu.logout()
        Storage.clear();
        Notification.unregister()
        navigation.replace("Login")
    }

    const getDataUser = () => {
        return {
            id: user.id,
            city: user.city,
            state: user.state,
            email: user.email,
            name: user.name,
            image: user.image,
            phone: user.phone,
            course: user.studying,
            address: user.address,
            category: user.category,
            birthDate: user.birth_date,
            username: user.username,
            description: user.description,
        }
    }

    return (
        <Screen center={false}>
            <View style={styles.containerHeader}>
                <ImagePicker
                    getImage={getImage}
                    image={image.photo ? image.photo : user.image} />
                <View style={styles.containerTextHeader}>
                    <TextDefault
                        children={user.username}
                        styleText={styles.txtUsername} />
                    <TextDefault
                        styleText={styles.txtAddress}
                        children={`${user.city}-${user.state}`} />
                    <TextDefault
                        children={user.name}
                        styleText={styles.txtName} />
                </View>
            </View>

            <View style={styles.containerInfo}>
                <TextDefault
                    styleText={styles.txtSection}
                    children={"Informações da Conta"} />
                <ItemList
                    iconName={"pencil"}
                    title={"Editar informações"}
                    onPress={() =>
                        navigation.navigate("MainRegister", { data: getDataUser() })}
                    iconLib={"MaterialCommunityIcons"} />
                <ItemList
                    iconName={"location-sharp"}
                    title={"Editar endereço"}
                    onPress={() => 
                        navigation.navigate("AddressRegister", { data: getDataUser() })}
                    iconLib={"Ionicons"} />
                {
                    user.category === "Student" &&
                    <ItemList
                        iconLib={"Entypo"}
                        title={"Editar Currículo"}
                        onPress={() => navigation.navigate("Resume")}
                        iconName={"text-document-inverted"} />
                }
                <ItemList
                    iconName={"key"}
                    iconLib={"Ionicons"}
                    title={"Alterar senha"}
                    onPress={() => navigation.navigate("ChangePassword")} />
                <ItemList
                    title={"Novidades"}
                    iconLib={"Ionicons"}
                    iconName={"newspaper"}
                    onPress={() => console.log(1)} />
                <ItemList
                    title={"Documentação"}
                    iconLib={"Ionicons"}
                    iconName={"document-text"}
                    onPress={() => console.log(1)} />

                <TextDefault
                    styleText={styles.txtSection}
                    children={"Gerenciamento da Conta"} />

                <ItemList
                    arrow={false}
                    iconLib={"AntDesign"}
                    iconName={"mobile1"}
                    textRight={Storage.getVersion()}
                    title={"Versão do aplicativo"} />
                <ItemList
                    arrow={false}
                    onPress={logout}
                    iconLib={"Ionicons"}
                    iconName={"power"}
                    title={"Encerrar sessão"} />
                <ItemList
                    arrow={false}
                    color={Colors.error}
                    iconLib={"Ionicons"}
                    iconName={"trash"}
                    title={"Excluir conta"}
                    onPress={() => console.log(1)} />
            </View>
        </Screen>
    );
};