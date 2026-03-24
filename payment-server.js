/**
 * Elder Joy Care Center — Payment Server
 *
 * Entry point for the Cashfree payment integration.
 * Business logic lives in controllers/ and middleware/.
 */

require('dotenv').config();

const express = require('express');
const cors    = require('cors');

const paymentRoutes = require('./routes/payment.route');

const app  = express();
const PORT = process.env.PAYMENT_PORT || 5001;

const isProduction = process.env.CASHFREE_ENVIRONMENT === 'PROD';

// ── Middleware ────────────────────────────────────────────────────────────
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────
app.use('/api', paymentRoutes);

app.get('/', (_req, res) => {
    res.json({
        name:        'Elder Joy — Cashfree Payment Server',
        status:      'Running',
        environment: isProduction ? 'PRODUCTION' : 'TEST',
        endpoints: {
            health:      'GET  /api/health',
            createOrder: 'POST /api/create-order',
        },
    });
});

app.get('/api/health', (_req, res) => {
    res.json({
        status:      'OK',
        message:     'Payment server running',
        environment: isProduction ? 'PRODUCTION' : 'TEST',
    });
});

// ── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log('════════════════════════════════════════════════');
    console.log('💳  Elder Joy Care Center — Payment Server');
    console.log('════════════════════════════════════════════════');
    console.log(`   Port        : ${PORT}`);
    console.log(`   Environment : ${isProduction ? 'PRODUCTION' : 'TEST (Sandbox)'}`);
    console.log(`   Health      : http://localhost:${PORT}/api/health`);
    console.log('════════════════════════════════════════════════');

    if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
        console.warn('⚠️  WARNING: Cashfree credentials not set in .env');
    }
});
