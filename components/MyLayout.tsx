import Header from "./Header"
import Footer from "./Footer"

const MyLayout = ({children}) => (
  <>
    <Header />
    <main className="max-w-screen-lg mx-auto flex flex-col items-center p-4 sm:px-6 md:px-8 lg:px-0">
      {children}
    </main>
    <Footer />
  </>
)

export default MyLayout
