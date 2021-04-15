const Cars = require("./cars-model");

const express = require("express");
const router = express.Router();

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
    try {
        const getCars = await Cars.getAll();
        res.status(200).json(getCars);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", checkCarId, async (req, res, next) => {// eslint-disable-line
    res.status(200).json(req.car);
});

router.post(
    "/",
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
    async (req, res, next) => {
        try {
            const postCar = await Cars.create(req.postCar);
            res.status(201).json(postCar);
        } catch (error) {
            next(error);
        }
    }
);
module.exports = router;
