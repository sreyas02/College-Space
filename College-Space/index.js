const express = require('express');
const path = require('path');
const ejs = require("ejs");
const app = express();

// Middleware init
app.set('views', path.join(__dirname, 'public'));
app.engine('html', ejs.renderFile);
app.set("view engine", "ejs");

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Videos Route
app.use('/video', require('./routes/api/videoDB'));

// Video Search Route
app.use('/unitSearch', require('./routes/api/unitSearch'))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));