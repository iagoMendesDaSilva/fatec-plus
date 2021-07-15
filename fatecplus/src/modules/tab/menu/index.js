import styles from './style';

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { Storage } from '../../../services';
import { StorageMenu } from './storage';
import Colors from '../../../constants/colors';
import { ImagePicker, Screen, TextDefault, Icon, ItemList } from '../../../helpers';

export const Menu = ({ navigation }) => {

    const [user, setUser] = React.useState({})
    const [image, setImage] = React.useState({ photo: "", base64: "" });

    React.useEffect(() => getUser(), [])

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
                    onPress={() => console.log(1)}
                    iconLib={"MaterialCommunityIcons"} />
                <ItemList
                    iconName={"key"}
                    iconLib={"Ionicons"}
                    title={"Alterar senha"}
                    onPress={() => console.log(1)} />
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
                    textRight={"1.0.0.0"}
                    iconLib={"AntDesign"}
                    iconName={"mobile1"}
                    title={"Versão do aplicativo"} />
                <ItemList
                    arrow={false}
                    iconLib={"Ionicons"}
                    iconName={"power"}
                    title={"Encerrar sessão"}
                    onPress={() => console.log(1)} />
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