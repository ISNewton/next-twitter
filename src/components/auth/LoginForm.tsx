import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextInput from "../base/TextInput";
import { z } from "zod";
import client from "@/libs/client";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { ServerValidationErrors } from "@/types/validation";
import { signIn } from "next-auth/react";
import Error from "next/error";
import { useRouter } from "next/router";

export default function LoginForm() {
    const router = useRouter()
    const [formErrors, setFormErrors] = useState<
        ServerValidationErrors<"username" | "password">[]
    >([]);
    const mutation = useMutation({
        mutationFn: async (data: typeof initValues) => {
            try {
                const response = await signIn('credentials' , {
                    username:data.username,
                    password:data.password,
                    redirect:false
                })
                if(response?.status == 200) {
                    router.push('/')
                }
                if(response?.status == 401) {
                    setFormErrors([{
                        field:'username',
                        errors:[response.error ?? '']
                    }]);
                }

                else if(response?.status == 400) {
                    setFormErrors([{
                        field:'username',
                        errors:[response.error ?? '']
                    }]);
                }
                else {
                    console.log(response)
                }
            } catch (e) {
                console.log('lgon error' , e)
            }
        },
    });
    const initValues = {
        username: "",
        password: "",
    };

    const loginFormSchema = z.object({
        username: z.string().min(3),
        password: z.string().min(8),
    });

    type LoginFormType = {
        username: string;
        password: string;
    };

    function getServerValidationErrors(field: string): string {
        const errorsArray = formErrors.find((e) => e.field === field);
        if (errorsArray?.field) {
            return errorsArray.errors[0];
        }
        return "";
    }

    async function login(data: LoginFormType) {
        await mutation.mutateAsync(data);
    }
    return (
        <>
            <Formik
                initialValues={initValues}
                validationSchema={toFormikValidationSchema(loginFormSchema)}
                onSubmit={login}
            >
                {(form) => (
                    <Form>
                        <TextInput
                            name="username"
                            className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                            placeholder="Twitter Username"
                            type="text"
                            onChange={form.handleChange}
                            value={form.values.username}
                            error={form.errors.username || getServerValidationErrors('username')}
                            touched={form.touched.username}
                        />

                        <TextInput
                            name="password"
                            className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                            placeholder="Password"
                            type="password"
                            onChange={form.handleChange}
                            value={form.values.password || getServerValidationErrors('password')}
                            error={form.errors.password}
                            touched={form.touched.password}
                        />

                        <button
                            type="submit"
                            className="btn btn-light w-full rounded-full mt-4"
                        >
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
