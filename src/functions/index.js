// functions/index.js
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// read config
const gmailEmail = functions.config().gmail.email;
const gmailPass = functions.config().gmail.pass;
const brandEmail = functions.config().brand.email;

// transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPass,
  },
});

exports.sendOrderEmail = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snap, ctx) => {
    const order = snap.data();
    const orderId = ctx.params.orderId;

    const lines = order.cart.map((item, idx) => {
      return `
        <tr>
          <td style="padding:8px;border:1px solid #eee">${idx+1}</td>
          <td style="padding:8px;border:1px solid #eee">${item.name}</td>
          <td style="padding:8px;border:1px solid #eee">${item.phoneType || "-"}</td>
          <td style="padding:8px;border:1px solid #eee">${item.province || "-"}</td>
          <td style="padding:8px;border:1px solid #eee">${item.address || "-"}</td>
          <td style="padding:8px;border:1px solid #eee">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #eee">${item.price} EGP</td>
          <td style="padding:8px;border:1px solid #eee">${item.price * item.quantity} EGP</td>
        </tr>
      `;
    }).join("");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.4;color:#222;">
        <h2>New Order #${orderId}</h2>
        <p><strong>User:</strong> ${order.userEmail || order.userId}</p>
        <p><strong>Subtotal:</strong> ${order.subtotal} EGP</p>
        <p><strong>Shipping:</strong> ${order.shippingTotal} EGP</p>
        <p><strong>Total:</strong> ${order.total} EGP</p>
        <h3>Items</h3>
        <table style="border-collapse:collapse;width:100%;max-width:800px">
          <thead>
            <tr>
              <th style="padding:8px;border:1px solid #eee">#</th>
              <th style="padding:8px;border:1px solid #eee">Name</th>
              <th style="padding:8px;border:1px solid #eee">Phone</th>
              <th style="padding:8px;border:1px solid #eee">Province</th>
              <th style="padding:8px;border:1px solid #eee">Address</th>
              <th style="padding:8px;border:1px solid #eee">Qty</th>
              <th style="padding:8px;border:1px solid #eee">Unit</th>
              <th style="padding:8px;border:1px solid #eee">Total</th>
            </tr>
          </thead>
          <tbody>
            ${lines}
          </tbody>
        </table>
      </div>
    `;

    const mailOptions = {
      from: gmailEmail,
      to: brandEmail, // صاحب البراند
      subject: `New Order #${orderId}`,
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent for order:", orderId);
      return true;
    } catch (err) {
      console.error("Error sending email:", err);
      throw new Error("Mail error: " + err.message);
    }
  });
