import { useEffect, useState } from "react";
import { getAllUsers } from "../services/api.js";
import type { User } from "../types/types.js";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Somenthing went wrong. Please, refresh the page or try again later."
          );
        } else {
          setError("Somenthing went wrong. Please, try again later.");
        }
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
                <td colSpan={5}>{error}</td>
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
