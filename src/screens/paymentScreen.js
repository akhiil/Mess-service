import React, { useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../components/color'

import {
    Text,
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Button,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/action'

const OrderHeader = (props) => {
    return (
        <View style={styles.orderHeaderStyle}>
            <Text style={styles.orderHeaderText}>{props.value}</Text>
        </View>
    )
}

const PaymentScreen = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showLunch, setShowLunch] = useState(false);
    const [showDinner, setShowDinner] = useState(false);

    const { params } = route;

    useEffect(() => {
        params.billData.map(({ checkDinner, checkLunch }) => {
            if (checkLunch) setShowLunch(true);
            if (checkDinner) setShowDinner(true);
        })
    }, [])


    //  console.log("worlds ", params.billData);

    const dispatch = useDispatch();


    const giveAmount = (item) => {
        switch (item) {
            case "Roti-sabji":
                return 30;
            case "Chawal-dal":
                return 35;
            case "mach-bhat":
                return 50;
            case "murga-bhat":
                return 60;
            case "Litti-chokha":
                return 25;
            case "paneer-dosa":
                return 55;
        }
    }


    const confirmPress = () => {
        setTimeout(() => {
            setModalVisible(false)

            navigation.push('MainScreen')
        }, 2000)

        setModalVisible(true)
        dispatch({ type: 'CLEAR_ALL' })
        console.log("hurray!! your order is on the way")
    }

    return (
        <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
            <View style={{ borderWidth: 2 }} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{
                    backgroundColor: '#66ccff',
                    width: '80%',
                    alignItems: 'center',
                    marginLeft: '10%',
                    paddingVertical: 30,
                    marginVertical: '40%',
                    borderRadius: 20,
                    paddingHorizontal: 20
                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>Hurray!! your order has been placed</Text>
                </View>
            </Modal>


            <ScrollView style={{ width: '100%' }}>
                {showLunch ? <OrderHeader value="Lunches" /> : null}
                <View>
                    {params.billData.map((item) => {
                        //  console.log("hello ", item);
                        if (item.checkLunch) {
                            return (
                                <View key={item.date + item.mealTime}
                                    style={styles.totalOrder}>
                                    <Text style={styles.eachOrderStyle}>{item.date}</Text>
                                    <Text style={styles.eachOrderStyle}>{item.foodLunch}</Text>
                                    <Text style={styles.eachOrderStyle}>Lunch</Text>
                                    <Text style={styles.eachOrderStyle}>Rs {giveAmount(item.foodLunch)}</Text>
                                </View>
                            );
                        }
                    })}
                </View>
                {showDinner ? <OrderHeader value="Dinner" /> : null}
                <View>
                    {params.billData.map((item) => {
                        //  console.log("hello ", item);
                        if (item.checkDinner) {
                            return (
                                <View
                                    style={styles.totalOrder}>
                                    <View style={styles.eachOrder}>
                                        <Text style={styles.eachOrderStyle}>{item.date}</Text>
                                    </View>
                                    <View style={styles.eachOrder}>
                                        <Text style={styles.eachOrderStyle}>{item.foodDinner}</Text>
                                    </View>
                                    <View style={styles.eachOrder}>
                                        <Text style={styles.eachOrderStyle}>Dinner</Text>
                                    </View>
                                    <View style={styles.eachOrder}>
                                        <Text style={styles.eachOrderStyle}>Rs {giveAmount(item.foodDinner)}</Text>
                                    </View>
                                </View>
                            );
                        }
                    })}
                </View>
            </ScrollView>
            {/* <View style={{ borderWidth: 1.5 }} /> */}
            <View style={{ backgroundColor: '#bfbfbf', flexDirection: 'row', }}>

                <TouchableOpacity
                    onPress={confirmPress}
                    style={styles.confirmButton}>
                    <Text style={{ fontSize: 19, color: '#fff', fontWeight: 'bold' }}>Confirm order</Text>
                </TouchableOpacity>

                <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'center', marginRight: 20 }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Total : Rs {params.totalPrice}</Text>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#ecd9c6',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10
    },
    confirmButton: {
        backgroundColor: '#0099e6',
        paddingVertical: 6,
        width: 150,
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10
    },
    orderHeaderStyle: {
        backgroundColor: darkTheme.heading,
        marginTop: 1,
        paddingVertical: 5
    },
    orderHeaderText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    eachOrderStyle: {
        margin: 7,
        color: '#000',
        fontWeight: 'bold',
        backgroundColor: '#bfbfbf',
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    totalOrder: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 3,
        backgroundColor: '#a6a6a6'
    },
    eachOrder: {
    }
})

export default PaymentScreen;