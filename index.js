const mongoose = require("mongoose");
const ejs = require("ejs")

const express = require("express")
const app = express();

app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.set("view engine", "ejs")

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

const ItemSchema = new mongoose.Schema(
  {
    products: { type: String, required: true },
    category: { type: String },
    image: { type: String },
    price: {type: Number},
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema, "Items");


app.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.render("home", { items });
    } catch (error) {
        res.status(500).send("Error fetching items");
    }
});

app.get('/shop', (req, res) => {
    const data = {
        categories: ['Toys & Games', 'Jewelry', 'Caps & Hats', 'Gifts & Home', 'Kitchenware', 'Stationery'],
        items: [
            { name: 'Leather Wallet', price: 32, image: '/path/to/wallet.jpg' },
            { name: 'Ceramic Mug', price: 22, image: '/path/to/mug.jpg' },
            { name: 'Handmade Toy Car', price: 18, image: '/path/to/car.jpg' },
            { name: 'Scented Candle', price: 22, image: '/path/to/candle.jpg' },
            // Add more items here...
        ]
    };
    res.render('shopping.ejs', data);
});


async function startServer() {
    await mongoose.connect("mongodb+srv://SE12:CSH2026@cluster0.tf3jmpg.mongodb.net/Leandro?appName=Cluster0")
    app.listen(3000, () => {
        console.log("Server is running")
    })
}

startServer()