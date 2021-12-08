/* This create course form component for instructor*/
import React from 'react'
import {useState, useEffect} from "react"
import {Select, Button, Avatar } from 'antd';
import {SaveOutlined} from "@ant-design/icons"

const { Option } = Select;
const CourseCreateForm = ({handleSubmit, 
    handleImage,
    handleChange,
    values, 
    setValues,
    preview,
    uploadButton,
    setUploadButton}) => {
    const priceArray = []
    for (let i=6.99; i<=99.99; i++){
        priceArray.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Title Course */}
                <div className="form-group">
                    <input type="text" 
                    name="name" 
                    className="form-control" 
                    placeholder="Title" 
                    value={values.title}
                    onChange={handleChange}
                    />
                </div>
                {/* Description course */}
                <div className="form-group">
                    <textarea name="description" 
                    cols="7" rows="7" 
                    value={values.description}
                    className="form-control"
                    onChange={handleChange}></textarea>
                </div>

                {/* Paid - Free Course */}
                <div className="form-row pt-3">
                    <div className="col">
                        <div className="form-group">
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
                    <div className="col-md-6">
                        <div className="form-group">
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
                    <div className="form-group">
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
                        <div className="form-group">
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
                        <Avatar shape="square" size={200} src={preview} />
                    )}
                </div>
                
                {/* Upload course */}
                <div className="row">
                    <div className="col">
                        <Button 
                        onClick={handleSubmit} 
                        disabled={values.loading || values.uploading}
                        className="btn btn-primary"
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
