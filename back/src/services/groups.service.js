import { Group } from "../schemas/group.schema.js";
import { Problem } from "../schemas/problem.schema.js";

const createGroup = async ({ userId, name }) => {
  const isExist = await Group.findOne({ userId, name });
  if (isExist) {
    throw new Error("Group with a given name already created before");
  }
  const res = await Group.create({ userId, name });
  return res;
};

const getGroups = async ({ userId }) => {
  const groups = await Group.find({ userId });
  const ret = await Promise.all(
    groups.map(async (group) => {
      const allProblems = await Problem.find({
        userId,
        groupIds: group._id,
      });
      return {
        ...group._doc,
        solvedProblems: allProblems.filter(
          (problem) => problem.status === "solved"
        ),
        skippedProblems: allProblems.filter(
          (problem) => problem.status === "skipped"
        ),
        solvingProblems: allProblems.filter(
          (problem) => problem.status === "solving"
        ),
        todoProblems: allProblems.filter(
          (problem) => problem.status === "Not Attempted"
        ),
      };
    })
  );
  return ret;
};

const updateGroup = async ({ userId, id, name }) => {
  const isExist = await Group.findOne({ userId, _id: id });
  if (!isExist) {
    throw new Error("Group with a given oldName doesn't exist");
  }
  const filter = { userId, _id: id };
  const update = { name };
  await Group.findOneAndUpdate(filter, update);
  return await Group.findOne({ userId, name });
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
