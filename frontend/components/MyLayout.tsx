import Head from "next/head";

const MyLayout = ({loading, title, leftContent, rightContent}) => (
  <main className="flex flex-col justify-center mt-2">
    <Head><title>{title}</title></Head>
    <div className="grid grid-cols-12 gap-3">
      <div className="bg-white col-span-12 md:col-span-8 lg:col-start-2 rounded">
        {leftContent}
      </div>
      <div className="hidden md:block md:col-span-4 lg:col-span-2">
        {rightContent}
      </div>
    </div>
  </main>
)

export default MyLayout