
import React from 'react';
import type { GeneratedContent } from '../types';
import LoadingSpinner from './LoadingSpinner';
import InfoCard from './InfoCard';
import { IdeaIcon, MechanismIcon, TipsIcon, TradeoffIcon } from './Icons';

interface ResultsGridProps {
  isLoading: boolean;
  error: string | null;
  content: GeneratedContent | null;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ isLoading, error, content }) => {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
        <p className="text-brand-text-secondary mt-4">Crafting your learning experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-red-900/20 border border-red-500 rounded-lg p-4">
        <h3 className="text-xl font-bold text-red-400">An Error Occurred</h3>
        <p className="text-red-300 mt-2">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-10 bg-brand-surface/30 rounded-lg">
        <h2 className="text-2xl font-bold">Welcome to the Learning Design Catalyst</h2>
        <p className="text-brand-text-secondary mt-2 max-w-2xl mx-auto">
          Select your criteria above and click "Generate Idea" to get an AI-powered learning mechanism suggestion.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <InfoCard title="Learning Mechanism" icon={<MechanismIcon />} content={content.mechanism} />
      <InfoCard title="Example Activity" icon={<IdeaIcon />} content={content.example} />
      <InfoCard title="Implementation Tips" icon={<TipsIcon />} content={content.implementationTips} />
      <InfoCard title="Tradeoffs" icon={<TradeoffIcon />} content={content.tradeoffs} />
    </div>
  );
};

export default ResultsGrid;
