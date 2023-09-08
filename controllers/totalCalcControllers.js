import Opportunity from "../models/opportunityModel.js";
import Vacancy from "../models/vacancyModel.js";
import Event from "../models/vacancyModel.js";
import User from "../models/vacancyModel.js";

export async function getTotalCalc(req, res, next) {
  try {
    const opportunities = await Opportunity.count();
    const vacancies = await Vacancy.count();
    const workshops = await Event.count({ type: "workshop" });
    const beneficiaries = await User.count({
      $or: [
        { opportunities: { $exists: true, $not: { $size: 0 } } },
        { events: { $exists: true, $not: { $size: 0 } } },
      ],
    });

    res.status(200).json({
      success: true,
      message: {
        totalOpportunities: opportunities,
        totalVacancies: vacancies,
        totalBeneficiaries: beneficiaries,
        totalWorkshops: workshops,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
