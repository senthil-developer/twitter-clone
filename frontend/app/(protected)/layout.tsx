import RightPanel from '@/components/common/RightPanel'
import Sidebar from '@/components/common/Sidebar'

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex dark:bg-black dark:text-white bg-white text-black max-w-7xl  mx-auto">
      <aside className="sticky top-0 left-0 max-h-screen">
        <Sidebar />
      </aside>
      <section className="h-full flex-1 ">{children}</section>
      <aside>
        <RightPanel />
      </aside>
    </div>
  )
}
