import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getProductCategories, getProductsByCategory } from '../api';

const CategoryScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await getProductCategories();
        const categoriesWithImages = await Promise.all(response.map(async (category) => {
            const products = await getProductsByCategory(category);
            return {
                name: category,
                image: products[0]?.image || 'https://via.placeholder.com/50', // Default image if no products are found
            };
        }));
        setCategories(categoriesWithImages);
    };

    const fetchProductsByCategory = async (category) => {
        setSelectedCategory(category);
        const response = await getProductsByCategory(category);
        setProducts(response);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => fetchProductsByCategory(item.name)} style={styles.categoryItem}>
                        <Image source={{ uri: item.image }} style={styles.categoryImage} />
                        <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                horizontal
                style={styles.categoryList}
            />
            {selectedCategory && (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.product}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productTitle}>{item.title}</Text>
                                <Text style={styles.productPrice}>${item.price}</Text>
                            </View>
                        </View>
                    )}
                    style={styles.productList}
                />
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
    categoryList: {
        marginBottom: 16,
    },
    categoryItem: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
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
});

export default CategoryScreen;
