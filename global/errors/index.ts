//Next
import Router from "next/router";

export default function errors ( message: string) {
    switch (message) {
        case "Token is missing": Router.push("/");
        case "Token is invalid or expired": Router.push("/login");
    }
} 