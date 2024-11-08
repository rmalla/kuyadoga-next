// lib/fetcher.js
//
// export async function fetchProducts() {
//     // const response = await fetch('https://your_django_domain.com/api/products/');
//     const response = await fetch('http://kuyadoga.com:8002/api/products/?limit=12');
//     if (!response.ok) {
//         throw new Error('Failed to fetch products');
//     }
//     return response.json();
// }



// lib/api.js or lib/fetcher.js
export async function fetchProducts({ manufacturer, partNumber, limit, order } = {}) {
    // Construct the base URL
    let url = `http://kuyadoga.com:8002/api/products/?`;

    // Append query parameters based on the inputs
    if (manufacturer) url += `manufacturer=${encodeURIComponent(manufacturer)}&`;
    if (partNumber) url += `part_number=${encodeURIComponent(partNumber)}&`;
    if (limit) url += `limit=${limit}&`;
    if (order) url += `order=${encodeURIComponent(order)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Error fetching products: ${res.statusText}`);
        }
        const data = await res.json();
        return data.results || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}






export async function fetchProductById(id) {
    const response = await fetch(`http://kuyadoga.com:8002/api/products/${id}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return await response.json();
}



export async function getProduct(manufacturer, partnumber) {
    const url = `http://kuyadoga.com:8002/api/products/?manufacturer=${encodeURIComponent(manufacturer)}&part_number=${encodeURIComponent(partnumber)}`;
    const res = await fetch(url);

    if (!res.ok) {
        console.error(`Error fetching product: ${res.statusText}`);
        return null;
    }

    const data = await res.json();
    return data.results && data.results.length > 0 ? data.results[0] : null;
}




// Fetch related products
export async function getRelatedProducts(manufacturer) {
    const url = `http://kuyadoga.com:8002/api/products/?manufacturer=${encodeURIComponent(manufacturer)}&limit=16`;
    const res = await fetch(url);

    if (!res.ok) {
        console.error(`Error fetching related products: ${res.statusText}`);
        return [];
    }

    const data = await res.json();
    return data.results || [];
}



export async function fetchProductsManufacturer(manufacturer, page = 1) {
    const limit = 15;

    // Fetch data from the API using `page` and `limit` as query parameters
    const res = await fetch(`http://kuyadoga.com:8002/api/products/?manufacturer=${encodeURIComponent(manufacturer)}&page=${page}&limit=${limit}`, {
        cache: 'no-store' // Ensures fresh data for each request
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await res.json();

    // Log the API response to verify structure (useful for debugging)
    // console.log("API response:", data);

    // Return products array and calculate total pages based on `count` and `limit`
    return {
        products: Array.isArray(data.results) ? data.results : [],  // Ensure products is an array
        totalPages: Math.ceil(data.count / limit)  // Calculate total pages based on count
    };
}
