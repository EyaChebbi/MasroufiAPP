import { Text, View, Pressable, FlatList, StyleSheet, useWindowDimensions } from "react-native";


export default function Categories({navigation}) {
    //this function is created because I wanted to base my sizes on each user's screen, but I'm unable
    //to get the dimensions from a separate hook call, it needs to be integrated in the styles function
    const { styles } = useStyle(); 

    const CategData = [
        {id: 0, name: 'Food and Drinks', color: '#C00F0F'},
        {id: 1, name: 'Housing', color: '#ECE544'},
        {id: 2, name: 'Transportation', color: '#A8E12F'},
        {id: 3, name: 'Vehicle', color: '#2FE196'},
        {id: 4, name: 'test5', color: '#C00F0F'},
        {id: 5, name: 'test5', color: '#C00F0F'},
        {id: 6, name: 'test5', color: '#C00F0F'},
        {id: 7, name: 'test5', color: '#C00F0F'},
        {id: 8, name: 'test5', color: '#C00F0F'},
        {id: 9, name: 'test5', color: '#C00F0F'},
        {id: 10, name: 'test5', color: '#C00F0F'},
        {id: 11, name: 'test5', color: '#C00F0F'},
        {id: 12, name: 'test5', color: '#C00F0F'},
    ]

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
                <FlatList
                    data={CategData}
                    renderItem={({item}) => <Category name={item.name} catColor={item.color}/>}
                    keyExtractor={category => category.id}
                    style={styles.categList}
                    contentContainerStyle={styles.contentContainer}
                />
                <Pressable style={{flex: 1}}>
                    <Category name="Add category..." catColor="white" />
                </Pressable>
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
    })  
    return { styles };
}

