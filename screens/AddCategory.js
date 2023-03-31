import { View, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import { Button } from '../components';
import { Text } from '../components';
import ColorPicker from 'react-native-wheel-color-picker';
import { useState } from 'react';

export default function AddCategory() {
    //used useState to change the color of the "preview" color after selecting a color
    const [selectedColor, setSelectedColor] = useState("#DEDEDE");
    const styles = useStyle(selectedColor);

    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>Category Name:</Text>
            <TextInput style={styles.textBox} />
            <View style={{flex: 0.1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                <Text style={styles.textStyle}>Choose Category Color:</Text>
                <View style={styles.selectedColor} />
            </View>
            <View style={styles.colorPickerSpace}>
                <ColorPicker 
                    discreteLength={10}
                    onColorChange={(color) => {setSelectedColor(color)}}
                    color={"#DEDEDE"}
                />
            </View>
            <Button gradient style={styles.button}>
                <Text bold white center>Add Category</Text>
            </Button>
        </View>
    )
}

const useStyle = (selectedColor) => {
    const dimensions = useWindowDimensions();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#F5F5F5',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
            paddingHorizontal: 20,
        },
        textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            margin: 5,
        },
        textBox: {
            backgroundColor: 'white',
            border: 2,
            borderColor: "#222222",
            borderRadius: 8,
            padding: 10,
            fontSize: 14,
        },
        button: {
            alignSelf: 'center',
            width: dimensions.width / 2,
            backgroundColor: "#4FA095",
        },
        colorPickerSpace: {
            width: dimensions.width * 0.9,
            height: 'auto',
            flex: 0.6,
            marginVertical: 20,
        },
        selectedColor: {
            width: 20,
            height: 20,
            borderRadius: 20,
            backgroundColor: selectedColor,
        }
    })
    return styles;
}

