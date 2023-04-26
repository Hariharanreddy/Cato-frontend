import { View} from "react-native";
import React, { useState } from "react";
import {
    colors,
    defaultStyle,
    inputOptions,
    formStyles as styles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";

const ChangePassword = () => {
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch();
    const loading = useMessageAndErrorOther(dispatch);

    const submitHandler = () => {
        dispatch(updatePassword(oldPassword, newPassword));
        setOldPassword("");
        setNewPassword("");
    };

    return (
        <View style={{ ...defaultStyle, padding: 10 }}>
            <Header back={true} />

            {/* Heading */}
            <Heading
                text2={"Change Password"}
                containerStyle={{ paddingTop: 70, margin: 25, marginBottom: -30 }} />

            <View style={{ ...styles.container, flex: 1, justifyContent: "space-between"}}>
                <View>
                    <TextInput
                        {...inputOptions}
                        placeholder="Old Password"
                        secureTextEntry={true}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />
                    <TextInput
                        {...inputOptions}
                        placeholder="New Password"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                </View>

                <Button
                    loading={loading}
                    textColor={colors.color2}
                    disabled={oldPassword === "" || newPassword === ""}
                    style={styles.btn}
                    onPress={submitHandler}
                >
                    Change
                </Button>
            </View>
        </View>
    );
};

export default ChangePassword;