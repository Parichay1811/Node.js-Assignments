const JobModel = require("../model/job.model");

const jobCreate = async (req, res, next) => {
    try {
        console.log(req.body);
        // Insert data into DB
        const jobObj = {
            ...req.body,
            isVacant: true
        }

        const response = await JobModel.create(jobObj); // db.jobs.insertOne()
        console.log(response);
        res.json({
            success: true,
            message: `Job created successfully with id ${response._id}`
        });
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const jobList = async (req, res, next) => {
    try {
        // Read operation    
        const minExperienceRequired = parseInt(req.query.minExperienceRequired || 0);

        // const jobsList = await JobModel.find({
        //     minExperienceRequired: {
        //         $gte: minExperienceRequired
        //     }
        // });

        const jobsList = await JobModel.findById("67b8a857d1fb349788cf7289");


        res.json({
            success: true,
            message: "List Job API",
            data: jobsList
        });
    } catch (err) {
        next(err);
    }
};

const jobEdit = async (req, res, next) => {
    try {
        console.log(req.query.id);
        console.log(req.body);
        // findByIdAndUpdate(ID TO FIND, FIELDS TO REPLACE)
        // await JobModel.findByIdAndUpdate(req.query.id, req.body);
        //JobModel.updateOne(SEARCH FILTERS, FIELDS TO REPLACE)
        const findObj = {
            salary: {
                $gte: 1000
            }
        };
        const updateObj = {
            title: "NEWLY UPDATED JOB TITLE"
        };
        // await JobModel.updateOne(findObj, updateObj);

        await JobModel.updateMany(findObj, updateObj);
        res.json({
            success: true,
            message: "Job edited successfully"
        });
    } catch (err) {
        next(err);
    }
};

const jobDelete = async (req, res) => {
    try {
        // indByIdAndDelete(ID TO DELETE)
        // await JobModel.findByIdAndDelete("67bc853e5a4e81910b735ccf")

        const findObj = {
            salary: {
                $gte: 1000
            }
        };

        await JobModel.deleteMany(findObj);
        res.json({
            success: true,
            message: "Delete Job API"
        });
    } catch (err) {
        next(err);
    }
};

const jobController = {
    jobCreate,
    jobList,
    jobEdit,
    jobDelete
};

module.exports = jobController;