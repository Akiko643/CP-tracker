"use client";
import { createGroup, getGroups } from "@/api/index";

export default async function Groups() {
  async function handleCreateGroup(formData: FormData) {
    const data = {
      groupName: formData.get("groupName") as string
    };
    try {
      const response = await createGroup(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // const groups = await getGroups();
  return (
    <h1>Groups</h1>
    // <div className="grid grid-cols-3">
    //   {groups.map((group: Group) => {
    //     <div className="border-solid border-2">
    //       <p>{group.groupName}</p>
    //     </div>
    //   })}
    // </div>
  )
}