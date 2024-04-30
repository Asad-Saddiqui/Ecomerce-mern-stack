// import { React, useEffect } from "react";
// import CustomInput from "../components/CustomInput";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import {
//   createCategory,
//   getAProductCategory,
//   resetState,
//   updateAProductCategory,
// } from "../features/pcategory/pcategorySlice";
// let schema = yup.object().shape({
//   title: yup.string().required("Category Name is Required"),
// });
// const Addcat = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const getPCatId = location.pathname.split("/")[3];
//   const navigate = useNavigate();
//   const newCategory = useSelector((state) => state.pCategory);
//   const {
//     isSuccess,
//     isError,
//     isLoading,
//     createdCategory,
//     categoryName,
//     updatedCategory,
//   } = newCategory;
//   useEffect(() => {
//     if (getPCatId !== undefined) {
//       dispatch(getAProductCategory(getPCatId));
//     } else {
//       dispatch(resetState());
//     }
//   }, [getPCatId]);
//   useEffect(() => {
//     if (isSuccess && createdCategory) {
//       toast.success("Category Added Successfullly!");
//     }
//     if (isSuccess && updatedCategory) {
//       toast.success("Category Updated Successfullly!");
//       navigate("/admin/list-category");
//     }
//     if (isError) {
//       toast.error("Something Went Wrong!");
//     }
//   }, [isSuccess, isError, isLoading]);
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       title: categoryName || "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       if (getPCatId !== undefined) {
//         const data = { id: getPCatId, pCatData: values };
//         dispatch(updateAProductCategory(data));
//         dispatch(resetState());
//       } else {
//         dispatch(createCategory(values));
//         formik.resetForm();
//         setTimeout(() => {
//           dispatch(resetState());
//         }, 300);
//       }
//     },
//   });
//   return (
//     <div>
//       <h3 className="mb-4  title">
//         {getPCatId !== undefined ? "Edit" : "Add"} Category
//       </h3>
//       <div>
//         <form action="" onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             label="Enter Product Category"
//             onChng={formik.handleChange("title")}
//             onBlr={formik.handleBlur("title")}
//             val={formik.values.title}
//             id="brand"
//           />
//           <div className="error">
//             {formik.touched.title && formik.errors.title}
//           </div>
//           <button
//             className="btn btn-success border-0 rounded-3 my-5"
//             type="submit"
//           >
//             {getPCatId !== undefined ? "Edit" : "Add"} Category
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addcat;

























import React, { useState } from 'react';
import axios from 'axios';
import './Addcat.css';
import { ToastContainer, toast } from 'react-toastify';

function Addcat() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      // Show toast notification for validation error
      return toast.error('Please fill out all fields');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/category/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''
            }`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Show toast notification for success
      toast.success('Submit successfully!');
      // Optionally, reset form fields
      setTitle('');
      setImage(null);
    } catch (error) {
      console.error(error.response.data);
      // Show toast notification for error
      toast.error('An error occurred while uploading category');
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category Icon</label>
            <input type="file" accept="image/png" onChange={handleImageChange} />
          </div>
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
}

export default Addcat;
