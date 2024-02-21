import styled from "styled-components"
import logo512 from "../../logo512.png"

export const DummyRequestNotification = () => {
    const handleClickBtn = () => {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                // 30秒ごとに通知を送る
                setTimeout(() => {
                    const today: Date = new Date();
                    const year: number = today.getFullYear();
                    const month: number = today.getMonth();
                    const date: number = today.getDate();
                    const hour: number = today.getHours();
                    const minute: number = today.getMinutes();
                    const second: number = today.getSeconds();
                    const milliSecond: number = today.getMilliseconds();
                    const now: string = `${year}/${month}/${date} ${hour}：${minute}：${second}：${milliSecond}`;
    
                    const titile = "GREETING"
    
                    const messages: string[] = [
                        "Hello World!",
                        "こんにちは！",
                        "Hello PWA!"
                    ]
    
                    const indexNumber: number = Math.floor(Math.random() * messages.length);
    
                    const bodyMessage: string = `
                    現在日時：${now}\n${messages[indexNumber]}
                    `
    
                    const options = {
                        body: bodyMessage,
                        icon: logo512
                    }
    
                    return new Notification(titile, options);
                }, 30000)
            }
        })
    }

    return (
        <Wrapper>
            <button id="requestNotificationBtn" onClick={() => handleClickBtn()}>通知の確認</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 1.5rem 0;
`