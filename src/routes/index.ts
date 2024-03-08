import { Router } from "express";

import AuthRouter from "./auth";

import { getHotelsAndTerminals, verifyCountry } from "../controllers/locationsData";
import { cancelTransfer, confirmTransfer, getAvailables } from "../controllers/availablesTransfers";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.use("/auth", AuthRouter)

router.get("/country/:country", verifyCountry);
router.get("/locations/:cityCode", getHotelsAndTerminals);
router.post("/availables", getAvailables);

router.post("/confirmTransfer", authenticate, confirmTransfer)
router.delete("/cancelTransfer/:bookingReference", authenticate, cancelTransfer)

export default router;