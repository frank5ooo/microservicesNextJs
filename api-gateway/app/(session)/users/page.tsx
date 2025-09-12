import { services } from "@/lib/services";

export default async function UserPage() {
  const users = await services.users.get();
  return (
    <ul>
      {users.map(({ name }, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}
