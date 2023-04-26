import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
    colors,
    defaultImg,
    defaultStyle,
} from "../styles/styles";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../redux/actions/userActions";
import {
    useMessageAndErrorOther,
    useMessageAndErrorUser,
} from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";
import { updatePic } from "../redux/actions/otherAction";

const Profile = ({ navigation, route }) => {

    const { user } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(defaultImg);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const loading = useMessageAndErrorUser(navigation, dispatch, "login");

    const logoutHandler = () => {
        dispatch(logout());
    };

    const navigateHandler = (text) => {
        switch (text) {
            case "Admin":
                navigation.navigate("adminpanel");
                break;
            case "Orders":
                navigation.navigate("orders");
                break;
            case "Profile":
                navigation.navigate("updateprofile");
                break;
            case "Password":
                navigation.navigate("changepassword");
                break;
            case "Sign Out":
                logoutHandler();
                break;

            default:
            case "Orders":
                navigation.navigate("orders");
                break;
        }
    };

    const loadingPic = useMessageAndErrorOther(dispatch, null, null, loadUser);

    useEffect(() => {
        if (route.params?.image) {

            setAvatar(route.params.image);
            // dispatch updatePic Here
            const myForm = new FormData();
            myForm.append("file", {
                uri: route.params.image,
                type: mime.getType(route.params.image),
                name: route.params.image.split("/").pop(),
            });
            dispatch(updatePic(myForm));
            
        }

        dispatch(loadUser());
    }, [route.params, dispatch, isFocused]);

    useEffect(() => {
        if (user?.avatar) {
            setAvatar(user.avatar.url);
        }
    }, [user]);

    return (
        <>
            <View style={{ ...defaultStyle }}>

                {/* Heading */}
                <Header back={true} cart={false} />

                <Heading
                    text2={"Profile"}
                    containerStyle={{ paddingTop: 70, margin: 25, marginTop: -30, marginLeft: 5 }} />

                {/* Loading */}

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <View style={styles.container}>
                            <Avatar.Image
                                source={{
                                    uri: avatar,
                                }}
                                size={100}
                                style={{ backgroundColor: colors.color5 }}
                            />

                            <TouchableOpacity
                                disabled={loadingPic}
                                onPress={() =>
                                    navigation.navigate("camera", { updateProfile: true })
                                }
                            >
                                <Button
                                    disabled={loadingPic}
                                    loading={loadingPic}
                                    textColor={colors.color1}
                                >
                                    Change Photo
                                </Button>
                            </TouchableOpacity>

                            <Text style={styles.name}>{user?.name}</Text>
                            <Text
                                style={{
                                    fontWeight: "300",
                                    color: colors.color3,
                                }}
                            >
                                {user?.email}
                            </Text>
                        </View>

                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    margin: 10,
                                    justifyContent: "space-between",
                                }}
                            >
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Orders"}
                                    icon={"format-list-bulleted-square"}
                                />
                                {user?.role === "admin" && (
                                    <ButtonBox
                                        handler={navigateHandler}
                                        icon={"view-dashboard"}
                                        text={"Admin"}
                                        reverse={true}
                                    />
                                )}
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Profile"}
                                    icon={"pencil"}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    margin: 10,
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Password"}
                                    icon={"pencil"}
                                />
                                <ButtonBox
                                    handler={navigateHandler}
                                    text={"Sign Out"}
                                    icon={"exit-to-app"}
                                />
                            </View>
                        </View>
                    </>
                )}
            </View>

            <Footer />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "lightgray"
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,
        color: colors.color3,
    },
});

export default Profile;