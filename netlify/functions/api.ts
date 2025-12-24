import express, { Request, Response } from "express";
import serverless from "serverless-http";
import cors from "cors";
import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// إعداد PayPal
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID || "",
  process.env.PAYPAL_SECRET || ""
);
const client = new paypal.core.PayPalHttpClient(environment);

// إنشاء طلب دفع
app.post("/create-order", async (req: Request, res: Response) => {
  const { appId } = req.body;
  if (!appId) return res.status(400).json({ error: "Missing appId" });

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
      return_url: `https://aiapp6g.netlify.app/success?appId=${appId}`,
      cancel_url: `https://aiapp6g.netlify.app/cancel?appId=${appId}`,
    },
  });

  try {
    const order = await client.execute(request);
    return res.json({ id: order.result.id, links: order.result.links });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

// تأكيد الدفع
app.post("/capture-order", async (req: Request, res: Response) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ error: "Missing orderId" });

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    return res.json({ success: true, capture: capture.result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to capture PayPal order" });
  }
});

// تصدير كـ Netlify Function
export const handler = serverless(app);