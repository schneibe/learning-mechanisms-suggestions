
import React from 'react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  content: string | { title: string; description: string; reference: string };
  referenceLink?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, content }) => {
  const renderContent = () => {
    if (typeof content === 'string') {
        if (content.includes('* ')) {
            return (
                <ul className="list-disc list-inside space-y-2">
                    {content.split('* ').filter(item => item.trim() !== '').map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
            );
        }
        return <p>{content}</p>;
    }
    
    // Handle mechanism object
    if (typeof content === 'object' && content !== null && 'title' in content) {
      return (
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-brand-primary">{content.title}</h3>
          <p>{content.description}</p>
          <p className="text-sm text-brand-text-secondary italic">Reference: {content.reference}</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-brand-surface rounded-xl shadow-lg p-6 flex flex-col hover:scale-[1.02] transition-transform duration-300 ease-in-out">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-semibold ml-4">{title}</h2>
      </div>
      <div className="text-brand-text-secondary flex-grow">
        {renderContent()}
      </div>
    </div>
  );
};

export default InfoCard;
