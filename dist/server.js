"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(cors_1.default());
app.use('/api/v1/', routes_1.default);
// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.join(__dirname, 'client/build', 'index.html'));
    });
}
;
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
