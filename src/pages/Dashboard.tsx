import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserBots } from '../lib/bots';
import { Bot, Plus, Activity, Users, TrendingUp, Calendar } from 'lucide-react';
import type { Bot as BotType } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [bots, setBots] = useState<BotType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBots = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userBots = await getUserBots(user.id);
        // Transform the data to match our Bot interface
        const transformedBots: BotType[] = userBots.map(bot => ({
          id: bot.id,
          user_id: bot.user_id,
          name: bot.name,
          description: bot.description,
          type: bot.type,
          language: bot.language,
          personality: bot.personality,
          status: bot.status as 'active' | 'inactive' | 'training',
          createdAt: bot.created_at,
          updatedAt: bot.updated_at,
          lastActive: bot.last_active,
        }));
        setBots(transformedBots);
      } catch (err) {
        setError('Failed to load bots');
        console.error('Error fetching bots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, [user]);

  const stats = [
    { name: 'Total Bots', value: bots.length.toString(), icon: Bot, color: 'text-blue-600' },
    { name: 'Active Bots', value: bots.filter(bot => bot.status === 'active').length.toString(), icon: Activity, color: 'text-green-600' },
    { name: 'Total Conversations', value: '1,234', icon: Users, color: 'text-purple-600' },
    { name: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'training':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage and monitor your bot ecosystem</p>
        </div>
        <Link
          to="/new-bot"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Bot</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <IconComponent className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bots Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Bots</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : bots.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bots yet</h3>
            <p className="text-gray-600 mb-4">Create your first bot to get started</p>
            <Link
              to="/new-bot"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Bot</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot) => (
              <div key={bot.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bot.name}</h3>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bot.status)}`}>
                        {bot.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{bot.description || 'No description'}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {new Date(bot.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="h-4 w-4" />
                    <span>
                      {bot.lastActive 
                        ? `Active ${new Date(bot.lastActive).toLocaleDateString()}`
                        : 'Never active'
                      }
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    Manage Bot
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};