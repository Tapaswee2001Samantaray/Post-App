let express = require("express");
let mongoose = require("mongoose");
let route = require("./route/route");
let app = express();

app.use(express.json());
mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://Tapaswee2001Samantaray:jecky2001@cluster0.zinufff.mongodb.net/Post-App",
    { useNewUrlParse: true }
)
    .then(() => console.log("Connected to DataBase"))
    .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, () => {
    console.log("Express app is started with the port numbber " + 3000);
});
