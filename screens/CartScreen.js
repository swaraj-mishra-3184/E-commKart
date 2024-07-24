import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserCart, updateCart, deleteCart } from '../api';

const CartScreen = () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const response = await getUserCart(userId);
        setCart(response);
    };

    const handleRemoveItem = async (productId) => {
        const updatedProducts = cart.products.filter((item) => item.productId !== productId);
        await updateCart(cart.id, updatedProducts);
        setCart({ ...cart, products: updatedProducts });
    };

    const handleClearCart = async () => {
        await deleteCart(cart.id);
        setCart(null);
    };

    return (
        <View style={styles.container}>
            {cart ? (
                <FlatList
                    data={cart.products}
                    keyExtractor={(item) => item.productId.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.product}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productTitle}>{item.title}</Text>
                                <Text style={styles.productPrice}>${item.price}</Text>
                                <TouchableOpacity onPress={() => handleRemoveItem(item.productId)}>
                                    <Text style={styles.removeText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    style={styles.productList}
                />
            ) : (
                <Text style={styles.emptyText}>Your cart is empty</Text>
            )}
            {cart && (
                <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
                    <Text style={styles.clearText}>Clear Cart</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    productList: {
        marginTop: 16,
    },
    product: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
    },
    removeText: {
        color: '#FF3B30',
    },
    clearButton: {
        padding: 16,
        backgroundColor: '#FF3B30',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 16,
    },
    clearText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default CartScreen;
