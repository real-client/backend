import Vacancy from "../models/vacancyModel.js";

// Define the createVacancy controller function
export const createVacancy = async (req, res) => {
  try {
    const {
      jobReference,
      jobVacancy,
      jobLocation,
      experienceNeeded,
      otherRequirements,
    } = req.body;
    const vacancy = new Vacancy({
      jobReference,
      jobVacancy,
      jobLocation,
      experienceNeeded,
      otherRequirements,
    });
    await vacancy.save();
    return res
      .status(201)
      .json({ message: "Vacancy created successfully", vacancy });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create vacancy", error });
  }
};

// get all vacancies
export const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.status(200).json({ success: true, vacancies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get vacancy by id
export const getVacancyById = async (req, res) => {
  try {
    const vacancyId = req.params.id;
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    res.status(200).json({ success: true, message: vacancy });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
// get paginated vacancies
export const getPaginatedVacancies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalVacancies = await Vacancy.countDocuments();
    const totalPages = Math.ceil(totalVacancies / limit);

    const vacancies = await Vacancy.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages,
      totalVacancies,
      vacancies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getFilteredPaginatedVacancies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {}; // Create an empty filter object

    // Check if jobVacancy filter is provided in the query parameters
    if (req.query.jobVacancy) {
      filter.jobVacancy = req.query.jobVacancy;
    }

    // Check if jobReference filter is provided in the query parameters
    if (req.query.jobReference) {
      filter.jobReference = req.query.jobReference;
    }

    const totalVacancies = await Vacancy.countDocuments(filter);
    const totalPages = Math.ceil(totalVacancies / limit);

    const vacancies = await Vacancy.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages,
      totalVacancies,
      vacancies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// update a vacancy
export const updateVacancy = async (req, res) => {
  try {
    const vacancyId = req.params.id;
    const vacancyUpdate = req.body;
    const vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ message: "Vacancy not found" });
    }
    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      vacancyId,
      vacancyUpdate,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true, message: updatedVacancy });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete Vacancy
export const deleteVacancy = async (req, res) => {
  try {
    const vacancyId = req.params.id;
    const vacany = await Vacancy.findByIdAndDelete(vacancyId);
    res
      .status(200)
      .json({ success: true, message: "Vacancy deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
