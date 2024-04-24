import React, { createContext, useState } from 'react';

const collectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [recipesData, setRecipesData] = useState({});
        const [collections, setCollections] = useState([]);

  return (
    <collectionContext.Provider value={{ recipesData, collections }}>
      {children}
    </collectionContext.Provider>
  );
};

export default collectionContext;
