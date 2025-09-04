import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Wrong password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        // Send response
        return res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const register = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            email,
            password: hashedPassword,
            name: name || email.split('@')[0],
            role: role?.toLowerCase() || 'employee'  // Use provided role or default to 'employee'
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



const loginWithGoogle = async (req, res) => {
    try {
        const { email, name, role, googleAccessToken } = req.body;

        if (!email || !name) {
            return res.status(400).json({ 
                success: false, 
                error: "Email and name are required for Google authentication" 
            });
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            // User exists, log them in
            const token = jwt.sign(
                { _id: user._id, role: user.role },
                process.env.JWT_KEY,
                { expiresIn: "10d" }
            );

            return res.status(200).json({
                success: true,
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    role: user.role
                },
                message: "Google login successful"
            });
        } else {
            // User doesn't exist, create new account
            // For Google OAuth, we'll create a user without a password
            // Generate a random password that won't be used
            const randomPassword = Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            user = new User({
                email,
                password: hashedPassword, // This won't be used for Google login
                name,
                role: role?.toLowerCase() || 'employee',
            });

            await user.save();

            // Generate JWT token for new user
            const token = jwt.sign(
                { _id: user._id, role: user.role },
                process.env.JWT_KEY,
                { expiresIn: "10d" }
            );

            return res.status(201).json({
                success: true,
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    role: user.role
                },
                message: "Google account created and logged in successfully"
            });
        }
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({ 
            success: false, 
            error: "Internal server error during Google authentication" 
        });
    }
};

const verify = (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
};

export { login, verify, register, loginWithGoogle };
