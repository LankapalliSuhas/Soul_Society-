import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [isMockData, setIsMockData] = useState(() => {
    return localStorage.getItem('USE_MOCK_DATA') !== 'false';
  });

  useEffect(() => {
    localStorage.setItem('USE_MOCK_DATA', isMockData);
    window.dispatchEvent(new Event('mockDataChanged'));
  }, [isMockData]);

  const toggleMockData = () => {
    setIsMockData(prev => !prev);
  };

  return (
    <DataContext.Provider value={{ isMockData, toggleMockData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
