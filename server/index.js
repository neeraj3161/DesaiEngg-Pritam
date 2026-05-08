const express =    require('express');
const port = process.env.PORT || 3000;
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});




const app = express();


app.use(cors({
    origin: 'https://www.desaiengineering.in/', // Replace with your frontend URL
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
}));



//to parse json
app.use(express.json());

//to parse form body data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is !running!');
});

app.post('/enquiry', async(req, res) => {
    try {
    const { name, email, message, phone } = req.body;
    console.log('Enquiry received:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log(`Phone: ${phone}`);
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Enquiry',
        html: `
    <div style="
        font-family: Arial, sans-serif;
        background: #f4f4f4;
        padding: 40px 20px;
    ">

        <div style="
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        ">

            <div style="
                background: #111827;
                color: white;
                padding: 24px;
                text-align: center;
            ">
                <h1 style="margin:0; font-size:24px;">
                    New Website Enquiry
                </h1>

                <p style="
                    margin-top:8px;
                    color:#d1d5db;
                    font-size:14px;
                ">
                    Desai Engineering
                </p>
            </div>

            <div style="padding: 30px;">

                <table width="100%" cellpadding="10" cellspacing="0" style="
                    border-collapse: collapse;
                    font-size: 15px;
                ">

                    <tr>
                        <td style="
                            font-weight: bold;
                            color: #374151;
                            width: 140px;
                            border-bottom: 1px solid #e5e7eb;
                        ">
                            Name
                        </td>

                        <td style="
                            color: #111827;
                            border-bottom: 1px solid #e5e7eb;
                        ">
                            ${name}
                        </td>
                    </tr>

                    <tr>
                        <td style="
                            font-weight: bold;
                            color: #374151;
                            border-bottom: 1px solid #e5e7eb;
                        ">
                            Email
                        </td>

                        <td style="
                            color: #111827;
                            border-bottom: 1px solid #e5e7eb;
                        ">
                            ${email}
                        </td>
                    </tr>

                    <tr>
                        <td style="
                            font-weight: bold;
                            color: #374151;
                            border-bottom: 1px solid #e5e7eb;
                        ">
                            Phone
                        </td>

                        <td style="
                            color: #111827;
                            border-bottom: 1px solid #e5e7eb;
                        ">
                            ${phone}
                        </td>
                    </tr>

                    <tr>
                        <td style="
                            font-weight: bold;
                            color: #374151;
                            vertical-align: top;
                        ">
                            Message
                        </td>

                        <td style="
                            color: #111827;
                            line-height: 1.7;
                        ">
                            ${message}
                        </td>
                    </tr>

                </table>

            </div>

            <div style="
                background:#f9fafb;
                padding:20px;
                text-align:center;
                font-size:13px;
                color:#6b7280;
            ">
                This enquiry was submitted through the
                Desai Engineering website contact form.
            </div>

        </div>

    </div>
`
        });

    res.send('Enquiry received!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});