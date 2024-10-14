import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Skeleton } from "@chakra-ui/react";

import Link from "next/link";

const ProductSearch = () => {
  const router = useRouter();
  const { searchTerm } = router.query; // Get searchTerm from query parameters

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm, 1); // Fetch the first page on initial load
    }
  }, [searchTerm]); // Re-fetch when searchTerm changes

  const fetchProducts = async (searchTerm, pageNumber = currentPage) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/product/search", {
        searchTerm: searchTerm,
        pageNumber: pageNumber,
        pageSize: productsPerPage,
      });

      if (response.status === 200) {
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.totalCount / productsPerPage));
      } else {
        console.error("Error searching products:", response.data.error);
        setError("Error searching products.");
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setError("An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchProducts(searchTerm, newPage);
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="container mt-5">
        <h1 className="mb-4">Product Search Results</h1>
        {isLoading && <p>Searching...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isLoading && products.length === 0 && (
          <p>No products found matching your search.</p>
        )}

        {/* Display search results in cards */}
        <div className="row">
          {products.map((product) => (
            <div key={product.ProductID} className="col-md-4 mb-4">
              <div
                className="card"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={product.Image1}
                  alt={product.Title}
                  className="card-img-top"
                  style={{
                    width: "100%", // Make sure image takes full width
                    height: "200px", // Set a fixed height
                    objectFit: "contain", // Maintain aspect ratio and cover the area
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.Title}</h5>
                  <p className="card-text">{product.ShortDescription}</p>
                  <Link
                    href={`/product/${product.Slug}`}
                    className="btn btn-primary"
                    style={{ width: "100% !important" }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                onClick={() => handlePageChange(page)}
                className="page-link"
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProductSearch;
