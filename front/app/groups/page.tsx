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
  return (
    <div className="mt-4">
      <form action={handleCreateGroup}>
        <input name="groupName"/>
        <button className="text-gray-50">Create Group</button>
      </form>  
    </div>
  )
}