import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./destroy.css"

export default function Loading() {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <>
            {promiseInProgress  &&

                <div id="allLoading">
                    <div id="container">
                    </div>
                </div>
            }

        </>
    )
}
