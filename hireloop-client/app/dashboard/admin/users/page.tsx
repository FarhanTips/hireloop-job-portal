import { getUsers } from "@/lib/api/users"

import { UserManagement } from "./_components/userManagement"

const AdminUsersPage = async () => {
  const users = await getUsers();
  console.log("users by admin", users);

  return <UserManagement users={users} />
}

export default AdminUsersPage
