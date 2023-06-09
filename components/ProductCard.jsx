import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { colors } from '../styles/styles'
import { Avatar, Button } from 'react-native-paper'

const ProductCard = ({ stock, name, price, image, id, addToCardHandler, i, navigate }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigate.navigate("productdetails", { id })}>
            <View
                style={{
                    elevation: 15,
                    width: 250,
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 20,
                    borderRadius: 20,
                    height: 380,
                    backgroundColor: "rgb(253,238,222)"
                }}
            >
                <Image
                    source={{
                        uri: image
                    }}

                    style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "contain",
                        position: "absolute",
                        left: 20,
                        top: 80,
                    }}
                />

                <View
                    style={{
                        flexDirection: "row",
                        padding: 20,
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center"
                    }}
                >
                    <Text
                        numberOfLines={2}
                        style={{
                            color: colors.color1,
                            fontSize: 25,
                            fontWeight: "300",
                            width: "60%",
                        }}
                    >
                        {name}
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={{
                            color: colors.color1,
                            fontSize: 20,
                            fontWeight: "700",
                        }}
                    >
                        ₹{price}
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: colors.color2,
                        borderRadius: 0,
                        paddingVertical: 5,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        width: "100%",
                    }}
                >
                    <Button
                        onPress={() => addToCardHandler(id, name, price, image, stock)}
                        textColor={colors.color1}
                    >
                        
                        Add To Cart
                    </Button>
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    )
}

export default ProductCard