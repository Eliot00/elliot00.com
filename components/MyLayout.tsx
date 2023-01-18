import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FCWithChildren } from '@/lib/types'

const MyLayout: FCWithChildren = ({ children }) => (
  <>
    <Header />
    <main className="max-w-3xl mx-auto p-4 sm:px-6 md:px-8 lg:px-0">
      {children}
    </main>
    <Footer />
  </>
)

export default MyLayout
