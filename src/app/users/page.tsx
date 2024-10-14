'use client';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  address: string;
  phone: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchName) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (addressFilter.toLowerCase() === 'new york') {
      filtered = filtered.filter(user =>
        user.address.toLowerCase().includes('new york')
      );
    }

    if (ageFilter !== null && ageFilter >= 30) {
      filtered = filtered.filter(user => user.age >= 30);
    }

    setFilteredUsers(filtered);
  }, [searchName, addressFilter, ageFilter, users]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><span className="text-lg font-semibold">Loading...</span></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-5">{error}</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-10">List of Users</h1>

      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Search by Name"
        className="border p-2 rounded mb-5 block w-full"
      />

      <input
        type="text"
        value={addressFilter}
        onChange={(e) => setAddressFilter(e.target.value)}
        placeholder="Filter by Address (e.g., New York)"
        className="border p-2 rounded mb-5 block w-full"
      />

      <input
        type="number"
        value={ageFilter ?? ''}
        onChange={(e) => setAgeFilter(e.target.value ? parseInt(e.target.value) : null)}
        placeholder="Filter by Age >= 30"
        className="border p-2 rounded mb-5 block w-full"
      />

      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 mt-5">No users found</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {filteredUsers.map((user) => (
            <li key={user.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{user.name}</h2>
              <p className="text-gray-700 mb-2"><strong>Age:</strong> {user.age}</p>
              <p className="text-gray-700 mb-2"><strong>City:</strong> {user.city}</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> {user.address}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
