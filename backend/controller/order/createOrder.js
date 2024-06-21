// const orderModel=require('../../models/orderModel');
// const productModel=require('../../models/productModel');
// async function createOrder(req,res) {
//     try {

//         const userId = req.userId;
        
//         const {name,orderDate,shippingAddress,phoneNumber,items}=req.body;

//         const productIdTracker = {};

//         // Khởi tạo tổng số tiền
//         let totalAmount = 0;

//         // Xử lý các items để tính toán tổng số tiền và định dạng chúng cho đơn hàng
//         const processedItems = await Promise.all(items.map(async item => {
//             const { productId, quantity, price, category } = item;

//             // Đảm bảo tất cả các trường cần thiết có mặt trong mỗi item
//             if (!productId || !quantity || !price) {
//                 throw new Error("Each item must include productId, quantity, and price.");
//             }

//             // Kiểm tra trùng lặp productId
//             if (productIdTracker[productId]) {
//                 throw new Error(`Duplicate productId found: ${productId}`);
//             }
//             productIdTracker[productId] = true;

//             // Kiểm tra productId có tồn tại trong productModel không
//             const productExists = await productModel.findById(productId);
//             if (!productExists) {
//                 throw new Error(`Product with ID ${productId} does not exist.`);
//             }

//             // Tính toán tổng số tiền
//             totalAmount += price * quantity;

//             return {
//                 productId,
//                 quantity,
//                 price,
//                 category
//             };
//         }));


//         const payload={
//             name:name,
//             orderDate:orderDate,
//             shippingAddress:shippingAddress,
//             phoneNumber:phoneNumber,
//             status:"pending",
//             userId:userId,
//             items:processedItems,
//             totalAmount:totalAmount
//         }

//         const newOrder = new orderModel(payload)
//         const saveOrder = await newOrder.save()
//         res.json({
//             message:"Create Order Successfully",
//             data:saveOrder,
//             error:false,
//             success:true
//         })
//     }catch (e){
//         res.json({
//             message:e?.message||e,
//             error:true,
//             success:false,
//         })
//     }
// }
// module.exports=createOrder




const orderModel = require('../../models/orderModel');
const orderItemSchema = require('../../models/orderItemsModel');
const productModel = require('../../models/productModel');
const addToCartModel = require('../../models/cartProduct');

async function createOrder(req, res) {
    try {
        const currentUser = req.userId;

        // Kiểm tra xem userId có tồn tại không
        if (!currentUser) {
            return res.json({
                message: "User ID is required.",
                error: true,
                success: false,
            });
        }

        ``
        // Lấy các mục từ giỏ hàng của người dùng
        const cartItems = await addToCartModel.find({ userId: currentUser });

        // Kiểm tra giỏ hàng trống
        if (!cartItems || cartItems.length === 0) {
            return res.json({
                message: "Cart is empty.",
                error: true,
                success: false,
            });
        }

        // Khởi tạo đối tượng để theo dõi productId
        const productIdTracker = {};

        // Khởi tạo tổng số tiền
        let totalAmount = 0;

        // Xử lý các mục trong giỏ hàng để tính toán tổng số tiền và định dạng chúng cho đơn hàng
        const processedItems = await Promise.all(cartItems.map(async cartItem => {
            const { productId, quantity } = cartItem;

            // Kiểm tra trùng lặp productId
            if (productIdTracker[productId]) {
                throw new Error(`Duplicate productId found: ${productId}`);
            }
            productIdTracker[productId] = true;

            // Kiểm tra productId có tồn tại trong productModel không
            const product = await productModel.findById(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} does not exist.`);
            }

            const { sellingPrice,productName,productImage,category } = product;

            // Tính toán tổng số tiền
            totalAmount += sellingPrice * quantity;

            return {
                productId,
                productName,
                productImage,
                quantity,
                sellingPrice,
                category
            };
        }));

        // Tạo payload cho đơn hàng mới
        const { customerName,shippingAddress, phoneNumber,paymentMethod} = req.body;

        let isPaid='false';

        const payload = {
            customerName: customerName || "Default Name",
            orderDate: new Date(),
            shippingAddress: shippingAddress,
            phoneNumber: phoneNumber,
            status:'pending',
            isPaid:isPaid,
            paymentMethod:paymentMethod,
            userId: currentUser,
            items: processedItems,
            totalAmount: totalAmount
        };

        // Ghi log payload để debug
        console.log("Payload:", payload);

        // Lưu đơn hàng mới
        const newOrder = new orderModel(payload);
        const saveOrder = await newOrder.save();

        // Xóa các mục đã được đặt hàng khỏi giỏ hàng
        await addToCartModel.deleteMany({ userId: currentUser });

        // Phản hồi với thông điệp thành công
        res.json({
            message: "Create Order Successfully",
            data: saveOrder,
            error: false,
            success: true
        });
    } catch (e) {
        // Phản hồi với thông điệp lỗi
        res.json({
            message: e?.message || e,
            error: true,
            success: false,
        });
    }
}

module.exports = createOrder;
