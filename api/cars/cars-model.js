const db = require("../../data/db-config.js");

const getAll = () => {
    return db("cars");
};

const getById = (id) => {
    return db("cars").where("id", id).first();
};

const getByVin = (vin) => {
    return db("cars").where("vin", vin).first();
}

const create = (car) => {
    return db("cars")
        .insert(car)
        .then((id) => {
            return db("cars").where("id", id);
        });
};

module.exports = {
    getByVin,
    getAll,
    getById,
    create,
};

