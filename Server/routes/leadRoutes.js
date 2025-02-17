import express from "express";
import protect from "../middlewares/authMiddleware.js";
import Lead from "../models/Lead.js";
import puppeteer from "puppeteer"; // For scraping

const router = express.Router();

// Fetch leads (Protected)
router.get("/", protect, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Scrape LinkedIn & Save Lead
router.post("/scrape", protect, async (req, res) => {
  try {
    const { linkedinUrl } = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(linkedinUrl, { waitUntil: "domcontentloaded" });

    const name = await page.$eval("h1", (el) => el.innerText);
    const company = await page.$eval(".text-body-medium", (el) => el.innerText);

    await browser.close();

    const lead = await Lead.create({ name, company, linkedin: linkedinUrl });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Scraping Failed" });
  }
});

export default router;
