import { Field, Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextInput from "../base/TextInput";
import { useMutation, useQuery } from "react-query";
import client from "@/libs/client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { ServerValidationErrors } from "@/types/validation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter()
    const initValues = {
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
    };
    const [formErrors, setFormErrors] = useState<
        ServerValidationErrors<
            "name" | "email" | "password" | "passwordConfirmation" | "usename"
        >[]
    >([]);

    const mutation = useMutation({
        mutationFn: async (data:RegisterFormType) => {
            setFormErrors([]);
            try {
                const res = await client.post("auth/signup", data);
                const signInResponse = await signIn('credentials' , {
                    username:data.username ,
                    password:data.password,
                    redirect:false
                })
                if(signInResponse?.ok) {
                    router.push('/')
                }
                return res;
            } catch (e) {
                const errors = e as AxiosError;
                setFormErrors(errors.response?.data?.message );
            }
        },
        onSuccess(data, variables, context) {
            console.log('onSuccess' , data)
        },
        onError(error, variables, context) {
            console.log(error)
        },
    });

    const registerFormSchema = z
        .object({
            name: z.string(),
            email: z.string().email(),
            username: z.string().min(3),
            password: z.string().min(8),
            passwordConfirmation: z.string().min(8),
        })
        .refine((data) => data.password === data.passwordConfirmation, {
            message: "Passwords do not match.",
            path: ["passwordConfirmation"],
        });

    type RegisterFormType = {
        name: string;
        email: string;
        username: string;
        password: string;
        passwordConfirmation: string;
    };

    function getServerValidationErrors(field: string): string {
        const errorsArray = formErrors.find((e) => e.field === field);
        if (errorsArray?.field) {
            return errorsArray.errors[0];
        }
        return "";
    }

    async function register(data: RegisterFormType) {
        await mutation.mutateAsync(data);

        console.log("registering...");
    }

    return (
        <>
            <Formik
                initialValues={initValues}
                validationSchema={toFormikValidationSchema(registerFormSchema)}
                onSubmit={register}
            >
                {(form) => (
                    <Form>
                        <TextInput
                            name="name"
                            className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                            placeholder="Full name"
                            type="text"
                            onChange={form.handleChange}
                            value={form.values.name}
                            error={form.errors.name || getServerValidationErrors("name")}
                            touched={form.touched.name}
                        />

                        <TextInput
                            name="email"
                            className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                            placeholder="Email"
                            type="email"
                            onChange={form.handleChange}
                            value={form.values.email}
                            error={form.errors.email || getServerValidationErrors("email")}
                            touched={form.touched.email}
                        />

                        <TextInput
                            name="username"
                            className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                            placeholder="Twitter Username"
                            type="text"
                            onChange={form.handleChange}
                            value={form.values.username}
                            error={
                                form.errors.username || getServerValidationErrors("username")
                            }
                            touched={form.touched.username}
                        />

                        <TextInput
                            name="password"
                            className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                            placeholder="Password"
                            type="password"
                            onChange={form.handleChange}
                            value={form.values.password}
                            error={
                                form.errors.password || getServerValidationErrors("password")
                            }
                            touched={form.touched.password}
                        />

                        <TextInput
                            name="passwordConfirmation"
                            className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                            placeholder="Confirm password"
                            type="password"
                            onChange={form.handleChange}
                            value={form.values.passwordConfirmation}
                            error={
                                form.errors.passwordConfirmation ||
                                getServerValidationErrors("passwordConfirmation")
                            }
                            touched={form.touched.passwordConfirmation}
                        />
                        <button
                            type="submit"
                            className="btn btn-light w-full rounded-full mt-4"
                            disabled={mutation.isLoading}
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
