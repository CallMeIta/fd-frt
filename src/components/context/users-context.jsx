import React, { useCallback, useState } from 'react';

const UserContext = React.createContext({
  userData: [],
  setUserData: () => {},
  searchItem: () => {},
  getUserById: () => {},
  setUserDataById: () => {},
});

export const UsersContextProvider = (props) => {
  const [userData, setUserData] = useState([
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@gmail.com',
      role: 'Admin',
      status: true,
      id: 1,
      superAdmin: [{ name: 'Super Admin', superAdminStatus: false }],
      permissionGroups: [
        {
          name: 'Permission Group 1',
          isActive: true,
          isOpen: false,
          id: 11,
          permissions: [
            {
              name: 'permmission1',
              isActive: true,
              id: 111,
            },
          ],
        },
        {
          name: 'Permission Group 2',
          isActive: false,
          isOpen: false,
          id: 12,
          permissions: [
            {
              name: 'permmission2',
              isActive: false,
              active: true,
              id: 112,
            },
            {
              name: 'permmission3',
              isActive: false,
              active: true,
              id: 113,
            },
          ],
        },
      ],
    },
    {
      firstName: 'John',
      lastName: 'smith',
      email: 'JohnSmith@gmail.com',
      role: 'User',
      status: false,
      id: 2,
      permissionGroups: [
        {
          name: 'Permission Group 3',
          isActive: true,
          isOpen: false,
          id: 222,
          permissions: [
            {
              name: 'permmission1',
              isActive: true,
              id: 223,
            },
          ],
        },
        {
          name: 'Permission Group 4',
          isActive: false,
          isOpen: false,
          id: 224,
          permissions: [
            {
              name: 'permmission2',
              isActive: false,
              active: true,
              id: 225,
            },
            {
              name: 'permmission3',
              isActive: false,
              active: true,
              id: 226,
            },
          ],
        },
      ],
    },
  ]);

  const getUserById = useCallback(
    (id) => {
      if (!id) return null;
      return userData.find((u) => u.id.toString() === id.toString());
    },
    [userData]
  );

  const setUserDataById = useCallback(
    (id, payload) => {
      if (!id) return null;
      setUserData((prev) => {
        const newState = [...prev];
        const userIndex = newState.findIndex(
          (u) => u.id.toString() === id.toString()
        );
        newState[userIndex] = {
          ...newState[userIndex],
          ...payload,
        };
        return newState;
      });
    },
    [setUserData]
  );

  const searchItem = (searchText) => {
    let items = [];
    if (searchText) {
      items = userData.filter((item) => {
        let startsWithText;
        let includesText;
        let searched = item.firstName || item.lastName;
        startsWithText = searched
          .toLowerCase()
          .startsWith(searchText.toLowerCase());
        includesText = searched
          .toLowerCase()
          .includes(searchText.toLowerCase());
        if (startsWithText) {
          return startsWithText;
        } else if (!startsWithText && includesText) {
          return includesText;
        } else return null;
      });
    } else {
      items = userData;
    }
    return items;
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        searchItem,
        getUserById,
        setUserDataById,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
