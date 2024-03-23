import AnalyticsService from "../services/analytics.service.js";

export const findAnalyticsTimeBar = async (req, res) => {
  try {
    const { user } = req;
    //
    const timespan = req.query.timespan;
    //
    const response = await AnalyticsService.findAnalyticsTimeBar({
      userId: user._id,
      timespan,
    });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
