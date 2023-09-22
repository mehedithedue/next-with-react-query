"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

function Login() {
    // State declare
    const [email, setEmail] = useState<string>('');
    const [githubRepoUrl, setGithubRepoUrl] = useState<string>('');

    console.log(process.env.API_URL);

    // React Query 
    const queryClient = useQueryClient();

    const loginAction = async (data: { email: string; githubRepoUrl: string }) => {
        const { data: response } = await axios.post(process.env.API_URL || "", data)
        return response.data;
    };

    const submitFormMutation = useMutation(loginAction, {
        onSuccess: () => {
            setEmail('');
            setGithubRepoUrl('');
        },
        onError: (error: Error) => {
            console.log(error);
        }
    });

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ToDo:: any other validation on business logic
        
        await submitFormMutation.mutateAsync({ email, githubRepoUrl });
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md border-2">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="githubRepoUrl" className="block text-gray-700">GitHub Repo:</label>
                    <input
                        type="text"
                        id="githubRepoUrl"
                        value={githubRepoUrl}
                        onChange={(e) => setGithubRepoUrl(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded shadow-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
                        disabled={submitFormMutation.isLoading} // Disable the button during submission
                    >
                        {submitFormMutation.isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>

                {submitFormMutation.isSuccess && (
                    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                        <p className="text-sm">Form Submitted Successfully .</p>
                    </div>
                )}

            </form>

        </div>
    );
}

export default Login;