'use strict';

const {HttpCode} = require(`../../../constants`);

module.exports = (param, scheme) => async (req, res, next) => {
  const id = req.params[param];

  try {
    await scheme.validateAsync({id}, {abortEarly: false});
  } catch (error) {
    const {details = []} = error;
    const text = details.map((errorText) => errorText.message).join(`, `);
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(text);
  }

  return next();
};
