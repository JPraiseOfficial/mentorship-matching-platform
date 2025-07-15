import { useEffect, useState } from "react";
import { getAllUsers } from "../services/api.js";
import type { User } from "../types/types.js";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <div>
        <h1>Users</h1>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={5}>
                  Failed to fetch users. Please try again later.
                </td>
              </tr>
            )}
            {loading ? (
              <tr>
                <td colSpan={5}>Loading users...</td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <UserRows {...user} userCount={idx + 1} key={user.id} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserRows = ({
  userCount,
  name,
  email,
  role,
}: User & { userCount: number }) => {
  return (
    <tr>
      <td>{userCount}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td></td>
    </tr>
  );
};
export default Users;
