const express = require("express");

const jobController = require("../controller/job.controller");

const router = express.Router();

router.post("/create", jobController.jobCreate);

router.get("/list", jobController.jobList);

router.patch("/edit", jobController.jobEdit);

router.delete("/delete", jobController.jobDelete);

module.exports = router;