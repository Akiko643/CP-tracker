import { Group } from "../schemas/group.schema.js";

const createGroup = async ({ userId, groupName }) => {
  const checkResponse = await Group.findOne({ userId, groupName});
  if (checkResponse) {
    throw new Error("Group with the given name already created before");
  }
  const res = await Group.create({ userId, groupName });
  return res;
};

const getGroups = async ({ userId }) => {
  const res = await Group.find({ userId });
  return res;
};

const updateGroup = async ({ userId, oldName, newName }) => {
  
}

const deleteGroup = async ({ userId, groupName }) => {

}

export default {
  createGroup,
  getGroups,
  updateGroup,
  deleteGroup,
};