require("dotenv").config();
const express = require("express");
const app = express();
const { notFound, errorHandler } = require("./middlewares/error");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Error catcher middleware
app.use(notFound);
app.use(errorHandler);
// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));