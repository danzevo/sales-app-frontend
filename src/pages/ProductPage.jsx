import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/product';
import Loader from '../components/Shared/Loader';
import { formatPrice } from '../utils/Helper';

const ProductPage = () => {
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, []);

    if(loading) return <Loader />;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Stock</th>
                        <th className="px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2 text-right">{product.stock}</td>
                            <td className="border px-4 py-2 text-right">{formatPrice(product.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductPage;