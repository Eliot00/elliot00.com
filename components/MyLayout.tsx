import Header from "./Header"
import Footer from "./Footer"

const MyLayout = ({children}) => (
  <>
    <Header />
    <main className="grid grid-cols-1 lg:grid-cols-6">
      <div className="mt-2 lg:col-start-2 lg:col-span-4">
        {children}
      </div>
    </main>
    <Footer />
  </>
)

export default MyLayout