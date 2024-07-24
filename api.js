const API_URL = 'https://fakestoreapi.com';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Login API call failed:', error);
    throw error;
  }
};

export const registerUser = async (userDetails) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Registration API call failed:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const data = await handleResponse(response);
    console.log('Fetched user data:', data); // Add this line
    return data;
  } catch (error) {
    console.error('Fetching user profile failed:', error);
    throw error;
  }
};


export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Fetching products failed:', error);
    throw error;
  }
};

export const getProductCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Fetching product categories failed:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Fetching products by category failed:', error);
    throw error;
  }
};

export const getUserCart = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/carts/user/${userId}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Fetching user cart failed:', error);
    throw error;
  }
};

export const addToCart = async (userId, productId) => {
  try {
    const response = await fetch(`${API_URL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        date: new Date().toISOString(),
        products: [{ productId, quantity: 1 }],
      }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Adding to cart failed:', error);
    throw error;
  }
};

export const updateCart = async (cartId, products) => {
  try {
    const response = await fetch(`${API_URL}/carts/${cartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: new Date().toISOString(),
        products,
      }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Updating cart failed:', error);
    throw error;
  }
};

export const deleteCart = async (cartId) => {
  try {
    const response = await fetch(`${API_URL}/carts/${cartId}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Deleting cart failed:', error);
    throw error;
  }
};

export const getProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return response.json();
};

