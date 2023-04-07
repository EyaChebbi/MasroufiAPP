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
        const result = await axios("http://192.168.1.146/categories");
        const data = result.data;

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
        <View style={styles.categContainer}>
            <View style={[styles.categColor,{backgroundColor: catColor}]} />
            <Text style={styles.categName}>{name}</Text>
        </View>
        )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Select Category</Text>
            <View style={{flex: 1, alignItems: 'center'}}>
                {//CategData.length > 0 ?
                    <FlatList 
                        data={CategData}
                        renderItem={({item}) => <Category name={item.name} catColor={item.color}/>}
                        keyExtractor={category => category.id}
                        style={styles.categList}
                        contentContainerStyle={styles.contentContainer}
                    />
                    //: <Text>Loading categories...</Text>
                }
                {/* <Pressable style={styles.pressable}>
                    <Category name="Add category..." catColor="white" fontSize='50' />
                </Pressable> */}
                  <TouchableOpacity style={styles.pressable} onPress={() => navigation.navigate("AddCategory")}>
                    <Category name="Add category..." catColor="white" fontSize='50' />
                  </TouchableOpacity>
            </View>
         
        </View>
    );
}

const useStyle = () => {
    //gets window dimensions, doesn't work when typing { height, width } instead of dimensions
    const dimensions = useWindowDimensions();

    //same style declaration as before  
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#DEDEDE", //note to self: use backgroundColor to change the color of View components
        },
        title: {
            fontWeight: 'bold',
            fontSize: 28,
            padding: 20,
            paddingTop: 40,
        },
    
        categList: {
            flex: 1,
            height: 'auto',
        },

        categContainer: {
            flex: 0.1,
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',

            borderRadius: 8,
            width: dimensions.width * 0.9, 
            height: dimensions.height * 0.1,
            margin: 5,
            padding: 0
        },
        contentContainer: {
            flexGrow: 1,
        },
        categName: {
            fontSize: 13,
        },
        categColor: {
            borderRadius: 10,
            width: 10,
            height: 10,
            marginHorizontal: 20,
        },
        pressable: {
            flex: 0.2,
            margin: 20,
            fontSize: 50,
        }
    })  
    return { styles };
}

