import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-between p-24 bg-white" style={{ height: "100vh" }}>
      <div className="pb-4 flex w-full justify-center items-center">
        <img className="pe-4" src="/assets/images/smart_tv.png" alt="" />
        <h1 className="ps-4 text-5xl font-black">Gtr TV</h1>
      </div>
      <div className="flex w-full h-full">
        <Link href="/watch/all" className="w-full lg:w-1/2 2xl:w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none 2xl:rounded-lg h-full grayBackground hover:bg-neutral-700 flex items-center justify-center font-bold text-2xl">Regarder</Link>
        <a href="/search" className="hidden lg:flex 2xl:hidden w-1/2 rounded-r-lg h-full bg-neutral-300 hover:bg-neutral-400 flex items-center justify-center font-bold text-2xl">Ajouter</a>
      </div>
    </main>
  )
}
