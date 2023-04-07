import { Text, View, Pressable, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";    
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
    //this function is created because I wanted to base my sizes on each user's screen, but I'm unable
    //to get the dimensions from a separate hook call, it needs to be integrated in the styles function
    const { styles } = useStyle(); 

    const [CategData, setCategData] = useState([])

    const navigation = useNavigation();

    //version copied from records.js
    useEffect(() => {
    const fetchData = async () => {
        const result = await axios("http://192.168.1.146:3000/categories");
        const data = await result.data;
        
        console.log(data);
        setCategData(data);
    };

    fetchData();
    }, []);

    //version that didn't work before
    // useEffect(() => { 
    //     fetch('http://localhost:3000/categories')
    //     .then(res => {res.json()
    //         console.log()}
    //         )
    //     .then(data => {
    //         setCategData(data);
    //     })
    //     .catch(error => console.log(error))
    // }, []);

    const Category = ({name, catColor}) => {
        return (
        <View style={styles.categElement}>
            <View style={[styles.categColor,{backgroundColor: catColor}]} />
            <Text style={styles.categName}>{name}</Text>
        </View>
        )
    }

    return(
        <View style={styles.bigContainer}>
            <Text style={styles.screenTitle}>Select Category</Text>
            <View style={styles.categSectionContainer}>
                {CategData.length > 0 ?
                    <FlatList 
                        data={CategData}
                        renderItem={({item}) => <Category name={item.categoryName} catColor={item.color}/>}
                        keyExtractor={category => category.id}
                        style={styles.categFlatList}
                        contentContainerStyle={styles.contentContainer}
                    />
                    : <Text>Loading categories...</Text>
                }
                {/* <Pressable style={styles.pressable}>
                    <Category name="Add category..." catColor="white" fontSize='50' />
                </Pressable> */}
                  
            </View>
            <TouchableOpacity style={styles.categElement} onPress={() => navigation.navigate("AddCategory")}>
                <Category name="Add category..." catColor="white" fontSize='50' />
            </TouchableOpacity>
        </View>
    );
}

const useStyle = () => {
    //gets window dimensions, doesn't work when typing { height, width } instead of dimensions
    const dimensions = useWindowDimensions();

    //same style declaration as before  
    const styles = StyleSheet.create({
        //the whole screen
        bigContainer: {
            backgroundColor: "#4FA095",
            flex: 1,
        },
        //"Select Category"
        screenTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: "white",

            marginLeft: dimensions.width * 0.05,
            marginVertical: 10,
        },
        //category section
        categSectionContainer: {
            width: dimensions.width * 0.9,
            height: dimensions.height * 0.7,
            alignSelf: 'center',
        },
        categFlatList: {
            flex: 1,
        },
        categElement: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            height: dimensions.height * 0.05,
            width: dimensions.width * 0.9,

            marginVertical: 10,
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent: 'flex-start',
        },
        categColor: {
            marginHorizontal: 20,
            marginVertical: 10,
            height: 20,
            width: 20,
            borderRadius: 20,
        },
        categName: {
            fontSize: 13,
            color: 'black',
        }
    })  
    return { styles };
}

