import Header from "./Header"
import Footer from "./Footer"

const MyLayout = ({children}) => (
  <>
    <Header />
    <main className="flex flex-col justify-center">
      <div className="mt-2 max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8">
        {children}
      </div>
    </main>
    <Footer />
  </>
)

export default MyLayout