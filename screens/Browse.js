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

const { width, height } = Dimensions.get("window");

class Browse extends Component {


  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  }
  
  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
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
      
      <Block center middle>
        {this.renderIllustrations()}
        {this.renderSteps()}
      </Block>
      
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
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  footer: {
    height: 70,
    width: 'auto',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'stretch'

  },
});