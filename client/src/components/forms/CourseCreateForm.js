/* This create course form component for instructor*/
import React from 'react'
import {useState, useEffect} from "react"
import {Select, Button, Avatar, Badge } from 'antd';
import {SaveOutlined} from "@ant-design/icons"
import "../../pages/HomePage/HomePage.css"
const { Option } = Select;
const CourseCreateForm = ({handleSubmit, 
    handleImage,
    handleChange,
    handleImageRemove,
    values, 
    setValues,
    preview,
    uploadButton,
    setUploadButton,
editPage = false}) => {
    const priceArray = []
    for (let i=6.99; i<=99.99; i++){
        priceArray.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {/* Title Course */}
                <div className="form-group mt-3">
                    <input type="text" 
                    name="name" 
                    className="form-control" 
                    placeholder="Title" 
                    value={values.title}
                    onChange={handleChange}
                    />
                </div>
                {/* Description course */}
                <div className="form-group mt-3">
                    <textarea name="description"
                     placeholder="Description" 
                    cols="7" rows="7" 
                    value={values.description}
                    className="form-control"
                    onChange={handleChange}></textarea>
                </div>

                {/* Paid - Free Course */}
                <div className="form-row pt-3">
                    <div className="col">
                        <div className="form-group mt-3">
                            <Select
                            style={{width: "100%"}}
                            size="large"
                            bordered="true"
                            value={values.paid}
                            onChange= {e => setValues({...values, paid: e, price: 0})}
                            >
                                <Option value={true}>Paid</Option>
                                <Option value={false}>Free</Option>
                            </Select>
                        </div>
                    </div>
                    {/* Price dropdown */}
                    {values.paid && 
                    <div className="col">
                        <div className="form-group mt-3">
                            <Select
                            defaultValue="$6.99"
                            style={{width: "100%"}}
                            onChange = {e => setValues({...values, price: e})}
                            tokenSeparator={[,]}
                            size="large">
                            {priceArray}
                            </Select>
                        </div>
                    </div>}
                </div>
    
                {/* Category */}
                    <div className="form-group mt-3">
                    <input type="text" 
                    name="category" 
                    className="form-control" 
                    placeholder="Category" 
                    value={values.category}
                    onChange={handleChange}
                    />
                </div>
                {/* Image Upload */}
                <div className="form-row">
                    <div className="col">
                        <div className="form-group mt-3 mb-3">
                            <label className="btn btn-outline-secondary btn-block text-left">
                             {uploadButton}                                
                            <input 
                                type="file" 
                                name="image" 
                                size="large"
                                onChange={handleImage} 
                                accept="image/*" 
                                hidden/>
                            </label>
                        </div>
                    </div>
                    {preview && (
                        <Badge count="X" onClick={handleImageRemove} className="pointer">
                            <Avatar shape="square" size={200} src={preview} />
                        </Badge>
                    )}

                    {/* check edit page is true */}
                    {editPage && <Avatar shape="square" size={200} src={values.image?.Location} />
 }
                </div>
                
                {/* Upload course */}
                <div className="row">
                    <div className="col">
                        <Button 
                        onClick={handleSubmit} 
                        disabled={values.loading || values.uploading}
                        className="btn btn-primary button-home"
                        loading={values.loading}
                        icon={<SaveOutlined />}
                        size="large"
                        shape="round"
                        >
                        {values.loading ? "Saving ..." : "Saved & Continue"}
                        </Button>
                    </div>

                </div>
        </form> 
        </div>
    )
}

export default CourseCreateForm
