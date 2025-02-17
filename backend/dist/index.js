"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = require("cloudinary");
const notification_1 = __importDefault(require("./routes/notification"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const connectDb_1 = __importDefault(require("./db/connectDb"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const app = (0, express_1.default)();
const Port = process.env.PORT || 5000;
app.use((0, morgan_1.default)("dev"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use("/api/auth", auth_1.default);
app.use("/api/users", user_1.default);
app.use("/api/posts", post_1.default);
app.use("/api/notifications", notification_1.default);
app.use(errorMiddleware_1.errorMiddleware);
app.use("*", (_, res) => {
    res.status(404).sendFile(path_1.default.join(__dirname, "..", "public", "404.html"));
});
app.listen(Port, async () => {
    await (0, connectDb_1.default)();
    console.log(`Server is running on port ${Port}`);
});
exports.default = app;
