const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Contact = require("../models/contactModel");
const Coupon = require("../models/couponModel");
const Color = require("../models/colorModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const sendEmail = require("./emailCtrl");

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  //console.log("calling....")
  try {
    const { Email, Firstname, password } = req.body;

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    // Check if the user already exists
    const findUser = await User.findOne({ email: Email });

    if (!findUser) {
      // Create a new user if not found
      const newUser = await User.create({ firstname: Firstname, email: Email, password: hash });
      //console.log(newUser)
      const updateuser = await User.findByIdAndUpdate(
        newUser._id,
        {
          refreshToken: generateToken(newUser?._id),
        },
        { new: true }
      );
      // No need to call newUser.save() since User.create() already saves the document
      newUser.password = null; // Clear password for security reasons
      res.json({
        _id: findUser?._id,
        firstname: newUser?.firstname,
        lastname: newUser?.lastname,
        email: newUser?.email,
        mobile: newUser?.mobile,
        token: generateToken(newUser?._id),
      });
    } else {
      // Throw an error if the user already exists
      throw new Error("User Already Exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const message_ = async (req, res) => {
  try {
    const { message, userId } = req.body;

    const newContact = new Contact({
      message,
      userId,
    });

    const savedContact = await newContact.save();
    res.status(201).json({ msg: "Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const loginUserCtrl = asyncHandler(async (req, res) => {
  try {
    //console.log(req.body);
    const email = req.body.Email;
    const password = req.body.password;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: generateToken(findUser?._id),
        },
        { new: true }
      );
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      });
      //console.log({ Login: "user Login successfully" });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error(error.message);

  }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      refreshToken,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  let refreshToken = req.headers.refreshtoken; // Accessing from cookies instead of headers
  console.log(req.headers)

  if (!refreshToken) throw new Error("No Refresh Token");
  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) throw new Error("No Refresh token present in db or not matched");

  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }

    const newRefreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(
      user.id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    const accessToken = generateToken(user._id);
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      refreshToken: newRefreshToken,
      token: accessToken,
    });
  });
});


// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  //console.log({ cookie })
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    console.log("wokeidsfnjkasd not asad")
    const findAdmin = await User.findOne({ email: req.body.email });

    let findUser = await User.findOne({ email: req.user.email })
    if (findUser && (!findUser.email === req.user.email)) {
      throw new Error("Email already Exist");
    }
    if (req.body.password && (await findAdmin.isPasswordMatched(req.body.password))) {
      if (req.body.newpassword) {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(req.body.newpassword, salt);
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
            password: hash,
            address: req?.body?.address,
          },
          {
            new: true,
          }
        );
        //console.log({ updatedUser })
        res.json(updatedUser);

      } else {
        throw new Error("Please Provide  new password")
      }
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
          address: req?.body?.address,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    }
  } catch (error) {
    throw new Error(error);
  }
});
const profile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const profile = await User.findById(_id);
    profile.password = null;
    //console.log(profile)
    res.json(profile);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    // sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const isValid = Array.isArray(req.body) && req.body.length > 0 ?
      req.body.every(item => (
        item.product &&
        item.count &&
        item.size &&
        item.price
      )) : false;

    if (!isValid) {
      return res.status(400).json({ error: "Please Provide Valid Data" });
    }

    const cart = req.body;
    //console.log(cart)
    let common = (value, count) => {
      let array = [];
      for (let index = 0; index < count; index++) {
        array.push(value);
      }
      return array;
    }
    const carts = [];
    const user = await User.findById(_id);
    for (const cartItem of cart) {
      const existingCart = await Cart.findOne({ orderby: user._id, confirm: false, 'products.product': cartItem.product });

      if (existingCart) {
        const updatedProducts = {
          product: existingCart.products[0].product,
          count: existingCart.products[0].count + cartItem.count,
          size: [...existingCart.products[0].size, ...common(cartItem.size, cartItem.count)],
          color: [...existingCart.products[0].color, ...common(cartItem.color ? cartItem.color : existingCart.products[0].color[existingCart.products[0].color.length - 1], cartItem.count)],
          price: existingCart.products[0].price,
        };

        const existCartUpdate = {
          products: updatedProducts,
          cartTotal: updatedProducts.count * updatedProducts.price
        };

        const updatedCart = await Cart.findOneAndUpdate({ orderby: user._id, confirm: false, 'products.product': cartItem.product }, existCartUpdate, { new: true });
        carts.push(updatedCart);
      } else {
        const newProducts = {
          product: cartItem.product,
          count: cartItem.count,
          size: common(cartItem.size, cartItem.count),
          color: common(cartItem.color ? cartItem.color : existingCart.products[0].color[existingCart.products[0].color.length - 1], cartItem.count),
          price: cartItem.price,
        };

        const newCart = await new Cart({
          products: newProducts,
          cartTotal: newProducts.count * newProducts.price,
          orderby: user?._id,
        }).save();
        carts.push(newCart);
      }
    }

    res.json(carts);
    //console.log(carts);
  } catch (error) {
    console.error("Error processing user cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  //console.log(req.body.length)
  try {
    const isValid = Array.isArray(req.body) && req.body.length > 0 ?
      req.body.every(item => (
        item.Product &&
        item.count &&
        item.size &&
        item.price &&
        item.image &&
        item.color &&
        item.title)) : false;

    if (!isValid) {
      return res.status(400).json({ error: "Please Provide Valid Data" });
    }

    const cart = req.body;
    //console.log(cart)
    if (await Cart.deleteMany({ confirm: false, orderby: _id })) {
      let mycarts = [];
      for (const cartItem of cart) {
        let cartfind = await Product.findById({ _id: cartItem.Product })
        if (cartfind) {
          let newCart_ = {
            product: cartItem.Product,
            count: cartItem.count,
            size: cartItem.size,
            color: cartItem.color,
            price: cartfind.price,
          };
          const newCart = await new Cart({
            products: newCart_,
            cartTotal: newCart_.count * newCart_.price,
            orderby: _id,
          }).save();
          mycarts.push(newCart)
        }
      }
      res.json()
    }
  } catch (error) {
    console.error("Error processing user cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ orderby: _id, confirm: false }).populate(
      "products.product"
    );
    //console.log({ cart })
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  let cid = req.params.id
  validateMongoDbId(_id);
  validateMongoDbId(cid);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndDelete({ orderby: user._id, _id: cid });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteOrder = asyncHandler(async (req, res) => {
  let { id } = req.params
  validateMongoDbId(id);
  try {

    const order_ = await Order.findByIdAndDelete({ _id: id });
    res.json(order_);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.find({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();

    // Map through each product in orders and populate colors asynchronously
    const promises = alluserorders.map(async (order) => {
      const productsWithColors = await Promise.all(order.products.map(async (item) => {
        const colors = await Promise.all(item.color.map(async (col) => {
          const colo_ = await Color.findById(col);
          return colo_;
        }));
        return { ...item.toObject(), color: colors }; // Replace colors array with populated color objects
      }));
      return { ...order.toObject(), products: productsWithColors }; // Replace products array with updated products
    });

    // Wait for all promises to resolve
    const updatedOrders = await Promise.all(promises);
    res.json(updatedOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders_ = await Order.findOne({ _id: id })
      .populate("products.product")
      .populate("orderby")
      .exec();

    const productsWithColors = await Promise.all(userorders_.products.map(async (item) => {
      const colors = await Promise.all(item.color.map(async (col) => {
        const colo_ = await Color.findById(col);
        return colo_;
      }));
      return { ...item.toObject(), color: colors };
    }));

    userorders_.products = productsWithColors;
    console.log(userorders_); // Logging the updated user orders

    res.json(userorders_); // Sending the updated user orders as JSON response
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  console.log(req.body)
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      { _id: id },
      {
        orderStatus: status,
      },
      { new: true }
    );
    console.log({ updateOrderStatus })
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  updateCart,
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  deleteCart,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  profile,
  deleteOrder,
  message_
};
