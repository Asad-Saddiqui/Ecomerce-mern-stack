import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import { useParams } from "react-router-dom";

import Dropzone from "react-dropzone";
import { uploadImg, resetState, } from "../features/upload/uploadSlice";
import { get_single_aproduct, updatesingleproduct } from '../features/product/productSlice'

const UpdateProduct = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const [color, setColor] = useState([]);
    const [color_, setColor_] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("");
    const aProduct = useSelector(state => state.product.singleProduct);

    useEffect(() => {
        if (aProduct) {
            setTitle(aProduct.title);
            setDescription(aProduct.description);
            setPrice(aProduct.price);
            setCategory(aProduct.category);
            setBrand(aProduct.brand);
            setQuantity(aProduct.quantity);
            const newColors = aProduct.color.map((col) => col.color);
            setColor_(newColors);
        }
    }, [aProduct]);

    useEffect(() => {
        dispatch(get_single_aproduct(id));
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, [dispatch, id]);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    let coloropt = [];
    colorState.forEach((i) => {
        // Check if the item already exists in coloropt based on _id
        const exists = coloropt.some((item) => item.value === i._id);
        // If it doesn't exist, push it to coloropt
        if (!exists) {
            coloropt.push({
                label: i.title,
                value: i._id,
            });
        }
    });
    let img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: Date.now(),
            url: i,
        });
    });
    const logFormData = async (e) => {
        e.preventDefault();
        // let color_ = coloropt.filter(col => color.includes(col.label));
        const formData = {
            title,
            description,
            price,
            category,
            brand,
            quantity,
            color: color,
            img
        };
        let dataupdate = await dispatch(updatesingleproduct({ formData, id }))
        if (dataupdate.type === "product/update-products/fulfilled") {
            toast.success("Updated Successfully")
            dispatch(get_single_aproduct(id));
            dispatch(getBrands());
            dispatch(getCategories());
            dispatch(getColors());
            dispatch(resetState());
        }
    };
    const handleColors = (e) => {
        setColor(e);
        console.log({ e });
    };
    return (
        <div>
            <h3 className="mb-4 title">Update Product</h3>
            <div>
                <form className="d-flex gap-3 flex-column">
                    <CustomInput
                        type="text"
                        label="Enter Product Title"
                        name="title"
                        onChng={(e) => setTitle(e.target.value)}
                        val={title}
                    />
                    <div className="error"></div>
                    <div className="">
                        <ReactQuill
                            theme="snow"
                            name="description"
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                    <div className="error"></div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        val={price}
                        onChng={(e) => setPrice(e.target.value)}
                    />
                    <div className="error"></div>
                    <select
                        name="brand"
                        value={brand}
                        className="form-control py-3 mb-3"
                        id=""
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        <option value="">Select Brand</option>
                        {brandState.map((brand) => (
                            <option key={brand._id} value={brand.title}>
                                {brand.title}
                            </option>
                        ))}
                    </select>
                    <div className="error"></div>
                    <select
                        name="category"
                        value={category}
                        className="form-control py-3 mb-3"
                        id=""

                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {catState.map((category) => (
                            <option key={category._id} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    <div className="error"></div>
                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100"
                        placeholder="Select colors"
                        defaultValue={color}
                        onChange={(i) => handleColors(i)}
                        options={coloropt}
                    />
                    <div className="error"></div>
                    <CustomInput
                        type="number"
                        label="Enter Product Quantity"
                        name="quantity"
                        val={quantity}
                        onChng={(e) => setQuantity(e.target.value)}
                    />
                    <div className="error"></div>
                    <div className="bg-white border-1 p-5 text-center">
                        <Dropzone
                            onDrop={(acceptedFiles) =>
                                dispatch(uploadImg(acceptedFiles))
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Drag 'n' drop some files here, or click to select files
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => (
                            <div className="position-relative" key={j}>
                                <img
                                    src={`http://localhost:5000/public/${i}`}
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                        onClick={logFormData}
                    >
                        Update Product
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateProduct;
