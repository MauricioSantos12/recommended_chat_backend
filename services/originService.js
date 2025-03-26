const Origin = require("../models/originModel");

const OriginService = {
  getOriginById: async (origin_id) => {
    return await Origin.getOriginById(origin_id);
  },
};

module.exports = OriginService;
