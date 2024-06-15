import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  BackHandler,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Searchbar, Headline } from "react-native-paper";
import { colors } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";

const SearchModal = ({
  searchQuery,
  setSearchQuery,
  setActiveSearch,
  products = [],
}) => {
  const navigate = useNavigation();

  const backAction = () => {
    setSearchQuery("");
    setActiveSearch(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    // The purpose of this cleanup function is to prevent memory leaks and ensure
    // that the event listener is properly removed when it is no longer needed.
    // If the event listener is not removed, it can continue to listen for events even
    // after the component is unmounted, which can lead to unexpected behavior or performance issues.
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color2,
        padding: 25,
        paddingTop: 0,
      }}
    >
      <SafeAreaView>
        <Searchbar
          placeholder="Search..."
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={{
            marginTop: 30,
            borderRadius: 20,
            backgroundColor: colors.color7,
          }}
        />

        <ScrollView>
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 10,
            }}
          >
            {products.map((i) => (
              <SearchItem
                key={i._id}
                imgSrc={i.images[0]?.url}
                name={i.name}
                price={i.price}
                handler={() =>
                  navigate.navigate("productdetails", { id: i._id })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export const SearchItem = ({ price, name, imgSrc, handler }) => (
  <>
    <TouchableOpacity onPress={handler}>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: colors.color7,
          elevation: 5,
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "row",
          marginVertical: 30,
        }}
      >
        <Image
          source={{
            uri: imgSrc,
          }}
          style={{
            width: 80,
            height: 80,
            position: "absolute",
            resizeMode: "contain",
            top: -15,
            left: 10,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <View
          style={{
            width: "80%",
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: colors.color1,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Headline
            numberOfLines={1}
            style={{
              fontWeight: "900",
              color: colors.color1,
            }}
          >
            ₹{price}
          </Headline>
        </View>
      </View>
    </TouchableOpacity>
  </>
);

export default SearchModal;
