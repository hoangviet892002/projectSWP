const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const Customer = require('../models/Customer');
const Doctor = require('../models/doctor');
const Admin = require('../models/admin');



exports.register = async (req, res) => {
  try {
    const { email, password, confirmPassword, fullname, address, phone, gender } = req.body;

    // Kiểm tra xem email đã tồn tại hay chưa
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.render('register', { error: 'Email already exists' });
    }

    // Kiểm tra xem mật khẩu và Confirm Password có khớp nhau hay không
    if (password !== confirmPassword) {
      return res.render('register', { error: 'Passwords do not match' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo khách hàng mới với mật khẩu đã được mã hóa
    await Customer.create({ email, password: hashedPassword, fullname, address, phone, gender });

    // Chuyển hướng khách hàng sau khi đăng ký thành công
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'An error occurred' });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email và mật khẩu
    const doctor = await Doctor.findOne({ where: { email } });
    const admin = await Admin.findOne({ where: { email } });
    const customer = await Customer.findOne({ where: { email } });

    let user;
    if (doctor) {
      user = doctor;
    } else if (admin) {
      user = admin;
    } else if (customer) {
      user = customer;
    } else {
      return res.render('login', { error: 'Invalid email' });
    }

    // So sánh mật khẩu đăng nhập với mật khẩu đã được mã hóa trong cơ sở dữ liệu
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    // Lưu thông tin người dùng vào session hoặc JWT token (tuỳ chọn)
    req.session.user = user
    // Chuyển hướng người dùng sau khi đăng nhập thành công
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'An error occurred' });
  }
};
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
