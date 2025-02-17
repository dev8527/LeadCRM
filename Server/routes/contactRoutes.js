// routes/contactRoutes.js
import express from "express";
import { searchContacts , addProspect, getProspects , bulkLookup} from "../controllers/contactController.js";
import protect from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post('/search', protect, searchContacts);
router.post('/prospect', protect, addProspect);
router.post('/prospect-list', protect, getProspects);
router.post('/prospect-list', protect, bulkLookup);


export default router;
