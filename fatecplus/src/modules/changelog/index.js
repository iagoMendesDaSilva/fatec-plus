import styles from './style';

import React, { useEffect, useState, useContext } from 'react';
import { SectionList, View } from 'react-native';

import Colors from '../../constants/colors'
import { StorageChangeLog } from './storage';
import { ModalContext } from '../../routes/modalContext';
import { Screen, Load, TextDefault, Icon } from '../../helpers';

export const ChangeLog = ({ navigation, route }) => {

    const modal = useContext(ModalContext);

    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState({ data: [], launch: true });

    useEffect(() => getNews(), [])

    const getNews = () => {
        StorageChangeLog.getNews()
            .then(data => orderSections(data))
            .catch(status => modal.set({ status, back: true }))
            .finally(() => setLoading(false))
    }

    const orderSections = news => {
        const removals = news.filter(item => item.type === "removal");
        const additionals = news.filter(item => item.type === "addition");
        const modifications = news.filter(item => item.type === "modification");
        setNews({
            launch: Boolean(additionals.length === 0 && removals.length === 0 && modifications.length === 0),
            data: [
                { title: "Novos Recursos", data: additionals },
                { title: "Alterações", data: modifications },
                { title: "Remoções", data: removals },
            ]
        })
    }

    const getColorBySection = type => {
        switch (type) {
            case "Remoções":
                return Colors.ERROR
            case "Alterações":
                return Colors.WARNING
            case "Novos Recursos":
                return Colors.SUCCESS
        }
    }

    const renderItem = (item, index) =>
        <View
            key={String(index)}
            style={styles.containerItem}>
            <View style={styles.containerRow}>
                <View style={styles.circle} />
                <TextDefault
                    children={item.title}
                    styleText={styles.txtTitle} />
            </View>
            <TextDefault
                lines={0}
                children={item.message}
                styleText={styles.txtMessage}
                style={styles.containerTxtMessage} />
        </View>


    const renderSection = (title) =>
        <TextDefault
            children={title}
            styleText={{ ...styles.txtType, color: getColorBySection(title) }} />

    return (
        <Screen>
            {
                loading
                    ?
                    <Load />
                    :
                    <>
                        <TextDefault
                            styleText={styles.txtVersion}
                            style={styles.containerTxtVersion}
                            children={`Novidades da versão ${route.params.version}`} />
                        {
                            news.launch
                                ?
                                <View style={styles.conatinerLaunch} >
                                    <Icon
                                        size={75}
                                        name={"rocket"}
                                        color={Colors.PRIMARY}
                                        lib={"MaterialCommunityIcons"} />
                                    <TextDefault
                                        styleText={styles.txtLaunch}
                                        children={"Ainda sem novidades"}
                                    />
                                </View >
                                :
                                <SectionList
                                    sections={news.data}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => renderItem(item, index)}
                                    renderSectionHeader={({ section: { title, data } }) => data.length > 0 && renderSection(title)} />

                        }
                    </>
            }
        </Screen>
    );
};
