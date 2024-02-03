import { useGetSpecialistsQuery } from './services/specialists';

export default function App() {
  const { data, error, isLoading } = useGetSpecialistsQuery(null);

  return (
    <main className="text-3xl font-bold underline">
      <p>Appss</p>

      {data?.map((data) => <div key={data.firstName}>{data.firstName}</div>)}
    </main>
  );
}
