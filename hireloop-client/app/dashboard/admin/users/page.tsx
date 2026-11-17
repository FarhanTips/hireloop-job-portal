import { getUsers } from "@/lib/api/users"

import { UserManagement } from "./_components/userManagement"

const AdminUsersPage = async () => {
  const data = await getUsers();
  console.log("users by admin", data);

  return <UserManagement users={data.users} />
}

export default AdminUsersPage
