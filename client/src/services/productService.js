import API from "../api/axios";
import handleError from "../utils/handleError";

export const getProducts = async () => {
    try {
        const {data} = await API.get('/Products');
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const getProductById = async (id) => {
    try {
        const { data } = await API.get(`/Products/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const updateProduct = async (id, formData) => {
    try {
        const { data } = await API.put(`/Products/${id}`, formData);
        return data;
    } catch (error) {
        handleError(error);
    }
};


export const softDeleteProduct = async (id) => {
    try {
        const { data } = await API.delete(`/Products/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const getFilteredProducts = async (filters = {}) => {
	try {
		const categoryMap = {
			phones: "phone",
			laptops: "laptop",
			accessories: "accessory",
		};

		const normalizedFilters = { ...filters };

		if (normalizedFilters.category) {
			normalizedFilters.category =
				categoryMap[normalizedFilters.category] || normalizedFilters.category;
		}

		Object.keys(normalizedFilters).forEach((key) => {
			if (
				normalizedFilters[key] === undefined ||
				normalizedFilters[key] === null ||
				normalizedFilters[key] === ""
			) {
				delete normalizedFilters[key];
			}
		});

		const params = new URLSearchParams(normalizedFilters).toString();
		const url = `/Products/filter/advanced${params ? `?${params}` : ""}`;

		const { data } = await API.get(url);
		return data;
	} catch (error) {
		handleError(error);
		return { data: [] };
	}
};



export const fetchFeaturedProducts = async () => {
	try {
		const response = await API.get("products/featured"); // Axios resolves JSON for you
		return response.data; // ✅ this contains { success: true, data: [...] }
	} catch (error) {
		console.error("Error fetching featured products:", error.message);
		handleError(error);
		return { success: false, data: [] }; // ✅ match expected shape
	}
};


export const fetchPromoProducts = async () => {
	try {
		const response = await API.get("products/promos");
		return response.data.data;
	} catch (error) {
		console.error("Error fetching promo deals:", error.message);
		return [];
	}
};
