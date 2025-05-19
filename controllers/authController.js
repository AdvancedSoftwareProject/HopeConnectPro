const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/Users'); 
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const permissions = require('../config/permissions');

const checkPermission = require('../middleware/permissionsMiddleware'); 

require('dotenv').config();

exports.register = async (req, res) => {
  const {
    full_name,
    email,
    password,
    phone_number,
    role,
    status,
    profile_picture_url,
    address,
    organization_id
  } = req.body;

  try {
   
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await User.create({
      full_name,
      email,
      password_hash: hashedPassword,
      phone_number,
      role,
      status,
      profile_picture_url,
      address,
      organization_id,
      is_verified: false 
    });

    
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        profile_picture_url: newUser.profile_picture_url,
        address: newUser.address,
        organization_id: newUser.organization_id,
        is_verified: newUser.is_verified
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is not defined in environment' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );


    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
     
      },
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.reset_password_token = resetToken;
    user.reset_password_expiry = Date.now() + 3600000; 
    await user.save();


    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false 
      }
    });
    

    const resetUrl = `http://localhost:5000/api/auth/resetPassword/${resetToken}`;

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      text: `Click the link to reset your password: ${resetUrl}`
    });

    return res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error during password reset request:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;  
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { reset_password_token: resetToken } });
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired reset token' });
    }

    if (user.reset_password_expiry < Date.now()) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password_hash = hashedPassword;
    user.reset_password_token = null;
    user.reset_password_expiry = null;

    await user.save();

    return res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone_number } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.full_name = full_name || user.full_name;
    user.email = email || user.email;
    user.phone_number = phone_number || user.phone_number;

    await user.save();

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.viewUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
      }
    });
  } catch (error) {
    console.error('Error viewing user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


