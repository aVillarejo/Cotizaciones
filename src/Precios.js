import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";

import { List, ListItem, SearchBar } from "react-native-elements";

import ServerURL from "./ServerURL";
class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [
        {
          Id: "10",
          Modelo: "iPhone X",
          Costo: 6990,
          AC: 4299,
          avatar:
            "https://assets.mspcdn.net/w_128,h_128,c_pad,b_white/c/13409-32-1.jpg"
        },
        {
          Id: "9",
          Modelo: "iPhone 8 Plus",
          Costo: 4319,
          AC: 3299,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone8/plus/iphone8-plus-red-box-2018?wid=170&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1520633393174"
        },
        {
          Id: "8",
          Modelo: "iPhone 8",
          Costo: 3851,
          AC: 2499,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone8/red/iphone8-red-box-2018?wid=164&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1520633393143"
        },
        {
          Id: "7",
          Modelo: "iPhone 7 Plus",
          Costo: 4319,
          AC: 3299,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone7/plus/iphone7-plus-gold-box-201609?wid=170&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1473360384915"
        },
        {
          Id: "6",
          Modelo: "iPhone 7",
          Costo: 3851,
          AC: 2499,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone7/gold/iphone7-gold-box-201609?wid=164&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1473360382744"
        },
        {
          Id: "5",
          Modelo: "iPhone 6s Plus",
          Costo: 4319,
          AC: 3299,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6s/plus/iphone6s-plus-rosegold-box-201609?wid=196&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1471913018432"
        },
        {
          Id: "4",
          Modelo: "iPhone 6s",
          Costo: 3851,
          AC: 2499,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6s/rosegold/iphone6s-rosegold-box-201609?wid=180&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1471913021385"
        },
        {
          Id: "3",
          Modelo: "iPhone 6 Plus",
          Costo: 3851,
          AC: 0,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6s/plus/iphone6s-plus-spacegray-box-201609?wid=196&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1471913018577"
        },
        {
          Id: "2",
          Modelo: "iPhone 6",
          Costo: 3359,
          AC: 0,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone6s/spacegray/iphone6s-spacegray-box-201609?wid=180&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1471913022039"
        },
        {
          Id: "1",
          Modelo: "iPhone SE/5S/5/5c",
          Costo: 3359,
          AC: 1999,
          avatar:
            "https://store.storeimages.cdn-apple.com/4980/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphonese/rosegold/iphonese-rosegold-box-201609?wid=180&hei=372&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1489698655781"
        }
      ],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      isLoading: true,
      isLoading2: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `http://192.168.137.145/Cotizaciones_Web/Equipos.json`;
    this.setState({
      loading: true
    });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          //data: page === 1 ? res.results : [...this.state.data, ...res.results],
          isLoading: false,
          data: res ? res : [...this.state.data, ...res],
          error: res.error || null,
          loading: false,
          refreshing: false,
          isLoading2: false
        });
      })
      .catch(error => {
        this.setState({
          error,
          loading: false
        });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  // renderHeader = () => {
  //   return (
  //     <SearchBar
  //       containerStyle={{ flexDirection: "row", flex: 1 }}
  //       inputStyle={{ flex: 1 }}
  //       placeholder="Buscar..."
  //       lightTheme
  //       round
  //     />
  //   );
  // };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  static navigationOptions = { header: null };
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <SearchBar
              placeholder="Buscar..."
              lightTheme
              round
              containerStyle={{ flexDirection: "row", flex: 1 }}
              inputStyle={{ flex: 1 }}
            />
          </View>

          <View style={{ flex: 1, paddingTop: 20, alignItems: "center" }}>
            <Text>Cargando</Text>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("UserDetails", {
                  obj: item
                })
              }
            >
              <ListItem
                hideChevron
                roundAvatar
                title={`${item.Modelo}`}
                avatar={
                  { uri: item.avatar } //subtitle={`$${item.Costo}`}
                }
                avatarStyle={{
                  width: 40,
                  height: 50,
                  resizeMode: Image.resizeMode.contain
                }}
                containerStyle={{ borderBottomWidth: 0 }} // badge={{
                //   value: `$${item.Costo}`,
                //   badgeTextStyle: { color: "orange" },
                //   badgeContainerStyle: { marginTop: -20 }
                // }}
                rightTitle={`$${item.Costo} MXN`}
                rightTitleStyle={{ marginRight: 0, color: "black" }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.Id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

export default UsersList;
