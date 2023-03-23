import { Text, View, Pressable, FlatList, StyleSheet, useWindowDimensions } from "react-native";


export default function Categories() {
    //this function is created because I wanted to base my sizes on each user's screen, but I'm unable
    //to get the dimensions from a separate hook call, it needs to be integrated in the styles function
    const { styles } = useStyle(); 

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Select Category</Text>
            <View style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.categContainer}>
                    <View style={styles.categColor} />
                    <Text style={styles.categName}>Test Category</Text>
                </View>

                <View style={styles.categContainer}>
                    <View style={styles.categColor} />
                    <Text style={styles.categName}>Test Category</Text>
                </View>
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
    
        categContainer: {
            flex: 0.1,
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',

            borderRadius: 8,
            width: dimensions.width * 0.9, 
            height: dimensions.height * 0.05,
            margin: 5,
            padding: 0
        },
        categName: {
            fontSize: 13,
        },
        categColor: {
            backgroundColor: "#C00F0F",
            borderRadius: 10,
            width: 10,
            height: 10,
            marginHorizontal: 20,
        },
    })  
    return { styles };
}

