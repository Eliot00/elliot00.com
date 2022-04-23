import Header from '@/components/Header'
import Footer from '@/components/Footer'

const MyLayout: React.FC = ({ children }) => (
  <>
    <Header />
    <main className="container mx-auto flex flex-col items-center p-4 sm:px-6 md:px-8 lg:px-0">
      {children}
    </main>
    <Footer />
  </>
)

export default MyLayout
