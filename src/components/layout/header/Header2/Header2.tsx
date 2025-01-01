"use client";
import Wrapper from "@/components/elements/Wrappers";
import Logo from "@/components/elements/Logo";
import Menu from "../Menu";
import AuthButton from "./AuthButton";
import Button from "@/components/elements/Button";
import useAuthStore from "@/zustandStore/authStore";
import { useRouter } from "next/navigation";
export default function Header2({
  show,
  handleMobileMenu,
  isMobileMenuOpen,
  upperNavItems,
  activeItemId,
  handleNavItemClick,
  handleSearchModal,
}: any) {
  const isLogin = useAuthStore((state) => state?.firmToken);
  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-gray-300 bg-white transition-transform duration-300 ${show}`}
    >
      {/* Desktop Section */}
      {/* Upper Nav  */}
      <Wrapper className="flex w-full items-center justify-between max-md:hidden">
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-3 md:gap-4">
          <ul className="hidden items-center gap-x-5 font-medium text-blue-900 md:flex">
            <Menu
              navItemsArray={upperNavItems}
              activeItemId={activeItemId}
              onItemClick={handleNavItemClick}
            />
          </ul>
          <AuthButton />
          {isLogin && <LogoutButton />}
        </div>
      </Wrapper>
      {/* -------------------------------------  */}
      {/* Mobile Section */}
      <Wrapper className="flex w-full items-center justify-between gap-3 py-2 md:hidden">
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-x-4">
          <AuthButton />
          {isLogin && <LogoutButton />}
        </div>
      </Wrapper>
    </header>
  );
}

function LogoutButton() {
  const router = useRouter();
  const { clearFirmTokens } = useAuthStore();
  return (
    <Button
      onClick={() => {
        clearFirmTokens();
        router.push("/listing-login");
      }}
    >
      Logout
    </Button>
  );
}
