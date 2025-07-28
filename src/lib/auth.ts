import bcrypt from 'bcryptjs';
import { supabase } from './supabase';
import type { Database } from './supabase';

type User = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];

// Get user's IP address
const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP address:', error);
    return 'unknown';
  }
};

// Hash password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

// Verify password against hash
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Register new user
export const registerUser = async (
  username: string,
  email: string,
  password: string,
  name: string
): Promise<User> => {
  // Check if username or email already exists
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('id, username, email')
    .or(`username.eq.${username},email.eq.${email}`)
    .single();

  if (existingUser) {
    if (existingUser.username === username) {
      throw new Error('Username already exists');
    }
    if (existingUser.email === email) {
      throw new Error('Email already exists');
    }
  }

  // Hash password
  const passwordHash = await hashPassword(password);
  
  // Get user IP
  const ipAddress = await getUserIP();

  // Insert new user
  const userData: UserInsert = {
    username,
    email,
    password_hash: passwordHash,
    name,
    ip_address: ipAddress,
  };

  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();

  if (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed. Please try again.');
  }

  return data;
};

// Login user
export const loginUser = async (
  usernameOrEmail: string,
  password: string
): Promise<User> => {
  // Find user by username or email
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .or(`username.eq.${usernameOrEmail},email.eq.${usernameOrEmail}`)
    .single();

  if (error || !user) {
    throw new Error('Invalid username/email or password');
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, user.password_hash);
  
  if (!isValidPassword) {
    throw new Error('Invalid username/email or password');
  }

  // Return user without password hash
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, name, ip_address, created_at, updated_at')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Get user error:', error);
    return null;
  }

  return data;
};