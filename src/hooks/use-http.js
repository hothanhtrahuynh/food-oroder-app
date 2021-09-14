import { useState, useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);

    const fetchData = useCallback(async(requestConfig, applyData) => {

        setError(null);
        setIsLoading(true);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                header: requestConfig.headers ? requestConfig.headers : {}
            })

            if (!response.ok) {
                throw new Error('Something went wrong - Request failed');
            }

            const data = await response.json();

            applyData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!s');
        }
        setIsLoading(false);
        setIsDone(!error && !isLoading);

    }, [])

    return {
        error,
        isLoading,
        isDone,
        fetchData
    }
};
export default useHttp;