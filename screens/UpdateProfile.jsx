import { View, ScrollView } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";

const UpdateProfile = ({ navigation }) => {
    const { user } = useSelector((state) => state.user);

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.address);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [pinCode, setPinCode] = useState(user?.pinCode.toString());

    const dispatch = useDispatch();

    const loading = useMessageAndErrorOther(dispatch, navigation, "profile");

    const submitHandler = () => {
        dispatch(updateProfile(name, email, address, city, country, pinCode));
    };
    
    return (
        <View style={{ ...defaultStyle, padding: 10 }}>
            <Header back={true} />

            {/* Heading */}
            <Heading
                text2={"Edit Profile"}
                containerStyle={{ paddingTop: 70, margin: 25, marginTop: -20 }} />

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <TextInput
                        {...inputOptions}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}

                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TextInput
                        {...inputOptions}
                        placeholder="Country"
                        value={country}
                        onChangeText={setCountry}
                    />

                    <TextInput
                        {...inputOptions}
                        placeholder="Pin Code"
                        value={pinCode}
                        keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
                        onChangeText={setPinCode}
                    />

                    <Button
                        loading={loading}
                        textColor={colors.color2}
                        style={styles.btn}
                        onPress={submitHandler}
                    >
                        Update
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

export default UpdateProfile;