import UsersTable from "@/components/admin/users/UsersTable";
import { getUsers } from "@/lib/actions/admin";



export default async function UsersPage() {
  const users = await getUsers();

  return (
    <UsersTable users={users} />
  );
}