import { getUsers } from "@/actions/users-services";

export default async function UserPage() {
  const users = await getUsers();
  return (
    <ul>
      {users.map(({ name }, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}
