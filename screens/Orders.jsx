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

// export const orders = [{
//     _id: "ajsdnajksdna",
//     shippingInfo: {
//         address: "76 street",
//         city: "New york",
//         country: "India",
//         pincode: 492009
//     },
//     createdAt: "12-2-2022T2879",
//     orderStatus: "Processing",
//     paymentMethod: "COD",
//     totalAmount: 2000
// }, {
//     _id: "ajsdnaasffdjksdna",
//     shippingInfo: {
//         address: "sahupara",
//         city: "New york",
//         country: "India",
//         pincode: 492009
//     },
//     createdAt: "12-2-2022T2879",
//     orderStatus: "Processing",
//     paymentMethod: "COD",
//     totalAmount: 2000
// },
// {
//     _id: "ajsdnafdfajksdna",
//     shippingInfo: {
//         address: "Box chowk",
//         city: "Mumbai",
//         country: "India",
//         pincode: 492009
//     },
//     createdAt: "12-2-2022T2879",
//     orderStatus: "Processing",
//     paymentMethod: "COD",
//     totalAmount: 2000
// }]


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