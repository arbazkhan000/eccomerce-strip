import React from "react";

const ErrorPage = () => {
    return (
        <div className="h-[90vh] w-full flex items-center  justify-between">
            <div className="w-full  flex items-center justify-center flex-col ">
                <h1 className="text-4xl py-2">OPS Page Not Found</h1>
                <h2 className="text-4xl text-red-500">404 !</h2>
            </div>
        </div>
    );
};

export default ErrorPage;
