export default function Page({ params }: { params: { id: string } }) {
  return <div className="text-white">My Post: {params.id}</div>;
}
