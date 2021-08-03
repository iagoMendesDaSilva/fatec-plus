import styles from './style';

import React from 'react';
import { View } from 'react-native';

import { StorageMenu } from './storage';
import Colors from '../../../constants/colors';
import Strings from '../../../constants/strings';
import { Storage, Notification } from '../../../services';
import { ModalContext } from '../../../routes/modalContext';
import { ImagePicker, Screen, TextDefault, ItemList } from '../../../helpers';

export const Menu = ({ navigation }) => {

    const modal = React.useContext(ModalContext);

    const [user, setUser] = React.useState({})

    React.useEffect(() => {
        getUser()
        navigation.addListener('focus', () => getUser())
    }, [])


    const getUser = async () => {
        const currentUser = await Storage.getUser()
        if (currentUser) {
            StorageMenu.getUser(currentUser.id)
                .then(data => setUser(data))
                .catch(status =>
                    modal.set({ msg: Strings.ERROR_USER, status }))
        }
    }

    const deleteUser = () => {
        StorageMenu.deleteUser(user.id)
            .then(data => logout(false))
            .catch(status => modal.set({ status }))
    }

    const logout = async (requestToken = true) => {
        requestToken && await StorageMenu.logout()
        Storage.clear();
        Notification.unregister()
        navigation.reset({ index: 0, routes: [{ name: 'Login'}] })
    }

    const confirmDeleteAccount = () =>
        modal.set({
            options: true,
            iconName: "trash",
            title: "Excluir conta",
            iconLib: "fontawesome",
            iconColor: Colors.ERROR,
            positivePress: deleteUser,
            msg: Strings.CONFIRM_DELETE_USER,
        })

    const confirmLogout = () =>
        modal.set({
            options: true,
            iconLib: "Ionicons",
            iconName: "power",
            title: "Encerrar sessão",
            positivePress: logout,
            msg: Strings.CONFIRM_LOGOUT,
        })

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
                <ImagePicker image={user.image} disabled />
                <View style={styles.containerTextHeader}>
                    <TextDefault
                        children={user.username}
                        styleText={styles.txtUsername} />
                    <TextDefault
                        styleText={styles.txtAddress}
                        children={user.city && user.state ? `${user.city}-${user.state}` : ""} />
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
                    title={"Suporte"}
                    iconLib={"SimpleLineIcons"}
                    iconName={"earphones-alt"}
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
                    onPress={confirmLogout}
                    iconLib={"Ionicons"}
                    iconName={"power"}
                    title={"Encerrar sessão"} />
                <ItemList
                    arrow={false}
                    color={Colors.ERROR}
                    iconLib={"Ionicons"}
                    iconName={"trash"}
                    title={"Excluir conta"}
                    onPress={confirmDeleteAccount} />
            </View>
        </Screen>
    );
};
