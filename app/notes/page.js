import PageContent from "@/app/components/PageContent";
import Header from "@/app/components/Header";
import { cookies } from "next/headers"


export default async function Home() {

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <h1>TaskMate</h1>
      </main>
    </>
  );

}