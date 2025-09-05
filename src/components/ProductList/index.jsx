



import React, { useState, useEffect } from 'react';

import Navigation from '../Navigation'
import ProductCard from '../ProductCard';
import FilterHeader from '../FilterHeader'
import filterOps from '../FilterOps';
import Loader from '../Loader'
import MainFilter from '../MainFilter';
import Footer from '../Footer';

import styles from '../../styles/components/ProductList.module.css';

// import { MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

const ProductList = ({ serverProducts }) => {
    const [productList, setProductList] = useState(serverProducts || []);
    const [isLoading, setIsLoading] = useState(!serverProducts);
    const [isMainFilterShowing, setIsMainFilterShowing] = useState(false);
    const [subfilterSelected, setSubFilterSelcted] = useState("RECOMMENDED")
    const [selectedFilters, setSelectedFilters] = useState({});

    useEffect(() => {
        if (!serverProducts || serverProducts.length === 0) {
            getProductList();
        }
    }, [serverProducts]);

    const getProductList = () => {
        setIsLoading(true)
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProductList(data);
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error fetching products:', error)
                setIsLoading(false)
            });
    };

    const toggleMainFilter = () => {
        setIsMainFilterShowing(!isMainFilterShowing);
    };

    const finalFilteredPoductslist = filterOps(productList, subfilterSelected, selectedFilters)

    return (
        <div className={styles.productContainer}>
            <Navigation />

            <div className={styles.productTitleContainer}>
                <h1>DISCOVER OUR PRODUCTS</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
                    scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
                    dolor.
                </p>
            </div>
            <FilterHeader
                itemCount={finalFilteredPoductslist.length}
                toggleMainFilter={toggleMainFilter}
                isMainFilterShowing={isMainFilterShowing}
                subfilterSelected={subfilterSelected}
                setSubFilterSelcted={setSubFilterSelcted}
            />

            <div className={styles.productListMainContainer}>
                {isMainFilterShowing && (
                    <MainFilter
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                    />
                )}

                <div className={styles.productList}>
                    {isLoading ? (
                        // Show skeleton cards
                        <ul className={styles.productListContainer}>
                            {[...Array(8)].map((_, i) => (
                                <Loader key={i} />
                            ))}
                        </ul>
                    ) : // Show actual products
                        finalFilteredPoductslist.length === 0 ? (
                            <div className={styles.noProductFound}>
                                <img src="/noProductFound.png" alt="No Product Found" />
                                <p className={styles.noProductText}>
                                    Try adjusting your search or filter to find what you’re
                                    looking for.
                                </p>
                                <button type='button'
                                    onClick={() => {
                                        setSelectedFilters({})
                                        setSubFilterSelcted("RECOMMENDED")
                                        setIsMainFilterShowing(false)
                                        setIsLoading(true)
                                        setTimeout(() => {
                                            setIsLoading(false)
                                        }, 200)
                                    }}
                                    className={styles.noProductButton}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <ul className={styles.productListContainer}>
                                {finalFilteredPoductslist.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </ul>
                        )}
                </div>
            </div>

            <Footer />
        </div >
    );
};

export default ProductList;