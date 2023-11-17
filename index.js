const app = require('./app.js');

const mainRoutes = require('./routes/main.js');
const userRoutes = require('./routes/usuario.js');
const eventoRoutes = require("./routes/eventos.js")

app.use("", mainRoutes);
app.use("/usuario", userRoutes);
app.use("/eventos", eventoRoutes);

app.get('/health', (req, res) => {
  res.send('I am healthy');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});