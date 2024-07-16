const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const specialtyRoutes = require('./routes/specialtyRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Import route cho Category
const manufacturerRoutes = require('./routes/manufacturerRoutes'); // Import route cho Manufacturer
const expiryDateRoutes = require('./routes/expiryDateRoutes');
const marketRoutes = require('./routes/marketRoutes');

const app = express();

// Kết nối đến cơ sở dữ liệu
connectDB();

// Middleware để xử lý dữ liệu JSON và urlencoded với giới hạn lớn hơn
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Địa chỉ frontend của bạn
    credentials: true,
}));

// Sử dụng routes cho đặc sản
app.use('/specialty', specialtyRoutes);
app.use('/specialty', categoryRoutes); // Sử dụng route cho Category
app.use('/specialty', manufacturerRoutes); // Sử dụng route cho Manufacturer
app.use('/specialty', expiryDateRoutes); // Sử dụng route cho Expiry Date
app.use('/specialty', marketRoutes); // Sử dụng route cho Market

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
