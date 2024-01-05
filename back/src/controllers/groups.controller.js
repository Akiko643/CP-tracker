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
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const { user } = req;
    const response = await GroupsService.getGroups({ userId: user._id });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { user } = req;
    const { oldName, newName } = req.body;
    const response = await GroupsService.updateGroup({ userId: user._id, oldName, newName });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const response = await GroupsService.deleteGroup({ userId: user._id, groupId: id });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const createProblemToGroup = async (req, res) => {
  try {
    const { user } = req;
    const { groupId, problemId } = req.body;
    const response = await GroupsService.createProblemToGroup({ userId: user._id, groupId, problemId });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteProblemFromGroup = async (req, res) => {
  try {
    const { user } = req;
    const { groupId, problemId } = req.params;
    const response = await GroupsService.deleteProblemFromGroup({ userId: user._id, groupId, problemId });
    return res.send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
