"use client";

import { useState } from "react";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

//Actions
import updateStatus from "@/actions/server/updateStatus";
import deleteAdmin from "@/actions/server/deleteAdmin";
import editAdmin from "@/actions/server/editAdmin";

//Components
import Drawer from "../ui/Drawer";
import Input from "../ui/Input";
import Button from "../ui/Button";

//Utils
import { formatDate } from "@/utils/time";

//Icons
import { Ban, Trash2, Edit2 } from 'lucide-react';


export default function StaffTable({ admins }: { admins: Admin[] }) {

    const [state, setState] = useState<Admin>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("")

    //Functions
    function decryptPassword(encryptedText: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedText, "extraordinairetalents");
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    const toggleIsOpen = () => {
        setIsOpen((prev) => !prev)
    }

    const addAdmin = (selectedAdmin: Admin) => {
        setState(selectedAdmin)
        setPassword(decryptPassword(selectedAdmin.encryptedPassword))
    }

    const toggleLoading = () => setLoading((prev) => !prev);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        const isChecked = event.target instanceof HTMLInputElement && event.target.type === "checkbox" ? event.target.checked : undefined;
        setState((prevState) => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                [name]: type === "checkbox" ? isChecked : value,
            };
        });
    }

    const handleSuspend = async (id: string, type: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to ${type} this admin?`);
        if (!confirmDelete) return;

        toast.message(`Updating Suspension Status...`)
        const { success, message } = await updateStatus(id, type);
        if (!success) {
            toast.error("Couldn't delete update admins suspension status now, kindly try again later");
            return;
        }
        toast.success(message);
    }

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this admin?`);
        if (!confirmDelete) return;

        toast.message("Deleting...")
        const { success, message } = await deleteAdmin(id);
        if (!success) {
            toast.error("Couldn't delete admin now, kindly try again later");
            return;
        }
        toast.success(message);
    }

    const handleUpdate = async () => {
        if (!state) {
            toast.error("Kindly select an admin")
            return
        }

        toggleLoading();
        toast.message("Updating Details...");

        const { success, message } = await editAdmin(state?.id, state?.email, password, state?.suspended, state?.role);
        toggleLoading();
        if (!success) {
            toast.error("Couldn't update admin details, please try again later");
            return
        }
        toast.success(message)

    }

    return (
        <main>
            {isOpen && state &&
                <Drawer isOpen={isOpen} onClose={toggleIsOpen}>
                    <div className="flex flex-col gap-y-5">
                        <Input type="text" value={state?.email} label="Email Address" id="email" name="email" onChange={handleChange} />
                        <Input type="text" value={password} label="Password" id="newPassword" name="newPassword" onChange={(event) => setPassword(event.target.value)} />
                        <select name="role" id="role" value={state?.role || "admin"} onChange={handleChange} className="bg-inherit px-2 xl:px-4 py-3 border border-[#716A7C] focus:border-0 rounded-lg focus:outline focus:outline-primaryPurple duration-300">
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                        <div className="flex items-center gap-x-2">
                            <input className="size-5 accent-cyanGreen" type="checkbox" name="suspended" id="suspended" checked={state?.suspended} onChange={handleChange} />
                            <label htmlFor="suspended" className="cursor-pointer">Suspended</label>
                        </div>
                        <Button type={"button"} text="Update Admin" loading={loading} disabled={loading} onClick={handleUpdate} />
                    </div>

                </Drawer>
            }
            <div className="overflow-x-auto">
                {admins.length === 0 ? (
                    <main className="place-content-center grid bg-slate-900 h-[20rem] text-darkWhite">
                        <p className="text-base md:text-lg xl:text-2xl">
                            You don&apos;t have any admins yet.
                        </p>
                    </main>
                ) : (
                    <table className="bg-lightBlack shadow-md mb-4 rounded-xl min-w-full border-collapse">
                        <thead className="bg-gray-700 rounded-md">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Email</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Password</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Role</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Suspended</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Created When?</th>
                                <th className="px-6 py-3 font-medium text-xs text-left uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin, index) => (
                                <tr key={admin.id} className={`${index % 2 === 0 ? "bg-black" : "bg-lightBlack"} whitespace-nowrap`}>
                                    <td className="px-6 py-4">{admin.email}</td>
                                    <td className="px-6 py-4">{decryptPassword(admin.encryptedPassword)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${admin.role === 'super_admin' ? 'text-green-100 bg-green-600' :
                                                admin.role === 'admin' ? 'text-yellow-100 bg-yellow-600' : ''}`}>
                                            {admin.role === "super_admin" ? "super admin" : "admin"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{admin.suspended ? "Suspended" : "Unsuspend"}</td>
                                    <td>{formatDate(admin.createdAt)}</td>
                                    <td className="flex items-center gap-x-5 px-6 py-4">
                                        <button onClick={() => handleSuspend(admin.id, `${admin.suspended ? 'unsuspend' : 'suspend'}`)} className={`mr-2 ${admin.suspended ? 'text-red-400' : 'text-yellow-400'}`}
                                            title={admin.suspended ? 'Unsuspend Admin' : 'Suspend Admin'}>
                                            <Ban className="w-5 h-5" strokeWidth={4} />
                                        </button>
                                        <button onClick={() => handleDelete(admin.id)} className="text-red-400"
                                            title="Delete Admin">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => { toggleIsOpen(); addAdmin(admin) }} className="text-green-400"
                                            title="Edit Admin">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}
