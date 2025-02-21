import { Router } from "express";

const usersRoutes = Router()

const products = [
    { title: "Mochila :))", description: "A high-performance backpack", price: 1500, thumbnail: "3.jpg", code: "LT127", stock: 5, id: 3 },
    { title: "Monitor", description: "A 4K UHD 27-inch monitor", price: 300, thumbnail: "4.jpg", code: "MN123", stock: 15, id: 4 },
    { title: "Tablet", description: "A tablet with a 10-inch display", price: 400, thumbnail: "6.jpg", code: "TB789", stock: 25, id: 6 },
    { title: "Headphones", description: "Wireless noise-cancelling headphones", price: 200, thumbnail: "7.jpg", code: "HP123", stock: 40, id: 7 },
    { title: "Smartwatch", description: "A smartwatch with heart rate monitor", price: 250, thumbnail: "8.jpg", code: "SW456", stock: 35, id: 8 },
    { title: "External Hard Drive", description: "A 1TB external hard drive", price: 120, thumbnail: "9.jpg", code: "HD789", stock: 10, id: 9 },
    { title: "Webcam", description: "HD webcam for video calls", price: 60, thumbnail: "10.jpg", code: "WC123", stock: 25, id: 10 },
    { title: "Microphone", description: "Professional microphone for streaming", price: 150, thumbnail: "11.jpg", code: "MC456", stock: 12, id: 11 },
    { title: "Printer", description: "All-in-one color printer", price: 300, thumbnail: "12.jpg", code: "PR789", stock: 8, id: 12 },
    { title: "Mochila", description: "A high-performance backpack", price: 1500, thumbnail: "13.jpg", code: "LT124", stock: 5, id: 13 },
    { title: "Mochila", description: "A high-performance backpack", price: 1500, thumbnail: "13.jpg", code: "LT124", stock: 5, id: 13 },
    { title: "Mochila :))", description: "A high-performance backpack", price: 1500, thumbnail: "14.jpg", code: "LT127", stock: 5, id: 14 },
    { title: "Mochila", description: "A high-performance backpack", price: 1500, thumbnail: "15.jpg", code: "LT12", stock: 5, id: 15 },
    { title: "Mochila", description: "A high-performance backpack", price: 1500, thumbnail: "16.jpg", code: "LT12", stock: 5, id: 16 },
    { title: "Mochila", description: "A high-performance backpack", price: 1500, thumbnail: "17.jpg", code: "LT12", stock: 5, id: 17 }
];
  

usersRoutes.get('/', (req, res) => {
    res.send({products});
});

export default usersRoutes
export {
    products
}