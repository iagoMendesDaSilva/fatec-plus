import styles from './style';

import { View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import Colors from '~colors';
import Strings from '~strings';
import { StorageMenu } from './storage';
import { ModalContext } from '~contexts';
import { Storage, Notification } from '~services';
import { ImagePicker, Screen, TextDefault, ItemList, Load } from '~components';

export const Menu = ({ navigation }) => {

    const modal = useContext(ModalContext);

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => navigation.addListener('focus', () => getUser()), [])

    const getUser = async () => {
        const currentUser = await Storage.getUser()
        if (currentUser) {
            StorageMenu.getUser(currentUser.id)
                .then(data => setUser(data))
                .catch(status => modal.set({ status }))
                .finally(() => loading && setLoading(false))
        }
    }

    const deleteUser = () => {
        StorageMenu.deleteUser(user.id)
            .then(data => logout(false))
            .catch(status => modal.set({ status }))
    }

    const logout = async removeToken => {
        removeToken && await StorageMenu.logout()
        Storage.clear();
        Notification.unregister()
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
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
            positivePress: logout,
            title: "Encerrar sessão",
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
            {
                loading
                    ?
                    <Load />
                    :
                    <>
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
                                iconLib={"MaterialCommunityIcons"}
                                onPress={() => navigation.navigate("MainRegister", { data: getDataUser() })} />
                            <ItemList
                                iconLib={"Ionicons"}
                                title={"Editar endereço"}
                                iconName={"location-sharp"}
                                onPress={() => navigation.navigate("AddressRegister", { data: getDataUser() })} />
                            {
                                user.category === "Student" &&
                                <ItemList
                                    title={"Editar currículo"}
                                    iconName={"file-document"}
                                    iconLib={"MaterialCommunityIcons"}
                                    onPress={() => navigation.navigate("Resume")} />
                            }
                            <ItemList
                                iconName={"key"}
                                iconLib={"Ionicons"}
                                title={"Alterar senha"}
                                onPress={() => navigation.navigate("ChangePassword", { recovery: false, edit: true })} />
                            <ItemList
                                iconLib={"Ionicons"}
                                iconName={"newspaper"}
                                title={"Registro de alterações "}
                                onPress={() => navigation.navigate("ChangeLog", { version: Storage.getVersion() })} />
                            <TextDefault
                                styleText={styles.txtSection}
                                children={"Gerenciamento da Conta"} />
                            <ItemList
                                arrow={false}
                                iconLib={"AntDesign"}
                                iconName={"mobile1"}
                                title={"Versão do aplicativo"}
                                textRight={Storage.getVersion()} />
                            <ItemList
                                arrow={false}
                                iconLib={"Ionicons"}
                                iconName={"power"}
                                title={"Encerrar sessão"}
                                onPress={confirmLogout} />
                            <ItemList
                                arrow={false}
                                iconName={"trash"}
                                iconLib={"Ionicons"}
                                title={"Excluir conta"}
                                color={Colors.ERROR}
                                onPress={confirmDeleteAccount} />
                        </View>
                    </>
            }
        </Screen>
    );
};
