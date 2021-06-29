import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Picker } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../redux/action'
import Calender from '../components/calenderBox';
import ThumbRight from 'react-native-vector-icons/FontAwesome5'
import MealPicker from '../components/picker';
import DownIcon from 'react-native-vector-icons/AntDesign'
import { lightTheme, darkTheme } from '../components/color';

let currentheme = false;
var currentTheme = darkTheme

const App = (props) => {
    const [selectedMeal, setSelectedMeal] = useState('Roti-sabji');
    const [totalLunch, setTotalLunch] = useState(0);
    const [totalDinner, setTotalDinner] = useState(0);
    const [priceDinner, setPriceDinner] = useState(0);
    const [priceLunch, setPriceLunch] = useState(0);
    const [showMeanu, setShowMeanu] = useState(false);
    var [currentTheme, setCurrentTheme] = useState(darkTheme)

    const dispatch = useDispatch();
    const ListData = useSelector((state) => state.TotalReducer);
    const selectedTheme = useSelector((state) => state.ThemeColor);
    useEffect(() => {
        setCurrentTheme(selectedTheme ? darkTheme : lightTheme)
        // props.navigation.push('MainScreen')
    }, [selectedTheme])

    console.log(currentTheme)


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

    const addLunch = (id) => {

        dispatch({ type: "ADD_LUNCH", id, food: selectedMeal });
        updateBill();

    }
    const deleteLunch = (id) => {
        dispatch({ type: "DELETE_LUNCH", id });
        updateBill();
    }
    const addDinner = (id) => {
        dispatch({ type: "ADD_DINNER", id, food: selectedMeal });
        updateBill();
    }
    const deleteDinner = (id) => {
        dispatch({ type: "DELETE_DINNER", id });
        updateBill();
    }

    const updateBill = () => {
        let tempLunchCount = 0, tempDinnerCount = 0;
        let tempPriceLunch = 0, tempPriceDinner = 0;
        ListData.map((item) => {
            if (item.checkLunch) {
                tempLunchCount++;
                tempPriceLunch += giveAmount(item.foodLunch);
            }
            if (item.checkDinner) {
                tempDinnerCount++;
                tempPriceDinner += giveAmount(item.foodDinner);
            }
        })
        setPriceDinner(tempPriceDinner);
        setPriceLunch(tempPriceLunch);
        setTotalLunch(tempLunchCount);
        setTotalDinner(tempDinnerCount);
    }


    console.log(selectedMeal);

    return (

        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>




            <View style={{ marginTop: 5, alignItems: 'center' }}>
                <TouchableOpacity style={[styles.billHeader, !showMeanu ? { borderRadius: 10 } : null]} onPress={() => setShowMeanu(!showMeanu)}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Tap to select meal{'      '}
                        {!showMeanu ? <DownIcon name="caretdown" size={24} /> : <DownIcon name="caretup" size={24} />}
                    </Text>
                </TouchableOpacity>
                {showMeanu ? <MealPicker mealSelect={(value) => setSelectedMeal(value)} /> : null}
            </View>

            <View style={[styles.billHeader, {}]}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Select Dates And Meals</Text>
            </View>
            <View style={styles.calenderItems}>
                <Calender addLunch={(id) => addLunch(id)}
                    addDinner={(id) => addDinner(id)}
                    deleteLunch={(id) => deleteLunch(id)}
                    deleteDinner={(id) => deleteDinner(id)}
                />
            </View>

            <View style={styles.billHeader}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>your order price details:-</Text>
            </View>

            <View style={styles.billStyle}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>Total lunch:- {totalLunch}  = Rs {priceLunch}</Text>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>Total dinner:- {totalDinner} = Rs {priceDinner}</Text>

                <View style={{ borderWidth: 1.5, width: '94%', marginTop: 5 }} />

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>Total Meals:- {totalLunch + totalDinner} = Rs {priceLunch + priceDinner}</Text>

            </View>

            <View style={{ backgroundColor: 'red', height: 45, width: '80%', borderRadius: 25, marginLeft: '10%', marginVertical: 20 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('PaymentScreen', {
                    'billData': ListData,
                    'totalPrice': priceLunch + priceDinner
                })}>
                    <Text style={{ fontSize: 19, color: 'white', textAlign: 'center', marginTop: 10 }}>Add to cart</Text>
                </TouchableOpacity>
            </View>

        </ScrollView >
    )
}

console.log(currentTheme)

const styles = StyleSheet.create({
    inputStyle: {
        width: '90%',
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 18,
        padding: 5
    },
    calenderItems: {
        width: '96%',
        marginLeft: '2%',
        borderWidth: 1.5,
        borderRadius: 14,
        borderTopEndRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomWidth: 7,
        borderLeftWidth: 4
    },
    billHeader: {
        backgroundColor: currentTheme.heading,
        paddingVertical: 8,
        paddingHorizontal: '5%',
        marginTop: 28,
        marginHorizontal: '2%',
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10
    },
    billStyle: {
        backgroundColor: '#d9d9d9',
        width: '96%',
        marginLeft: '2%',
        paddingVertical: 20,
        borderWidth: 1.5,
        borderRadius: 10,
        paddingLeft: 20,
        borderTopEndRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomWidth: 7,
        borderLeftWidth: 4
    }
})

export default App;