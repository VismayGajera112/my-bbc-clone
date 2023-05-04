import React, { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    return (
        <div className="text-2xl">
            {formattedTime}
        </div>
    );
};

export default Clock;
