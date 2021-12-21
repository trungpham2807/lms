import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import "./SearchForm.css"
import {SearchOutlined} from "@ant-design/icons"
const SearchForm = ({
  searchInput,
  handleSearchChange,
  handleSubmit,
}) => {
  return (
    <div className="search-form">
      <Form onSubmit={handleSubmit}>
        <Form.Control
        className="search-form-control"
        onChange={handleSearchChange}
        value={searchInput}
        type="text"
        placeholder="Search"
        />
      </Form>
      <div className="search-form-icon">
        <SearchOutlined/>
      </div>  
    </div>
    
  );
};

export default SearchForm;