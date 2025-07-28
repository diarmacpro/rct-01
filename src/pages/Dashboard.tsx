import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Plus, Activity, Users, TrendingUp, Calendar } from 'lucide-react';
import { Bot as BotType } from '../types';

export const Dashboard: React.FC = () => {
  // Mock data - in a real app this would come from an API
  const bots: BotType[] = [
    {
      id: '1',
      name: 'Customer Support Bot',
      description: 'Handles customer inquiries and support tickets',
      status: 'active',
      createdAt: '2024-01-15',
      lastActive: '2024-01-20',
    },
    {
      id: '2',
      name: 'Sales Assistant Bot',
      description: 'Helps with product recommendations and sales',
      status: 'active',
      createdAt: '2024-01-10',
      lastActive: '2024-01-19',
    },
    {
      id: '3',
      name: 'Training Bot',
      description: 'Currently learning from new training data',
      status: 'training',
      createdAt: '2024-01-18',
      lastActive: '2024-01-20',
    },
  ];

  const stats = [
    { name: 'Total Bots', value: '3', icon: Bot, color: 'text-blue-600' },
    { name: 'Active Bots', value: '2', icon: Activity, color: 'text-green-600' },
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
              
              <p className="text-gray-600 text-sm mb-4">{bot.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {new Date(bot.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="h-4 w-4" />
                  <span>Last active {new Date(bot.lastActive).toLocaleDateString()}</span>
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
      </div>
    </div>
  );
};