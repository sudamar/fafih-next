'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export interface Tab {
  id: string;
  label: string;
}

interface TabNavegacaoProps {
  tabs: Tab[];
  initialTab?: string;
  onTabChange: (id: string) => void;
}

export function TabNavegacao({ tabs, initialTab, onTabChange }: TabNavegacaoProps) {
  const [activeTab, setActiveTab] = useState(initialTab || (tabs.length > 0 ? tabs[0].id : ''));

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-3">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          variant={activeTab === tab.id ? 'default' : 'outline'}
          size="lg"
          className="rounded-full"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
