import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  inputOptions,
  formStyles as styles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import { useMessageAndErrorUser } from "../utils/hooks";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

  const submitHandler = () => {
    dispatch(login(email, password));
  };

  return (
    <>
      <View style={{ ...defaultStyle, padding: 10 }}>
        {/* Heading */}

        <Heading
          text1={"Meowlcome to Cato,"}
          text2={"Please Log In"}
          containerStyle={{
            paddingTop: 70,
            margin: 25,
            marginTop: 50,
            marginBottom: 0,
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ ...styles.container }}>
            <TextInput
              {...inputOptions}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              {...inputOptions}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("forgetpassword")}
            >
              <Text style={styles.forget}>Forget Password?</Text>
            </TouchableOpacity>

            <Button
              loading={loading}
              disabled={email === "" || password === ""}
              style={{
                ...styles.btn,
                backgroundColor:
                  email === "" || password === "" ? "lightgrey" : colors.color1,
              }}
              onPress={submitHandler}
              textColor={colors.color2}
            >
              Log In
            </Button>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("signup")}
            >
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Login;
