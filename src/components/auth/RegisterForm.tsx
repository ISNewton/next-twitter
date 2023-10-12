export default function RegisterForm() {
    return (
        <>
            <input
                className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                placeholder="Full name"
                type="text"
            />

            <input
                className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                placeholder="Email"
                type="email"
            />

            <input
                className="w-full p-2 bg-gray-900 rounded-md text-white  border border-gray-700 focus:border-blue-700"
                placeholder="Twitter Username"
                type="text"
            />

            <input
                className="w-full p-2 bg-gray-900 text-white rounded-md border border-gray-700 "
                placeholder="Password "
                type="password"
            />

            <input
                className="w-full p-2 bg-gray-900 text-white rounded-md border border-gray-700 "
                placeholder="Confirm Password "
                type="password"
            />

        </>
    )
}
