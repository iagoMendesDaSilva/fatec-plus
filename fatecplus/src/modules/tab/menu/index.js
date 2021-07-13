import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

import { StorageMenu } from './storage';
import { Storage } from '../../../services';
import { ImagePicker, Screen, TextDefault } from '../../../helpers';

export const Menu = ({ navigation }) => {

    const [image, setImage] = React.useState({ photo: "", base64: "", uriProfile: "" });

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
            .catch(status => setImage({ photo: "", base64: "", uriProfile: "" }))
    }

    const getUser = async () => {
        const user = await Storage.getUser()
        if (user) {
            StorageMenu.getUser(user.id)
                .then(data => {
                    data.image && setImage({ photo: "", base64: "", uriProfile: data.image })
                })
                .catch(status => console.log(status))
        }
    }

    return (
        <Screen center={false}>


            <ImagePicker

                image={image.uriProfile ? image.uriProfile : image.photo}
                getImage={getImage} />



        </Screen>
    );
};