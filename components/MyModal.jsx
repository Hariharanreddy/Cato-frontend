import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";

const MyModal = ({ id, deleteHandler, navigate, setOpenModal }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                }}
                onPress={() => setOpenModal(false)}
            >
                <Avatar.Icon
                    icon={"close"}
                    size={25}
                    style={{
                        backgroundColor: colors.color1,
                    }}
                />
            </TouchableOpacity>

            <Text
                style={styles.text}
                onPress={() => navigate.navigate("updateproduct", { id })}
            >
                Edit
            </Text>

            <Button textColor={colors.color2} mode="elevated" style={styles.btn} onPress={() => deleteHandler(id)}>
                Delete
            </Button> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 150,
        alignSelf: "center",
        justifyContent: "space-between",
        alignContent: "space-between",
        zIndex: 100,
        backgroundColor: colors.color2,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        elevation: 10,
        marginBottom: 7,
    },

    text: {
        fontWeight: "900",
        textAlign: "center",
        textTransform: "uppercase",
        marginTop: 20
    },

    btn: {
        backgroundColor: colors.color3
    }
});

export default MyModal;