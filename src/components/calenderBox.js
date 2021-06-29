
import React, { Component, useState } from 'react';
import { Text, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
// import Spacer from '../components/Spacer';
import CheckBox from '@react-native-community/checkbox';
import {
    SafeAreaView,
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Button,
    Dimensions,
    FlatList
} from 'react-native';

const phw = Dimensions.get('window').width;
const phh = Dimensions.get('window').height;


const calender = (props) => {

    const dispatch = useDispatch();
    const ListData = useSelector((state) => state.TotalReducer)

    return (
        <View style={{
            backgroundColor: '#d9d9d9', borderRadius: 10, borderTopEndRadius: 0,
            borderTopLeftRadius: 0
        }}>
            <FlatList data={ListData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <Text>{item.date}</Text>
                            <View style={styles.checkboxContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <CheckBox
                                        value={ListData[item.id].checkLunch}
                                        onValueChange={() => {
                                            if (ListData[item.id].checkLunch) {
                                                props.deleteLunch(item.id);
                                            } else {
                                                props.addLunch(item.id);
                                            }
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Lunch</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <CheckBox
                                        tintColor="blue"
                                        onCheckColor="red"
                                        value={ListData[item.id].checkDinner}
                                        onValueChange={() => {
                                            if (ListData[item.id].checkDinner) {
                                                props.deleteDinner(item.id);
                                            } else {
                                                props.addDinner(item.id);
                                            }
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Dinner</Text>
                                </View>
                            </View>
                        </View>
                    )
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        marginVertical: 10,
        marginHorizontal: 4,
        padding: 10
    },
    checkboxContainer: {
        marginVertical: 15
    },
    checkbox: {
        alignSelf: "center",
        backgroundColor: '#d9d9d9',

    },
    label: {
        margin: 8
    },
});

export default calender
