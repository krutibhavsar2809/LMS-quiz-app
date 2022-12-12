import React, { createContext, useState } from 'react';

const UserDataContext = createContext(undefined);
const SetUserDataContext = createContext(undefined);

const UserProfileProvider = ({ children }) => {
    const [userData, setUserData] = useState(undefined);
    return (
        <UserDataContext.Provider value={userData}>
          <SetUserDataContext.Provider value={setUserData}>
            {children}
          </SetUserDataContext.Provider>
        </UserDataContext.Provider>
      );
}

export { UserDataContext, SetUserDataContext, UserProfileProvider };