import { useEffect, useState } from "react";

export default function AsyncButton({ className, mainAction, content, loadingContent, type = "button" }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => setLoading(false);
    }, []);

    async function handleMainAction() {
        setLoading(true);
        await mainAction();
        setLoading(false);
    }

    return (
        <button className={className} type={type} onClick={handleMainAction} disabled={loading}>
            {loading ? loadingContent : content}
        </button>
    );
}
