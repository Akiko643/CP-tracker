import { Group } from "../schemas/group.schema.js";
import { Problem } from "../schemas/problem.schema.js";

const createGroup = async ({ userId, groupName }) => {
  const isExist = await Group.findOne({ userId, groupName });
  if (isExist) {
    throw new Error("Group with a given name already created before");
  }
  const res = await Group.create({ userId, groupName });
  return res;
};

const getGroups = async ({ userId }) => {
  const groups = await Group.find({ userId });
  const ret = await Promise.all(
    groups.map(async (group) => {
      const solvedProblems = await Problem.find({
        userId,
        status: "solved",
        groupIds: group._id,
      });
      const skippedProblems = await Problem.find({
        userId,
        status: "skipped",
        groupIds: group._id,
      });
      const solvingProblems = await Problem.find({
        userId,
        status: "solving",
        groupIds: group._id,
      });
      const todoProblems = await Problem.find({
        userId,
        status: "Not Attempted",
        groupIds: group._id,
      });
      return {
        ...group._doc,
        solvedProblems,
        skippedProblems,
        solvingProblems,
        todoProblems,
      };
    })
  );
  return ret;
};

const updateGroup = async ({ userId, oldName, newName }) => {
  const isExist = await Group.findOne({ userId, groupName: oldName });
  if (!isExist) {
    throw new Error("Group with a given oldName doesn't exist");
  }
  const filter = { userId, groupName: oldName };
  const update = { groupName: newName };
  await Group.findOneAndUpdate(filter, update); // returns before update
  return await Group.findOne({ userId, groupName: newName });
};

const deleteGroup = async ({ userId, groupId }) => {
  const isExist = await Group.findOne({ _id: groupId, userId });
  if (!isExist) {
    throw new Error("Group doesn't exist");
  }
  await Group.deleteOne({ _id: groupId, userId });
  return "Group successfully deleted";
};

const createProblemToGroup = async ({ userId, groupId, problemId }) => {
  const doc = await Problem.findOne({
    userId,
    _id: problemId,
    groupIds: groupId,
  });
  if (doc) {
    throw new Error("Problem already added");
  }
  await Problem.updateOne(
    { _id: problemId },
    { $addToSet: { groupIds: groupId } }
  );
  return "Problem successfully added to the group";
};

const deleteProblemFromGroup = async ({ userId, groupId, problemId }) => {
  const doc = await Problem.findOne({
    userId,
    _id: problemId,
    groupIds: groupId,
  });
  if (!doc) {
    throw new Error("Problem is not in the group");
  }
  await Problem.updateOne({ _id: problemId }, { $pull: { groupIds: groupId } });
  return "Problem successfully removed from the group";
};

export default {
  createGroup,
  getGroups,
  updateGroup,
  deleteGroup,
  createProblemToGroup,
  deleteProblemFromGroup,
};
