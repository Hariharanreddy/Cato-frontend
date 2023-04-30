import { View, Text } from "react-native";
import React from "react";
import { colors } from "../styles/styles";

const Heading = ({ text1="", text2 , containerStyle }) => {
  return (
    <View style={containerStyle}>
      <Text style={{ fontSize: 25, color: colors.color1 }}>{text1}</Text>
      <Text style={{ fontSize: 25, fontWeight: "900", color: colors.color1  }}>{text2}</Text>
    </View>
  );
};

export default Heading;