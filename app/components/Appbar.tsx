"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function Appbar() {
    const session = useSession();

    return (
        <div className="flex justify-between items-center mx-5 py-3">
            <div className="text-lg font-bold flex flex-col justify-center text-white">
                Muzer
            </div>
            <div>
                {session.data?.user && <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-colors" onClick={() => signOut()}>SignOut</Button>}
                {!session.data?.user && <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-colors" onClick={() => signIn()}>Signin</Button>}
            </div>
        </div>
    )
}