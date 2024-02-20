import styled from "styled-components"
import { register } from "../../serviceWorkerRegistration"

export const DummyRequestNotification = () => {
    const handleClickBtn = () => {
        console.log("navigator2", navigator)
        if ('service-worker' in navigator) {
            console.log("click!!");
            navigator.serviceWorker.register("../../service-worker.ts", { scope: "/" })
            .then((registration) => {
              console.log("Service Worker is registered!");
            })
            navigator.serviceWorker.ready.then((registration) => {
              console.log("Service Worker is ready!!");
            })
        } else {
            console.log("aaa")
        }
    }

    return (
        <div>
            <button id="requestNotificationBtn" onClick={() => handleClickBtn()}>通知の確認</button>
        </div>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`