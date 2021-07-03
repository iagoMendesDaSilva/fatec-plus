import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform, ScrollView, } from 'react-native';

export const Screen = ({ children, center = true }) => {
    return (
        <KeyboardAvoidingView
            style={styles.containerAll}
            behavior={Platform.OS === 'ios' && 'padding'}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={center ? styles.containerContentCenter : styles.containerContent}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: 'black',
    },
    containerContent: {
        flexGrow: 1,
        backgroundColor: 'black',
    },
    containerContentCenter: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
    }
});
