import React, { useState } from 'react';
import { User, Star, Trophy, Settings, Lock } from 'lucide-react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const userProfile = {
    name: 'Emily Johnson',
    age: 10,
    level: 'Junior Explorer',
    points: 1250,
    badges: 7
  };

  const renderProfileTab = () => (
    <div className="bg-whit p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-sky/50 rounded-full flex items-center justify-center">
          <User size={48} className="text-blu/60" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-darkg">{userProfile.name}</h2>
          <p className="">Age: {userProfile.age}</p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gree/50 p-4 rounded-lg text-center">
          <Star className="mx-auto text-yello" />
          <p className="font-semibold">Level</p>
          <p className="text-lg">{userProfile.level}</p>
        </div>
        <div className="bg-purpl/40 p-4 rounded-lg text-center">
          <Trophy className="mx-auto text-purpl" />
          <p className="font-semibold">Points</p>
          <p className="text-lg">{userProfile.points}</p>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-whit p-6 rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between bg-darkg/30 p-4 rounded-lg gap-5">
        <div className="flex items-center space-x-3">
          <Lock className="text-darkg" />
          <span>Change Password</span>
        </div>
        <button className="bg-blu/30 text-white px-4 py-2 rounded-full hover:bg-blu/50">
          Change
        </button>
      </div>
      <div className="flex items-center justify-between bg-darkg/30 p-4 rounded-lg gap-5">
        <div className="flex items-center space-x-3">
          <Settings className="text-darkg" />
          <span>Parental Controls</span>
        </div>
        <button className="bg-blu/30 text-white px-4 py-2 rounded-full hover:bg-blu/50">
          Manage
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-screen bg-light p-6 ">
      <div className="max-w-xl mt-20 mx-auto bg-whit/70 rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button 
            className={`flex-1 py-4 ${activeTab === 'profile' ? 'bg-blu/30 text-blu' : 'text-darkg'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`flex-1 py-4 ${activeTab === 'settings' ? 'bg-blu/30 text-blu' : 'text-darkg'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' ? renderProfileTab() : renderSettingsTab()}
        </div>
      </div>
    </div>
  );
};

export default Account;
