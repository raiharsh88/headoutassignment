import { v4 as uuidv4 } from 'uuid';

interface UserData {
  id: string;
  name: string;
  username: string;
}

export function getUser(): UserData | null {
  const userData = localStorage.getItem('userData');
  if (userData) {
    try {
      return JSON.parse(userData) as UserData;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }
  return null;
}

export function setUser(): UserData {
  const existingUser = getUser();
  if (existingUser) {
    return existingUser;
  }
  
  // Initialize with simple fake data
  const newUser = {
    id: uuidv4(),
    name: 'User' + Math.floor(Math.random() * 1000),
    username: 'user_' + Math.floor(Math.random() * 1000),
  };
  localStorage.setItem('userData', JSON.stringify(newUser));
  return newUser;
}
