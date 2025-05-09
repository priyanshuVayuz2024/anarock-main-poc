// src/context/RoleContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import client from '../client';
import { dummyDataResponse } from '../utils';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [modulesData, setModulesData] = useState([]);
    const [rolesOptions, setRolesOptions] = useState([]);
    const [communitiesOptions, setCommunitiesOptions] = useState([]);
    const [selectedOptionComm, setSelectedOptionComm] = useState("");
    const [sidebarURLs, setSidebarURLs] = useState([])

    const [templateId, setTemplateId] = useState(null)


    const [totalURLs, setTotalURLs] = useState([])


    const [count, setCount] = useState(1)


    const [community, setCommunity] = useState(null)


    useEffect(() => {
        const fetchRoles = async () => {
            let res = await client.get("/v2-role/fetch-roles");
            setRolesOptions(
                res?.data?.result?.map((r) => ({ label: r?.role, value: r?.role_id }))
            );
        };
        const fetchCommunities = async () => {
            let res = await client.get("/v2-role/fetch-community");
            setCommunity(res)
            setCommunitiesOptions(
                res.data.result?.map((r) => ({ label: r?.community, value: r?.community_id }))
            );

        };
        fetchCommunities()
        fetchRoles();

    }, []);


    useEffect(() => {
        if (selectedOptionComm && selectedOption) {
            console.log(community, 'okokokok', selectedOptionComm, community?.data?.result?.filter(obj => obj?.community_id == selectedOptionComm)?.[0]?.community_modules?.map(md => ({ url: md?.module_details?.[0]?.url, module: md?.module_details?.[0]?.module_id, label: md?.module_details?.[0]?.module })), community?.data?.result?.filter(obj => obj?.community_id == selectedOptionComm));

            setSidebarURLs(community?.data?.result?.filter(obj => obj?.community_id == selectedOptionComm)?.[0]?.community_modules?.map(md => ({ url: md?.module_details?.[0]?.url, module: md?.module_details?.[0]?.module_id, label: md?.module_details?.[0]?.module })))
            setTotalURLs(p => [...p, ...community?.data?.result?.filter(obj => obj?.community_id == selectedOptionComm)?.[0]?.community_modules?.map(md => ({ url: md?.module_details?.[0]?.url, label: md?.module_details?.[0]?.module }))])
        }
    }, [selectedOptionComm, selectedOption])




    console.log(modulesData);



    return (
        <RoleContext.Provider value={{
            selectedOption,
            setSelectedOption,
            modulesData,
            setModulesData,
            rolesOptions,
            setRolesOptions,
            selectedOptionComm,
            setSelectedOptionComm,
            communitiesOptions,
            setCommunitiesOptions,
            sidebarURLs,
            totalURLs,
            setTotalURLs,
            templateId,
            setTemplateId,
            count,
            setCount
        }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRoleContext = () => useContext(RoleContext);
