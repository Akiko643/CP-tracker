interface group {
  name: string;
}

export default function Groups() {
  let groups: group[] = [{ name: "IOI" }, { name: "DP" }, { name: "1900+" }];

  return (
    <section className="w-48 p-4 bg-primary-900 rounded-md self-start">
      <h2 className="text-gray-300">Groups</h2>
      <div className="pl-4">
        {groups.map((group, index) => (
          <div key={`group-${index}`} className="text-gray-500">
            {group.name}
          </div>
        ))}
      </div>
    </section>
  );
}
