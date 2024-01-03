import GroupsService from "../services/groups.service.js";

export const createGroup = async (req, res) => {
  try {
    const { user } = req;
    const { groupName} = req.body;
    if (!groupName) throw new Error("invalid group name");
    const response = await GroupsService.createGroup({
      userId: user._id,
      groupName
    });
    return res.send(response);
  } catch(err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const { user } = req;
    const response = await GroupsService.getGroups({ userId: user._id });
    return res.send(response);
  } catch(err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { user, oldName, newName } = req;
    const response = await GroupsService.updateGroup({ user, oldName, newName });
    return res.send(response);
  } catch(err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  
};

// adding & deleting problem from group
export const createProblemToGroup = async (req, res) => {

};

export const deleteProblemFromGroup = async (req, res) => {

};