// src/context/RoleContext.js
import { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [modulesData, setModulesData] = useState([]);
    const [rolesOptions, setRolesOptions] = useState([]);

    return (
        <RoleContext.Provider value={{
            selectedOption,
            setSelectedOption,
            modulesData,
            setModulesData,
            rolesOptions,
            setRolesOptions
        }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRoleContext = () => useContext(RoleContext);
