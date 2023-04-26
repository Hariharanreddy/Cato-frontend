import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
    colors,
    defaultStyle,
    formHeading,
    inputOptions,
    formStyles as styles,
} from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";

const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const loading = useMessageAndErrorOther(dispatch, navigation, "verify");

    const submitHandler = () => {
        dispatch(forgetPassword(email));
    };

    return (
        <>
            <View style={{ ...defaultStyle, padding: 10 }}>

                {/* Heading */}

                <Heading
                    text2={"Forget Password ?"}
                    text1={"Enter your email."}
                    containerStyle={{ paddingTop: 70, margin: 25, marginTop: 50,  marginBottom: -30, flexDirection: "column-reverse"  }} />



                <View style={styles.container}>

                    <Avatar.Icon size={100} style={{
                        alignSelf: "center",
                        backgroundColor: "white",
                    }} icon="lock-question" />

                    <TextInput
                        {...inputOptions}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Button
                        loading={loading}
                        textColor={colors.color2}
                        disabled={email === ""}
                        style={styles.btn}
                        onPress={submitHandler}
                    >
                        Send OTP
                    </Button>

                    <Text style={styles.or}>OR</Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("login")}
                    >
                        <Text style={styles.link}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Footer activeRoute="profile" />
        </>
    );
};

export default ForgetPassword;