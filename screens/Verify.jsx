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
import Header from "../components/Header";
import Heading from "../components/Heading";
import { useMessageAndErrorOther } from "../utils/hooks";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/actions/otherAction";

const Verify = ({ navigation }) => {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

      const dispatch = useDispatch();
      const loading = useMessageAndErrorOther(dispatch, navigation, "login");


    const submitHandler = () => {
        dispatch(resetPassword(otp, password));
    };
    return (
        <>
            <View style={{ ...defaultStyle, padding: 10 }}>
                {/* Heading */}

                <Heading
                    text1={"Reset Password"}
                    text2={"Enter the OTP"}
                    containerStyle={{ paddingTop: 70, margin: 25, marginTop: 30, marginBottom: -30 }} />

                <View style={styles.container}>

                    <Avatar.Icon size={100} style={{
                        alignSelf: "center",
                        backgroundColor: "white",
                    }} icon="lock-question" />

                    <TextInput
                        {...inputOptions}
                        placeholder="OTP"
                        secureTextEntry={true}
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="New Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Button
                        loading={loading}
                        textColor={colors.color2}
                        disabled={otp === "" || password === ""}
                        style={styles.btn}
                        onPress={submitHandler}
                    >
                        Reset
                    </Button>

                    <Text style={styles.or}>OR</Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("forgetpassword")}
                    >
                        <Text style={styles.link}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Footer activeRoute="profile" />
        </>
    );
};

export default Verify;