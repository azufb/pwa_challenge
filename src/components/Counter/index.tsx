import React, { useState } from "react";
import styled from "styled-components";

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
        <Wrapper>
            <h2>Counter</h2>
            <div>
                <button onClick={() => increment()}>+</button>
                <Count>{count}</Count>
                <button onClick={() => decrement()}>-</button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: white;
`

const Count = styled.span`
    padding: 0 1rem;
`