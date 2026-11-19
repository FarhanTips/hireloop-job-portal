

import { Suspense } from "react";
import SignInPageSecond from "./signInPage";


export default function LogInPage() {
    return (
        <Suspense fallback={<div>Loading login page...</div>}>
            <SignInPageSecond></SignInPageSecond>
        </Suspense>
    );
}
