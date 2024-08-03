import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToastify = () => {
    const notify = (message, options = {}) => {
        toast(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            ...options
        });
    };

    const success = (message, options = {}) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            ...options
        });
    };

    const warning = (message, options = {}) => {
        toast.warn(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            ...options
        });
    };

    const error = (message, options = {}) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            ...options
        });
    };

    return { notify, success, warning, error };
};

export default useToastify;