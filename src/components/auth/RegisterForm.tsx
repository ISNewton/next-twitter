import { Field, Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextInput from "../base/TextInput";
import { useMutation, useQuery } from "react-query";
import client from "@/libs/client";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function RegisterForm() {
    const [formErrors, setFormErrors] = useState<object[]>([]);
    const mutation = useMutation({
        mutationFn: async (data) => {
            try {
                const res = await client.post("auth/signup");
                console.log('success')
                return res
            }
            catch (e) {
                const errors = e as AxiosError
                // console.log('error' , errors.response)
                setFormErrors((errors.response?.data?.message) as [])
                console.log(errors.response?.data?.message)

            }
            // console.log(data);

        },

    });

    const initValues = {
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
    };

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

    async function register(data: RegisterFormType) {
        await mutation.mutateAsync(data);

        console.log('registering...')
    }

    return (

        <>
            {/* { formErrors && formErrors.map(e => { */}
            {/*     return <p>{[e]}</p> */}

            {/* })} */}
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
                        error={form.errors.name}
                        touched={form.touched.name}
                    />

                    <TextInput
                        name="email"
                        className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                        placeholder="Email"
                        type="email"
                        onChange={form.handleChange}
                        value={form.values.email}
                        error={form.errors.email}
                        touched={form.touched.email}
                    />

                    <TextInput
                        name="username"
                        className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                        placeholder="Twitter Username"
                        type="text"
                        onChange={form.handleChange}
                        value={form.values.username}
                        error={form.errors.username}
                        touched={form.touched.username}
                    />

                    <TextInput
                        name="password"
                        className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                        placeholder="Password"
                        type="password"
                        onChange={form.handleChange}
                        value={form.values.password}
                        error={form.errors.password}
                        touched={form.touched.password}
                    />

                    <TextInput
                        name="passwordConfirmation"
                        className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                        placeholder="Confirm password"
                        type="password"
                        onChange={form.handleChange}
                        value={form.values.passwordConfirmation}
                        error={form.errors.passwordConfirmation}
                        touched={form.touched.passwordConfirmation}
                    />
                    <button
                        type="submit"
                        className="btn btn-light w-full rounded-full mt-4"
                    >
                        Register
                    </button>
                </Form>
                )}
            </Formik>
        </>
    );
}
