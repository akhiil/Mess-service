import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const mealList = [
    {
        id: 1,
        name: "Roti-sabji",
        price: '30'
    }, {
        id: 2,
        name: "Chawal-dal",
        price: '35'
    }, {
        id: 3,
        name: "mach-bhat",
        price: '50'
    }, {
        id: 4,
        name: "murga-bhat",
        price: '60'
    }, {
        id: 5,
        name: "Litti-chokha",
        price: '25'
    }, {
        id: 6,
        name: "paneer-dosa",
        price: '55'
    }
]

const App = (props) => {
    const [colorChange, setColorChange] = useState(1)

    return (
        <View style={{ width: '92%', paddingVertical: 15, backgroundColor: '#999999', borderRadius: 10, borderWidth: 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={[styles.eachMealText, { color: 'black', fontWeight: 'bold' }]}>Meal-name</Text>
                <Text style={[styles.eachMealText, { color: 'black', fontWeight: 'bold' }]}>Price</Text>
            </View>
            <FlatList data={mealList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            props.mealSelect(item.name);
                            setColorChange(item.id)
                        }} style={[styles.eachMeal, { backgroundColor: colorChange === item.id ? '#ff661a' : 'black' }]}>
                            <Text style={styles.eachMealText}>{item.name}</Text>
                            <Text style={styles.eachMealText}>{item.price}</Text>
                        </TouchableOpacity>
                    )
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    eachMeal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5,

    },
    eachMealText: {
        fontSize: 18,
        color: 'white',
        paddingVertical: 5,

    }
})
export default App;



{/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: '2%', marginTop: 20 }}>
                <Text style={{ fontSize: 20, marginTop: 15 }}>Select meal   <ThumbRight name="hand-point-right" size={24} /></Text>
                <View style={{ borderColor: '#4d2800', borderWidth: 2, borderRadius: 10 }}>
                    <Picker
                        selectedValue={selectedMeal}
                        style={{ height: 50, width: 110 }}
                        onValueChange={(itemValue, itemIndex) => {
                            let temp = selectedMeal;
                            temp = itemValue;
                            setSelectedMeal(temp);
                            //  console.log(temp.selectedMeal);
                        }}
                    >
                        <Picker.Item label="Lists" value="" />
                        <Picker.Item label="Roti-sabji  30" value="Roti-sabji" />
                        <Picker.Item label="Chawal-dal  35" value="Chawal-dal" />
                        <Picker.Item label="mach-bhat   50" value="mach-bhat" />
                        <Picker.Item label="murga-bhat   60" value="murga-bhat" />
                        <Picker.Item label="Litti-chokha   25" value="Litti-chokha" />
                        <Picker.Item label="paneer-dosa   55" value="paneer-dosa" />
                    </Picker>
                </View>
            </View> */}