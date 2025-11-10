
import React from 'react';

interface ControlsProps {
  ageGroup: string;
  setAgeGroup: (value: string) => void;
  ageGroups: string[];
  mechanismType: string;
  setMechanismType: (value: string) => void;
  mechanismTypes: string[];
  learningGoal: string;
  setLearningGoal: (value: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isLoading: boolean;
  hasGenerated: boolean;
}

const selectStyles = "w-full bg-brand-surface border border-gray-600 rounded-lg p-3 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition";
const buttonStyles = "w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition-colors duration-300";

const Controls: React.FC<ControlsProps> = ({
  ageGroup, setAgeGroup, ageGroups,
  mechanismType, setMechanismType, mechanismTypes,
  learningGoal, setLearningGoal,
  onGenerate, onClear, isLoading, hasGenerated
}) => {
  return (
    <div className="w-full bg-brand-surface/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="age-group" className="block mb-2 text-sm font-medium text-brand-text-secondary">Target Age Group</label>
          <select id="age-group" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className={selectStyles}>
            {ageGroups.map(group => <option key={group} value={group}>{group}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="mechanism-type" className="block mb-2 text-sm font-medium text-brand-text-secondary">Learning Mechanism Type</label>
          <select id="mechanism-type" value={mechanismType} onChange={(e) => setMechanismType(e.target.value)} className={selectStyles}>
            {mechanismTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <label htmlFor="learning-goal" className="block mb-2 text-sm font-medium text-brand-text-secondary">Learning Goal (Optional)</label>
          <input
            type="text"
            id="learning-goal"
            value={learningGoal}
            onChange={(e) => setLearningGoal(e.target.value)}
            placeholder="e.g., understand fractions"
            className={selectStyles}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`${buttonStyles} bg-brand-primary hover:bg-sky-500 text-white disabled:bg-gray-500 disabled:cursor-not-allowed`}
        >
          {isLoading ? 'Generating...' : (hasGenerated ? 'Generate Another' : 'Generate Idea')}
        </button>
        <button
          onClick={onClear}
          disabled={isLoading}
          className={`${buttonStyles} bg-brand-secondary hover:bg-indigo-500 text-white disabled:opacity-50`}
        >
          Clear History
        </button>
      </div>
    </div>
  );
};

export default Controls;
