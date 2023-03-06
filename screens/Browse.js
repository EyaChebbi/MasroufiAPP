import React, { Component} from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";

 import NavigationBar from '../navigation/NavigationBar';

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import  Icon  from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

class Browse extends Component {


  scrollX = new Animated.Value(0);
        
  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase())
    );

  
    this.setState({ active: tab, categories: filtered });
  };

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="start"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={() => (
            // <Image
            //   source={item.source}
            //   resizeMode="contain"
            //   style={{ width, height: height / 4, overflow: 'visible' }}
            // />
          <Card center middle shadow style={styles.card} >
                 
                      <Icon name="money" size={30} color="#4F8EF7" /> 
                  <Text medium height={20}>
                    CASH
                  </Text>
                  <Text black caption>
                   0.00 TND
                  </Text>
                </Card>
          
        )}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { x: this.scrollX } },
            
          }], {useNativeDriver: false})
        }
      />
    )
  }

renderSteps() {
  const { illustrations } = this.props;
  const stepPosition = Animated.divide(this.scrollX, width);
  return (
    <Block row center middle style={styles.stepsContainer}>
      {illustrations.map((item, index) => {
        const opacity = stepPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <Block
            animated
            flex={false}
            key={`step-${index}`}
            color="gray"
            style={[styles.steps, { opacity }]}
          />
        )
      })}
    </Block>
  )
}


render() {
  return (
    <>
      <Block center middle style={styles.pics} >
       
        {this.renderIllustrations()}
        {this.renderSteps()}
     
      </Block>
      
      {/* <View style={styles.footer}>
      <NavigationBar/>
      </View> */}
      </>
  )
}
}
Browse.defaultProps = {
illustrations: [
  { id: 1, source: require('../assets/masroufi-logoo.png') },
  { id: 2, source: require('../assets/masroufi-logoo.png') },
  { id: 3, source: require('../assets/masroufi-logoo.png') },

],
};



export default Browse;

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  card: {
   marginTop: 50,
   flexWrap:"wrap",
   marginRight: 10,
    width: 150,
    height: 150,
   
  },
  // header: {
  //   paddingHorizontal: theme.sizes.base * 2
  // },
  // avatar: {
  //   height: theme.sizes.base * 2.2,
  //   width: theme.sizes.base * 2.2
  // },
  // tabs: {
  //   borderBottomColor: theme.colors.gray2,
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   marginVertical: theme.sizes.base,
  //   marginHorizontal: theme.sizes.base * 2
  // },
  // tab: {
  //   marginRight: theme.sizes.base * 2,
  //   paddingBottom: theme.sizes.base
  // },
  // active: {
  //   borderBottomColor: theme.colors.secondary,
  //   borderBottomWidth: 3
  // },
  // categories: {
  //   flexWrap: "wrap",
  //   paddingHorizontal: theme.sizes.base * 2,
  //   marginBottom: theme.sizes.base * 3.5
  // },
  // category: {
  //   // this should be dynamic based on screen width
  //   minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  //   maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  //   maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  // },
   footer: {
    height: 70,
    width: 'auto',
    borderTopColor: '#ddd',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
   },
  stepsContainer: {
    position: 'relative',
    bottom: theme.sizes.base * 25,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    
  },
});