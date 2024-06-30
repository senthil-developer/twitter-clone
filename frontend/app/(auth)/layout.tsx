export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="h-[100vh] w-full mx-auto">{children}</div>
}
