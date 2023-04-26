import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
    colors,
    defaultStyle,
    inputOptions,
    inputStyling,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import { Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/SelectComponent";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import Heading from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction";
import { updateProduct } from "../../redux/actions/otherAction";

// const images = [{
//     url: "https://www.pngkit.com/png/full/578-5787799_air-max-270-total-orange-best-nike-shoes.png",
//     _id: "asfdfsgfgfg"
// },
// {
//     url: "https://www.pngkit.com/png/full/578-5787799_air-max-270-total-orange-best-nike-shoes.png",
//     _id: "asfdfsgfgfg"
// }];



const UpdateProduct = ({ navigation, route }) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const { product, loading } = useSelector((state) => state.product);
 

    const [id] = useState(route.params.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Choose Category");
    const [categoryID, setCategoryID] = useState("");
    const [categories, setCategories] = useState([]);

    useSetCategories(setCategories, isFocused);

    const submitHandler = () => {
        dispatch(updateProduct(id, name, description, price, stock, categoryID));
    };

    const loadingOther = useMessageAndErrorOther(
        dispatch,
        navigation,
        "adminpanel"
    );

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id, isFocused]);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(String(product.price));
            setStock(String(product.stock));
            setCategory(product.category?.category);
            setCategoryID(product.category?._id);
        }
    }, [product]);

    return (
        <>
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
                    text2={"Update Product"}
                    containerStyle={{ paddingTop: 70, margin: 25, marginTop: -30, marginLeft: 30 }} />

                {loading ? (
                    <Loader />
                ) : (
                    <ScrollView
                        style={{
                            
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                height: 650,
                            }}
                        >
                            <Button
                                onPress={() =>
                                    navigation.navigate("productimages", {
                                        id,
                                        images: product.images,
                                    })
                                }
                                textColor={colors.color1}
                            >
                                Manage Images
                            </Button>

                            <TextInput
                                {...inputOptions}
                                placeholder="Name"
                                value={name}
                                onChangeText={setName}
                            />

                            <TextInput
                                {...inputOptions}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                            />

                            <TextInput
                                {...inputOptions}
                                placeholder="Price"
                                keyboardType="number-pad"
                                value={price}
                                onChangeText={setPrice}
                            />

                            <TextInput
                                {...inputOptions}
                                placeholder="Stock"
                                value={stock}
                                keyboardType="number-pad"
                                onChangeText={setStock}
                            />

                            <Text
                                style={{
                                    ...inputStyling,
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    padding: 15
                                }}
                                onPress={() => setVisible(true)}
                            >
                                {category}
                            </Text>

                            <Button
                                textColor={colors.color2}
                                style={{
                                    backgroundColor: colors.color1,
                                    margin: 20,
                                    padding: 6,
                                }}
                                onPress={submitHandler}
                                loading={loadingOther}
                                disabled={loadingOther}
                            >
                                Update
                            </Button>
                        </View>
                    </ScrollView>
                )}
            </View>

            <SelectComponent
                categories={categories}
                setCategoryID={setCategoryID}
                setCategory={setCategory}
                visible={visible}
                setVisible={setVisible}
            />
        </>
    );
};

export default UpdateProduct;