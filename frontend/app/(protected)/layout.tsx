import RightPanel from "@/components/common/RightPanel";
import Sidebar from "@/components/common/Sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <aside>
        <Sidebar />
      </aside>
      <section className="max-w-7xl mx-auto h-full flex-1 ">{children}</section>
      <aside>
        <RightPanel />
      </aside>
    </div>
  );
}
