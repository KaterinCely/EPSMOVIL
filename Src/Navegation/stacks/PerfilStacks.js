import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function PerfilStacks() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pefil</Text>
            <Text style={styles.subtitle}>Aquí estara tu perfil</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
});

