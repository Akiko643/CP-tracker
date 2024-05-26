'use server'

import { redirect } from "next/navigation"

export const navigateToProblem = async ({problemId} : {problemId:string}) => {
  redirect(`problems/${problemId}`)
}