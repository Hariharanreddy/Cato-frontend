import { View, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../components/OrderItem";
import { useGetOrders } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import Heading from "../components/Heading";


const Orders = () => {
    const isFocused = useIsFocused();
      const { loading, orders } = useGetOrders(isFocused);

    return (
        <View
            style={{
                ...defaultStyle,
                backgroundColor: colors.color5,
                padding: 10
            }}
        >
            <Header back={true} />

            {/* Heading */}
            <Heading
                text1={`Total Count - ${orders.length}`}
                text2={"Orders"}
                containerStyle={{ paddingTop: 70, margin: 25, marginLeft: 30, flexDirection: "column-reverse" }}
             />

            {loading ? (
                <Loader />
            ) : (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {orders.length > 0 ? (
                            orders.map((item, index) => (
                                <OrderItem
                                    key={item._id}
                                    id={item._id}
                                    i={index}
                                    price={item.totalAmount}
                                    status={item.orderStatus}
                                    paymentMethod={item.paymentMethod}
                                    orderedOn={item.createdAt.split("T")[0]}
                                    address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                                />
                            ))
                        ) : (
                            <Headline style={{ textAlign: "center" }}>No Orders Yet</Headline>
                        )}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default Orders;