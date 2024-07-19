// pages/search.js
import { useRouter } from "next/router";
import { useSelector } from "react-redux"; // Import useSelector

const SearchResults = () => {
  const router = useRouter();
  const filters = useSelector((state) => state.filters); // Access filters from Redux store

  return (
    <div>
      <h1>Search Results</h1>
      {/* Display all filters */}
      <p>
        Carat: {filters.carat.length > 0 ? filters.carat.join(", ") : "All"}
      </p>
      <p>
        Fluor: {filters.fluor.length > 0 ? filters.fluor.join(", ") : "All"}
      </p>
      <p>Cut: {filters.cut.length > 0 ? filters.cut.join(", ") : "All"}</p>
      <p>
        Polish: {filters.polish.length > 0 ? filters.polish.join(", ") : "All"}
      </p>
      <p>
        Color: {filters.color.length > 0 ? filters.color.join(", ") : "All"}
      </p>
      <p>
        Clarity:{" "}
        {filters.clarity.length > 0 ? filters.clarity.join(", ") : "All"}
      </p>
      <p>Lab: {filters.lab.length > 0 ? filters.lab.join(", ") : "All"}</p>
      <p>Symm: {filters.symm.length > 0 ? filters.symm.join(", ") : "All"}</p>
      <p>
        Location:{" "}
        {filters.location.length > 0 ? filters.location.join(", ") : "All"}
      </p>
      <p>
        Shape:{" "}
        {filters.shape.length > 0
          ? filters.shape
              .map((shapeId) =>
                diamondShapes.find((shape) => shape.ShapeID === shapeId)
              )
              .map((shape) => shape.ShapeName)
              .join(", ")
          : "All"}
      </p>
    </div>
  );
};

export default SearchResults;
