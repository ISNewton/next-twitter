export default function LoginForm() {
    return (
        <>
            <input
                className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                placeholder="Email or Username"
                type="email"
                name="Email or Username"
                id=""
            />
            <input
                className="w-full p-2 bg-gray-900 text-white rounded-md border border-gray-700 "
                placeholder="Password "
                type="password"
                name="Password"
                id=""
            />

        </>
    )
}
