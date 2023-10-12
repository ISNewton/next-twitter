import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextInput from "../base/TextInput";
import { z } from "zod";
import client from '@/libs/client'

export default function LoginForm() {
    const initValues = {
        username: "",
        password: "",
    };

    const loginFormSchema = z
        .object({
            username: z.string().min(3),
            password: z.string().min(8),
        })

    type LoginFormType = {
        username: string;
        password: string;
    };

    async function login(data: LoginFormType) {
        const res = await client.post("login", data);
        console.log(res);
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

                        <button type="submit" className="btn btn-light w-full rounded-full mt-4">
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
