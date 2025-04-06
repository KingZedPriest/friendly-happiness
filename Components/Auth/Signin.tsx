"use client"

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

//Types and Utils
import { emailAuthSchema, EmailAuth } from "@/schemas/auth.schema";
import { makeApiRequest } from "@/lib/apiUtils";
import { disableEnterKey } from "@/utils/formutils";

//Components
import ZodInput from "../ui/ZodInput";
import Button from "../ui/Button";
import ErrorText from "./ErrorText";


//Icons
import { Android, Lock, Unlock } from "iconsax-react";

const Signin = () => {

    const router = useRouter();
    const [seePassword, setSeePassword] = useState<boolean>(false);

    //Toggle See Password
    const toggleShowPassword = () => {
        setSeePassword((prev) => !prev);
    }

    // Data validation
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EmailAuth>({
        resolver: zodResolver(emailAuthSchema),
    });


    // OnSubmit function
    const onSubmit: SubmitHandler<EmailAuth> = async (data) => {

        const formData = { ...data };

        await makeApiRequest("/login", "post", formData, {
            onSuccess: () => {
                toast.success("Welcome Back");
                reset();
                router.push("/admin/dashboard")
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(error.response.data)
                reset();
            }
        });
    }


    return (
        <main className="bg-darkBlack p-4 sm:p-6 md:p-8 xl:p-10 rounded-3xl">
            <div className="place-content-center grid bg-primaryPurple mx-auto rounded-[50%] size-12">
                <Android className="text-lightGray" size={28} />
            </div>
            <form onKeyDown={disableEnterKey} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 mt-6 w-[17rem] sm:w-[22rem] md:w-[24rem] lg:w-[28rem] 2xl:w-[34rem] xl:w-[32rem]">
                <div className="flex flex-col">
                    <ZodInput type="email" placeholder="Enter your email address" id="email" name="email" register={register} required={true} label="Email" />
                    {errors.email && <ErrorText message={errors.email.message as string} />}
                </div>
                <div className="relative">
                    <div>
                        <ZodInput type={seePassword ? "text" : "password"} placeholder="Enter your password" id="password" name="password" register={register} required={true} label="Password" />
                        {errors.password && <ErrorText message={errors.password.message as string} />}
                    </div>
                    <div className="top-[1.85rem] md:top-[2.1rem] xl:top-[2.35rem] right-2 absolute bg-softPurple p-1 md:p-1.5 xl:p-2 rounded-md cursor-pointer" onClick={toggleShowPassword}>
                        {seePassword ? <Lock color="#000" size={20} /> : <Unlock color="#000" size={20} />}
                    </div>
                </div>
                <Button type="submit" text="Login" loading={isSubmitting} />
            </form>
        </main>
    );
}

export default Signin;