import { Text, View, Pressable, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from "react";    
import axios from "axios";
import api from "../api";
import { useNavigation } from "@react-navigation/native";
import CategoryContext from "../server/CategoryContext";

export default function Categories() {

    //this function is created because I wanted to base my sizes on each user's screen, but I'm unable
    //to get the dimensions from a separate hook call, it needs to be integrated in the styles function
   
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
                textAlign: 'center',
            },
            addButton: {
                justifyContent: 'center',
                textAlign: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                width: dimensions.width * 0.9,
                height: dimensions.height * 0.08,
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
            },
        })  
        return { styles };
    };
   
    const navigation = useNavigation();

    const {styles} = useStyle(); 
    const [errors, setErrors] = useState([]);
    const { setCategories } = useContext(CategoryContext);
    const [categData, setCategData] = useState([]);    

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await api.get('/categories');
            const data = response.data;
            setCategData(data);
            } catch (error) {
            console.error('Error fetching categories:', error);
            }
        };
        fetchData();
        }, []
    );
        
    const handleCategory = async(id, name) => {
        try {
            console.log(id);
            const response = await api.get('/categories/return', { params: { id, name } });
            const temp = response.data[0];
            const categoryID = temp.id;
            const categoryName= temp.categoryName;
            console.log('category:', categoryID, "name", categoryName);
            const categories = {
                categoryID: categoryID,
                categoryName: categoryName,
            };
            setCategories(categories);
            navigation.goBack({categories});
        
          } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors);
                console.log(error.response.data);
              } else {
                console.log(error);
              }
            }
        };

    const Category = ({name, catColor, id}) => {
        return (
            <Pressable onPress={() => handleCategory(id, name)}>
                <View style={styles.categElement} >
                    <View style={[styles.categColor,{backgroundColor: catColor}]} />
                    <Text style={styles.categName}>{name}</Text>
                </View>
            </Pressable>
        )
    }

    return(
        <View style={styles.bigContainer}>
            <Text style={styles.screenTitle}>Select Category</Text>
            <View style={styles.categSectionContainer}>
                {categData.length > 0 ?
                    <FlatList 
                        data={categData}
                        renderItem={({item}) => <Category  name={item.categoryName}  catColor={item.color} id={item.id}/>}
                        keyExtractor={category => category.id}
                        style={styles.categFlatList}
                        contentContainerStyle={styles.contentContainer}
                    />
                    : <Text style={{alignSelf: 'center'}}>Loading categories...</Text>
                }
                {/* <Pressable style={styles.pressable}>
                    <Category name="Add category..." catColor="white" fontSize='50' />
                </Pressable> */}
                  
            </View>
            <Pressable onPress={() => navigation.navigate("AddCategory")}>
                <View style={styles.addButton}>
                    <Text>Add Category...</Text>
                </View>
            </Pressable>
        </View>
    );
    
// }

};
