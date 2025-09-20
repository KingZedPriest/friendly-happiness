"use client"

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

//Utils
import { makeApiRequest } from "@/lib/apiUtils";

//Components
import Input from "../ui/Input";
import Button from "../ui/Button";

type AdminFormData = Omit<Admin, "createdAt" | "id" | "hashedPassword">
const initialState: AdminFormData = {
    email: "",
    encryptedPassword: "",
    role: "admin",
    suspended: false,
}

const StaffForm = () => {

    const router = useRouter();
    const [state, setState] = useState<AdminFormData>(initialState);
    const [loading, setLoading] = useState<boolean>(false);


    //Functions
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

    const toggleLoading = () => setLoading((prev) => !prev);

    const reset = () => setState(initialState);

    //OnSubmit Function
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        toggleLoading();

        await makeApiRequest("/addAdmin", "post", state, {
            onSuccess: () => {
                toast.success("Admin was created successfully");
                toggleLoading();
                router.push("/admin/staff")
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (response) => {
                toast.error(response.response.data.log)
                toggleLoading();
                reset();
            }
        })
    }


    return (
        <main className="mx-auto p-2 md:p-4 xl:p-6 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] 2xl:w-[70%] xl:w-[75%]">
            <form onSubmit={onSubmit} className="flex flex-col gap-y-5">
                <Input type="text" value={state.email} label="Email Address" id="email" name="email" onChange={handleChange} />
                <Input type="text" value={state.encryptedPassword} label="Password" id="encryptedPassword" name="encryptedPassword" onChange={handleChange} />
                {state.encryptedPassword.length <= 6 && <p className="text-[10px] text-red-600 md:text-xs xl:text-sm">Password must be more than 6 Characters</p>}
                <div className="flex items-center gap-x-2">
                    <input className="size-5 accent-cyanGreen" type="checkbox" name="suspended" id="suspended" checked={state?.suspended} onChange={handleChange} />
                    <label htmlFor="suspended" className="cursor-pointer">Suspended</label>
                </div>
                <select name="role" id="role" value={state.role || "admin"} onChange={handleChange} className="bg-inherit px-2 xl:px-4 py-3 border border-[#716A7C] focus:border-0 rounded-lg focus:outline focus:outline-primaryPurple duration-300">
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                </select>
                <Button type="submit" text="Create Admin" loading={loading} disabled={loading} />
            </form>
        </main>
    );
}

export default StaffForm;