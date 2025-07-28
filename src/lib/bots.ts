import { supabase } from './supabase';
import type { Database } from './supabase';

type Bot = Database['public']['Tables']['bots']['Row'];
type BotInsert = Database['public']['Tables']['bots']['Insert'];
type BotUpdate = Database['public']['Tables']['bots']['Update'];

// Get all bots for a user
export const getUserBots = async (userId: string): Promise<Bot[]> => {
  const { data, error } = await supabase
    .from('bots')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get bots error:', error);
    throw new Error('Failed to fetch bots');
  }

  return data || [];
};

// Create new bot
export const createBot = async (
  userId: string,
  botData: {
    name: string;
    description?: string;
    type?: string;
    language?: string;
    personality?: string;
  }
): Promise<Bot> => {
  const newBot: BotInsert = {
    user_id: userId,
    name: botData.name,
    description: botData.description,
    type: botData.type || 'general',
    language: botData.language || 'english',
    personality: botData.personality || 'professional',
    status: 'inactive',
  };

  const { data, error } = await supabase
    .from('bots')
    .insert(newBot)
    .select()
    .single();

  if (error) {
    console.error('Create bot error:', error);
    throw new Error('Failed to create bot');
  }

  return data;
};

// Update bot
export const updateBot = async (
  botId: string,
  updates: BotUpdate
): Promise<Bot> => {
  const { data, error } = await supabase
    .from('bots')
    .update(updates)
    .eq('id', botId)
    .select()
    .single();

  if (error) {
    console.error('Update bot error:', error);
    throw new Error('Failed to update bot');
  }

  return data;
};

// Delete bot
export const deleteBot = async (botId: string): Promise<void> => {
  const { error } = await supabase
    .from('bots')
    .delete()
    .eq('id', botId);

  if (error) {
    console.error('Delete bot error:', error);
    throw new Error('Failed to delete bot');
  }
};

// Get bot by ID
export const getBotById = async (botId: string): Promise<Bot | null> => {
  const { data, error } = await supabase
    .from('bots')
    .select('*')
    .eq('id', botId)
    .single();

  if (error) {
    console.error('Get bot error:', error);
    return null;
  }

  return data;
};

// Update bot last active timestamp
export const updateBotLastActive = async (botId: string): Promise<void> => {
  const { error } = await supabase
    .from('bots')
    .update({ last_active: new Date().toISOString() })
    .eq('id', botId);

  if (error) {
    console.error('Update bot last active error:', error);
  }
};