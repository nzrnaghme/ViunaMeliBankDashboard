import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./destroy.css"

export default function Loading() {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <>
            {promiseInProgress &&

                <div id="allLoading">
                    <div id="container">
                    </div>
                    <p style={{ textAlign: "center", color: "black", position: "relative", bottom: '15%' }}>لطفا صبر کنید</p>
                </div>
            }

        </>
    )
}
