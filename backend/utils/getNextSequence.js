// utils/getNextSequence.js
import Counter from "../models/counter.model.js";

export const getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true } // create if doesn't exist
  );

  return counter.seq;
};
