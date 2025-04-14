import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api"; 

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetchUsers(); // pakai fungsi dari api.js
        setUsers(res);
      } catch (error) {
        console.error("Gagal fetch users:", error);
      }
    };

    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.us_name.toLowerCase().includes(search.toLowerCase()) ||
      user.us_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daftar Users</h2>
      <input
        type="text"
        placeholder="Cari nama atau email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>No. HP</th>
            <th>Alamat</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, i) => (
            <tr key={i}>
              <td>{user.us_name}</td>
              <td>{user.us_email}</td>
              <td>{user.us_phone_number}</td>
              <td>{user.us_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
