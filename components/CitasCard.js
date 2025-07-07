import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CitasCard({ cita, onEdit, onDelete }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={style.card}>
            <View style={style.info}>
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    <Text style={style.nombre}>Motivo de la cita {cita.motivo}</Text>
                    {showDetails && (
                        <>
                            <Text style={style.detalle}>Observacion: {cita.observacion}</Text>
                            <Text style={style.detalle}>Tipo de la Consulta : {cita.tipo_consulta}</Text>
                            <Text style={style.detalle}> Estado: {cita.estado}</Text>
                            <Text style={style.detalle}> Hora: {cita.hora}</Text>
                            <Text style={style.detalle}> Fecha: {cita.fecha}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
            <View style={style.actions}>
                <TouchableOpacity onPress={onEdit} style={style.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete} style={style.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32f2f" />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    detalle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    actions: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    iconBtn: {
        marginLeft: 12,
    },
})
