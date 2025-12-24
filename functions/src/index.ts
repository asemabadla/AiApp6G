import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import cors from "cors";
import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";

// تحميل متغيرات البيئة من ملف .env داخل مجلد functions
dotenv.config();

// تهيئة Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// إعداد Express
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// إعداد بيئة PayPal (Sandbox أو Live)
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID || "",
  process.env.PAYPAL_SECRET || ""
);
const client = new paypal.core.PayPalHttpClient(environment);

/**
 * إنشاء طلب دفع (Order)
 */
app.post("/create-order", async (req: Request, res: Response) => {
  const { appId } = req.body;
  if (!appId) {
    return res.status(400).json({ error: "Missing appId" });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: { currency_code: "USD", value: "20.00" },
        description: `AiApp6G App (${appId})`,
      },
    ],
    application_context: {
      return_url: `https://aiapp6g.web.app/success?appId=${appId}`,
      cancel_url: `https://aiapp6g.web.app/cancel?appId=${appId}`,
    },
  });

  try {
    const order = await client.execute(request);

    await db.collection("apps").doc(appId).set(
      {
        status: "payment_pending",
        paypalOrderId: order.result.id,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return res.json({ id: order.result.id, links: order.result.links });
  } catch (err) {
    console.error("create-order error:", err);
    return res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

/**
 * تأكيد الدفع (Capture)
 */
app.post("/capture-order", async (req: Request, res: Response) => {
  const { orderId, appId } = req.body;
  if (!orderId || !appId) {
    return res.status(400).json({ error: "Missing orderId or appId" });
  }

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);

    await db.collection("apps").doc(appId).set(
      {
        status: "paid",
        paidAt: admin.firestore.FieldValue.serverTimestamp(),
        paypalCaptureId: capture.result.id,
      },
      { merge: true }
    );

    return res.json({ success: true, capture: capture.result });
  } catch (err) {
    console.error("capture-order error:", err);
    return res.status(500).json({ error: "Failed to capture PayPal order" });
  }
});

// تصدير الـ API
export const api = functions.https.onRequest(app);