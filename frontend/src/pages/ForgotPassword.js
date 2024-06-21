import { useState } from "react";
import { toast } from "react-toastify";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = process.env.REACT_APP_BACKEND_URL + "/api/forgotPassword";
        try {
            const res = await fetch(url,{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: email }),
          });
            if (res.data.success) {
                toast.success(res.data.message, {
                    autoClose: 5000,
                    position: "top-right",
                });
            } else {
                toast.error(res.data.message, {
                    autoClose: 5000,
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error("An error occurred while sending the email", {
                autoClose: 5000,
                position: "top-right",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div className="py-8">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div className="mx-auto">
                        <svg className="h-12 w-12 text-blue-500" /* LockOutlinedIcon equivalent */></svg>
                    </div>
                    <h1 className="text-center text-2xl font-semibold py-4">Forgot Password</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
