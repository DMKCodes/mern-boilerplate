import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from '../features/authApiSlice';
import usePersist from '../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectToken } from '../features/userSlice';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (!effectRan.current || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                    setTrueSuccess(true);
                } catch (error) {
                    console.log(error);
                }
            }

            if (!token && persist) verifyRefreshToken();
        }

        return () => effectRan.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let content;

    if (!persist) {
        console.log('no persist');
        content = <Outlet />;
    } else if (isLoading) {
        console.log('loading');
        content = <p>Loading...</p>;
    } else if (isError) {
        console.log(error);
        content = (
            <p>Error refreshing your details.  Please refresh or try logging in again.</p>
        );
    } else if (isSuccess && trueSuccess) {
        console.log('persist success');
        content = <Outlet />;
    } else if (token && isUninitialized) {
        console.log('uninit but token');
        content = <Outlet />;
    }

    return content;
};

export default PersistLogin;