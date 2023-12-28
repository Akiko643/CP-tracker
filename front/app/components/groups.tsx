interface group {
  name: string;
}

export default function Groups() {
  let groups: group[] = [{ name: "IOI" }, { name: "DP" }, { name: "1900+" }];

  return (
    <section className="w-48 p-4 bg-teal-950 rounded-md self-start">
      <h2>Groups</h2>
      <div className="pl-4">
        {groups.map((group, index) => (
          <div key={`group-${index}`}>{group.name}</div>
        ))}
      </div>
    </section>
  );
}
