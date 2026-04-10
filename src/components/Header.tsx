import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, ArrowUpRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Achados", href: "/#products" },
  { name: "Categorias", href: "/#categories" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminPage = location.pathname === "/admin";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 sm:px-6 lg:px-10",
        isScrolled ? "top-2" : "top-0"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[2000px] transition-all duration-500 rounded-none border border-border shadow-sm",
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-primary/20 scale-[0.98] px-6 py-2" 
            : "bg-background px-6 py-3"
        )}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center transition-transform hover:scale-105">
            <Logo className="scale-75 origin-left" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <div className="h-4 w-[1px] bg-border mx-2" />
            
            {!isAdminPage && (
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 rounded-none">
                  Admin
                </Button>
              </Link>
            )}

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-none font-bold text-xs uppercase tracking-tighter">
              Ver Achados Wiiki <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-4">
             <Button className="bg-primary hover:bg-primary/90 text-primary-foreground size-9 p-0 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="h-4 w-4" />
             </Button>
             
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="group">
                  <Menu className="h-6 w-6 transition-transform group-hover:scale-110" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-2 border-primary bg-background p-0">
                <SheetHeader className="p-6 border-b border-border">
                   <SheetTitle className="text-left">
                      <Logo className="scale-75 origin-left" />
                   </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-0">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="px-8 py-6 text-xl font-bold border-b border-border hover:bg-primary/5 transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                  {!isAdminPage && (
                    <Link
                      to="/admin"
                      className="px-8 py-6 text-xl font-bold border-b border-border hover:bg-primary/5 transition-colors flex items-center justify-between group text-muted-foreground"
                    >
                      Painel Admin
                      <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  )}
                </nav>
                <div className="p-8 mt-auto">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                       Explorar Wiiki_Produtos_
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
