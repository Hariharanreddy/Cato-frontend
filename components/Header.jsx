import { TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const Header = ({ back, emptyCart = false }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const emptyCartHandler = () => {
    dispatch({
      type: "clearCart",
    });
  };

  return (
    <>
      {back && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 20,
            top: 20,
            zIndex: 10,
          }}
          onPress={() => {
            if (navigate.canGoBack()) {
              navigate.goBack();
            } else {
              navigate.navigate("home");
            }
          }}
        >
          <Avatar.Icon
            style={{
              backgroundColor:
                route.name === "productdetails" ? "transparent" : colors.color7,
            }}
            icon={"arrow-left"}
            color={
              route.name === "productdetails" ? colors.color2 : colors.color1
            }
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          zIndex: 10,
        }}
        onPress={emptyCart ? emptyCartHandler : () => navigate.navigate("cart")}
      >
        <Avatar.Icon
          style={{
            backgroundColor: colors.color4,
          }}
          icon={emptyCart ? "delete-outline" : "cart-outline"}
          color={
            route.name === "productdetails" ? colors.color2 : colors.color1
          }
        />
      </TouchableOpacity>
    </>
  );
};

export default Header;
