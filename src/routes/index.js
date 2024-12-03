
const BACKEND_URL = "https://subhalaxmi-backend.onrender.com"
export const register = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.status === 200 || response.status === 400) {
        return response.json()
    }
    throw new Error('Something went wrong')
}

export const login = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.status === 200 || response.status === 400) {
        return response.json()
    }
    throw new Error('Something went wrong')
}



export const getUserDetailsById = async (id) => {
    const response = await fetch(`${BACKEND_URL}/api/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
    if (response.status === 200 || response.status === 400) {
        return response.json();
    }
    throw new Error('Failed to fetch user details');
};

export const getAllFoodItems = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/food/getAllFoodItems`);
        if (!response.ok) {
            throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching food items:', error);
        throw error;
    }
};

export const getAllPhotos = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/photo/getPhotos`);
        if (!response.ok) {
            throw new Error(`Failed to fetch photos: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};

export const getLoginPhoto = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/photo/getLoginPhoto`);
        if (!response.ok) {
            throw new Error(`Failed to fetch login photo: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching login photo:', error);
        throw error;
    }
};
