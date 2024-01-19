"use server";
import { getGroups } from "@/api";
import { Group } from "@/types/types";
import Link from "next/link";

export default async function Groups() {
  const groups: Group[] = await getGroups();
  return (
    <section className="w-48 p-4 bg-primary-900 rounded-md self-start">
      <Link href="/groups" className="text-gray-300 hover:text-gray-100">
        Groups
      </Link>
      <div className="pl-4 flex flex-col">
        {groups.map((group) => (
          <Link
            className="text-gray-500 hover:text-gray-300"
            key={group._id}
            href={`/groups/${group._id}`}
          >
            {group.groupName}
          </Link>
        ))}
      </div>
    </section>
  );
}
