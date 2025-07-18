import React, { useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, setCurrentPage } = useContext(CartContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (setCurrentPage) {
      setCurrentPage(1);
    }
  };

  return (
    <div className="mb-3">
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Buscar productos por nombre o categoría..."
          value={searchTerm || ""}
          onChange={handleSearchChange}
          className="shadow-sm"
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
