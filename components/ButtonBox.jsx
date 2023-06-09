import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const ButtonBox = ({
  icon,
  text,
  handler,
  reverse = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: "center",
      }}
      onPress={() => handler(text)}
      disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={colors.color7}
        style={{ backgroundColor: reverse ? colors.color3 : colors.color1 }}
        icon={icon}
      />
      <Text
        style={{
          color: colors.color1,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonBox;