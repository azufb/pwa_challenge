import React, { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState<number>(0);

    // 加算
    const increment = (): void => {
        setCount((prev) => prev + 1);
    }

    // 減算
    const decrement = (): void => {
        setCount((prev) => prev - 1);
    }

    return (
        <div>
            <h2>Counter</h2>
            <div>
                <button onClick={() => increment()}>+</button>
                <span>{count}</span>
                <button onClick={() => decrement()}>-</button>
            </div>
        </div>
    )
}