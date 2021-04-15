const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
    try {
        const car = await Cars.getById(req.params.id);
        if (!car) {
            res.status(404).json({
                message: `car with id ${req.params.id} is not found`,
            });
        } else {
            req.car = car;
            next();
        }
    } catch (err) {
        next(err);
    }
};

const checkCarPayload = (req, res, next) => {
    const { vin, make, model, mileage } = req.body;

    if (!vin) {
        res.status(400).json({ message: "vin is missing" });
    } else if (!make) {
        res.status(400).json({ message: "make is missing" });
    } else if (!model) {
        res.status(400).json({ message: "model is missing" });
    } else if (!mileage) {
        res.status(400).json({ message: "mileage is missing" });
    } else {
        next();
    }
};

const checkVinNumberValid = (req, res, next) => {
    const validVin = vinValidator.validate(req.body.vin);
    if (!validVin) {
        return res
            .status(400)
            .json({ message: `vin ${req.body.vin} is invalid` });
    }
    next();
};

const checkVinNumberUnique = async (req, res, next) => {
    try {
        const vin = await Cars.getByVin(req.body.vin);
        if (!vin) {
            next();
        } else {
            next({
                status: 400,
                message: `vin ${req.body.vin} already exists`,
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
};
