import RightPanel from '@/components/common/RightPanel'
import Sidebar from '@/components/common/Sidebar'

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex dark:bg-black dark:text-white bg-white text-black ">
      <aside className="sticky top-0 left-0 max-h-screen">
        <Sidebar />
      </aside>
      <section className="max-w-7xl mx-auto h-full flex-1 ">{children}</section>
      <aside className="fixed">
        <RightPanel />
      </aside>
    </div>
  )
}
