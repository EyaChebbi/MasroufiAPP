import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'

import { Card, Badge, Button, Block, Text } from '../components';
import { theme, mocks } from '../constants';

const { width } = Dimensions.get('window');

export default class Browse extends Component {
  
  state = {
    active: 'Balances',
    categories: [],
  }

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(
      category => category.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, categories: filtered });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    
    )
  }

  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;
    const tabs = ['Balance', 'Expenses', 'Cash Flow', 'Outlook'];

    return (
      // <Block>
      //   <Block flex={false} row center space="between" style={styles.header}>
      //     <Text h1 bold>Dashboard</Text>
      //     <Button onPress={() => navigation.navigate('Settings')}>
      //       <Image
      //         source={profile.avatar}
      //         style={styles.avatar}
      //       /> 
      //     </Button>
      //   </Block>

      //   <Block flex={false} row style={styles.tabs}>
      //     {tabs.map(tab => this.renderTab(tab))}
      //   </Block>

      //   <ScrollView
      //     showsVerticalScrollIndicator={false}
      //     style={{ paddingVertical: theme.sizes.base * 2}}
      //   >
      //     <Block flex={false} row space="between" style={styles.categories}>
      //       {categories.map(category => (
      //         <TouchableOpacity
      //           key={category.name}
      //           onPress={() => navigation.navigate('Explore', { category })}
      //         >
      //           <Card center middle shadow style={styles.category}>
      //             <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
      //               <Image source={category.image} />
      //             </Badge>
      //             <Text medium height={20}>{category.name}</Text>
      //             <Text gray caption>{category.count} products</Text>
      //           </Card>
      //         </TouchableOpacity>
      //       ))}
      //     </Block>
      //   </ScrollView>
      // </Block>

      <View style={{height:"100%",backgroundColor:'#F5F8FF'}}>          
                <View style={styles.headerbar}>
                    <TouchableOpacity>
                      <View>
                          <View style={{color:LIGHTGREY,width:20,height:3,marginVertical:5,backgroundColor:LIGHTGREY}}></View>
                          <View style={{color:LIGHTGREY,width:15,height:3,backgroundColor:LIGHTGREY}}></View>
                          <View style={{color:LIGHTGREY,width:10,height:3,marginVertical:5,backgroundColor:LIGHTGREY}}></View>
                      </View>
                    </TouchableOpacity>
                    <Text style={{fontSize:25,fontWeight:"500",color:LIGHTBLACK}}>Wallets</Text>
                    <TouchableOpacity><Ionicons name="wallet" size={26} color={LIGHTGREY}/></TouchableOpacity>
                </View>
                <View style={{marginHorizontal:20}}>
                    <View>
                    <WalletCoinCard item={{name:"Total Wallet Balance",cryptobalance:"$39.584",imgsrc:wallet}}/>
                    <View style={styles.filters}>
                      <Text style={{color:LIGHTGREY}}>Sorted by higher %</Text>
                      <View style={{flexDirection:"row",alignItems:"center"}}>
                      <Text style={{color:LIGHTGREY}}>24 H</Text>
                      <Ionicons name="chevron-down-outline" size={18} color={LIGHTGREY}/>
                      </View>
                    </View>
                    </View>
                    <View style={{marginTop:10,backgroundColor:"#F5F8FF",overflow:"hidden",marginBottom:100}}>
                     <FlatList
                        data={CRYPTOCURRENCIES}
                        style={{height:(Dimensions.get('window').height/2)-60}}
                        ItemSeparatorComponent = {()=><View style={{marginVertical:8}}></View>}
                        renderItem={({item})=><CoinCard item={item} onPress={()=>nav.navigate("walletdetails",item)}/>}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                </View>
                <View style={styles.footer}>
                        <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingBottom:40}}>
                            <Ionicons name="wallet" size={28} color={LIGHTBLACK}/>
                            <Ionicons name="compass" size={28} color={LIGHTGREY}/>
                            <Ionicons name="notifications" size={28} color={LIGHTGREY}/>
                            <Ionicons name="settings-sharp" size={28} color={LIGHTGREY}/>
                        </View>
                </View>
          </View>

    )
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base),
    maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
  }
})
