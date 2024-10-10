import { callStoredProcedure } from "./db";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        cartItems,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postcode,
        shippingFirstName,
        shippingLastName,
        shippingAddress,
        shippingCity,
        shippingPostcode,
        orderNote,
      } = req.body;

      // Calculate total amount, handling undefined/NaN prices
      const payAmount = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.Price); // Parse price, handle NaN
        return total + (isNaN(itemPrice) ? 0 : itemPrice) * item.quantity;
      }, 0);

      // Insert into Orders table
      const orderResult = await callStoredProcedure(
        "sp_CreateOrder",
        {
          Email: email,
          Phone: phone,
          FirstName: firstName,
          LastName: lastName,
          BillingAddress: address, // Assuming same as shipping for now
          BillingCity: city,
          BillingPostcode: postcode,
          ShippingFirstName: shippingFirstName,
          ShippingAddress: shippingAddress,
          ShippingCity: shippingCity,
          ShippingPostcode: shippingPostcode,
          OrderNote: orderNote,
          PayAmount: payAmount,
        },
        ["StatusID", "StatusMessage", "OrderID"]
      );

      if (orderResult.status !== 1) {
        throw new Error("Failed to create order: " + orderResult.message);
      }
      console.log("Order created:", orderResult);
      const orderId = orderResult.OrderID;

      // Insert into ordered_products table
      for (const item of cartItems) {
        const productResult = await callStoredProcedure(
          "sp_AddOrderedProducts",
          {
            OrderID: orderId,
            Title: item.SolitaireName || item.ProductName || "Product", // Get title from best available field
            Quantity: item.quantity,
            Product: JSON.stringify(item),
            Slug: item.Slug || item.link || "", // Get slug from best available field
            Cost: item.Price || 0, // Handle undefined/NaN prices
            Image: item.Image1 || item.imageUrl1 || "", // Get image from best available field
            Subtotal: (item.Price || 0) * item.quantity, // Use 0 for invalid prices
            Status: "pending",
          },
          ["StatusID", "StatusMessage"]
        );
        if (productResult.status !== 1) {
          throw new Error(
            "Failed to add product to order: " + productResult.message
          );
        }
      }

      res.status(201).json({ message: "Order created successfully!" });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
