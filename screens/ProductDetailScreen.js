import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { getProduct, getProductsByCategory, addToCart } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        const productData = await getProduct(productId);
        setProduct(productData);
        const relatedProductsData = await getProductsByCategory(productData.category);
        setRelatedProducts(relatedProductsData.filter(p => p.id !== productId));
    };

    const handleAddToCart = async () => {
        const userId = await AsyncStorage.getItem('userId');
        await addToCart(userId, product.id);
    };

    if (!product) return null;

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>

            <Text style={styles.relatedProductsTitle}>You can also like this</Text>
            <FlatList
                horizontal
                data={relatedProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
                        <View style={styles.relatedProduct}>
                            <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
                            <Text style={styles.relatedProductTitle}>{item.title}</Text>
                            <Text style={styles.relatedProductPrice}>${item.price}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    productImage: {
        width: '100%',
        height: 300,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    productPrice: {
        fontSize: 20,
        color: '#888',
    },
    productDescription: {
        fontSize: 16,
        marginVertical: 8,
    },
    addButton: {
        backgroundColor: '#FF3B30',
        padding: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    relatedProductsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    relatedProduct: {
        marginRight: 16,
        alignItems: 'center',
    },
    relatedProductImage: {
        width: 100,
        height: 100,
    },
    relatedProductTitle: {
        fontSize: 14,
        marginTop: 8,
    },
    relatedProductPrice: {
        fontSize: 12,
        color: '#888',
    },
});

export default ProductDetailScreen;
