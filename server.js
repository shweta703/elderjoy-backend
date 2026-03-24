/**
 * Elder Joy Care Center — Volunteer Registration Server
 *
 * Entry point. Wires up middleware and mounts route modules.
 * Business logic lives in controllers/, services/, and middleware/.
 */

require('dotenv').config();

const express = require('express');
const cors    = require('cors');

const volunteerRoutes  = require('./routes/volunteer.route');
const { verifyTransporter } = require('./services/email.service');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────
app.use('/api/volunteer', volunteerRoutes);

app.get('/api/health', (_req, res) => {
    res.json({
        status:    'OK',
        message:   'Elder Joy Care Center — Volunteer Registration Server is running',
        timestamp: new Date().toISOString(),
    });
});

// ── Start ─────────────────────────────────────────────────────────────────
verifyTransporter();

app.listen(PORT, () => {
    console.log('════════════════════════════════════════════════');
    console.log('🚀  Elder Joy Care Center — Backend Server');
    console.log('════════════════════════════════════════════════');
    console.log(`   Server  : http://localhost:${PORT}`);
    console.log(`   Volunteer API : http://localhost:${PORT}/api/volunteer`);
    console.log(`   Health  : http://localhost:${PORT}/api/health`);
    console.log('════════════════════════════════════════════════');
});
