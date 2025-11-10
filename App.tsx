
import React, { useState, useMemo } from 'react';
import type { GeneratedContent, LearningMechanism } from './types';
import { AGE_GROUPS, MECHANISM_TYPES, ALL_MECHANISMS } from './constants';
import { generateLearningExperience } from './services/geminiService';
import Controls from './components/Controls';
import ResultsGrid from './components/ResultsGrid';

const App: React.FC = () => {
  const [ageGroup, setAgeGroup] = useState<string>(AGE_GROUPS[2]);
  const [mechanismType, setMechanismType] = useState<string>(MECHANISM_TYPES[0]);
  const [learningGoal, setLearningGoal] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  
  const [usedMechanisms, setUsedMechanisms] = useState<Set<string>>(new Set());

  const availableMechanisms = useMemo(() => {
    return ALL_MECHANISMS.filter(m => 
      m.Type === mechanismType && !usedMechanisms.has(m.Title)
    );
  }, [mechanismType, usedMechanisms]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    if (availableMechanisms.length === 0) {
      setError(`No more unique "${mechanismType}" mechanisms available. Clear history or choose another type.`);
      setIsLoading(false);
      return;
    }

    try {
      const result = await generateLearningExperience(ageGroup, learningGoal, availableMechanisms);
      setGeneratedContent(result);
      if (result.mechanism?.title) {
        setUsedMechanisms(prev => new Set(prev).add(result.mechanism.title));
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClearHistory = () => {
    setUsedMechanisms(new Set());
    setGeneratedContent(null);
    setError(null);
    alert("Suggestion history has been cleared. You will now see mechanisms from the beginning.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-background to-gray-900 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">
            Learning Design Catalyst
          </h1>
          <p className="mt-4 text-lg text-brand-text-secondary max-w-3xl mx-auto">
            Leverage AI to discover the perfect learning mechanisms for your educational goals.
          </p>
        </header>

        <section className="mb-10 sticky top-4 z-10">
          <Controls 
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup}
            ageGroups={AGE_GROUPS}
            mechanismType={mechanismType}
            setMechanismType={setMechanismType}
            mechanismTypes={MECHANISM_TYPES}
            learningGoal={learningGoal}
            setLearningGoal={setLearningGoal}
            onGenerate={handleGenerate}
            onClear={handleClearHistory}
            isLoading={isLoading}
            hasGenerated={!!generatedContent || !!error}
          />
        </section>

        <section>
          <ResultsGrid 
            isLoading={isLoading}
            error={error}
            content={generatedContent}
          />
        </section>

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Powered by Google Gemini. Designed for inspiration.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
