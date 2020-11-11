import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:4000";


export default function Index(props) {
    useEffect(() => {
        const socket = io(ENDPOINT);
        // fetch(ENDPOINT + '/listings', {
        //     method: "GET"
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //     })
    })

    return (
        <div>
            hello
        </div>
    )
}