import Head from "next/head";

const MyLayout = ({loading, title, leftContent, rightContent}) => (
  <main className="bg-gray-300">
    <Head><title>{title}</title></Head>
    <div className="grid grid-cols-3 gap-3">
    <div className="bg-white col-span-2 sm:col-span-3">
      {leftContent}
    </div>
    <div className="bg-white col-span-1">
      {rightContent}
    </div>
    </div>
  </main>
)

export default MyLayout