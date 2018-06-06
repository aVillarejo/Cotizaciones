import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import { List, ListItem, SearchBar } from "react-native-elements";

import ServerURL from "./ServerURL";
class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
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
    const url = `${ServerURL}/Cotizaciones_Web/Equipos.json`;
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
                    backgroundColor: "white",
                    resizeMode: Image.resizeMode.contain
                  }}
                  containerStyle={{ borderBottomWidth: 0 }} //   value: `$${item.Costo}`, // badge={{
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
      </SafeAreaView>
    );
  }
}

export default UsersList;
