import nodemailer from "nodemailer";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(dirname);
const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
});

const sendMail = async (options) => {
    try {
        const { email, subject, template, data } = options;
        const templatePath = join(__dirname, "../mails", template);
        console.log(templatePath, "ofpousp");
        const html = await ejs.renderFile(templatePath, data);

        await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            html,
        });

        console.log(`✅ Email sent to ${email}`);
    } catch (error) {
        console.error(`❌ Email sending failed: ${error.message}`);
    }
};

export default sendMail;
