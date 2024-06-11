import React, { useState } from 'react';
import Role from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { NotificationManager} from 'react-notifications';

const ChangeuserRole = ({ name, email, role, userId, Onclose, callFunc }) => {
    const [UserRole, setUserRole] = useState(role);

    const handleSelectChange = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            const fetchData = await fetch(SummaryApi.UpdateUser.url, {
                method: SummaryApi.UpdateUser.method,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: UserRole, userId })
            });

            const fetchResponse = await fetchData.json();

            if (fetchResponse.success) {
                NotificationManager.success(fetchResponse.message);
                Onclose();
                callFunc();
            } else {
                NotificationManager.error(fetchResponse.message);
            }
            console.log("Role updated:", fetchResponse);
        } catch (error) {
            NotificationManager.error("Failed to update role");
            console.error("Error updating role:", error);
        }
    };

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm '>
                <div className='flex justify-between pt-0 py-4'>
                    <h1 className='text-xl font-bold'>Change User Role</h1>
                    <button className='block ml-auto bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white' onClick={Onclose}><IoMdClose /></button>
                </div>
                <p>Name :  {name}</p>
                <p>Email :  {email}</p>
                <div className='flex items-center justify-between my-2'>
                    <p>Role:</p>
                    <select className='border px-4 py-1' value={UserRole} onChange={handleSelectChange}>
                        {
                            Object.values(Role).map(el => (
                                <option value={el} key={el}>{el}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='flex justify-center mt-4'>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mt-4" onClick={updateUserRole}
                    >Change Role</button>
                </div>
            </div>
        </div>
    );
};

export default ChangeuserRole;
