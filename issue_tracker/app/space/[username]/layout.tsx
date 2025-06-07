import Navbar from "@/components/Navbar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div className="max-w-[1000px] mx-auto">
            <Navbar/>
            {children}            
        </div>
    )
}