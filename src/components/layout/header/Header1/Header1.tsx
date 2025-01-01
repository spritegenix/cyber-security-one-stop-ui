import Wrapper from "@/components/elements/Wrappers";
import Logo from "@/components/elements/Logo";
import { IoSearchOutline } from "react-icons/io5";
import Menu from "../Menu";
import MenuMobile from "../MenuMobile";
import Button from "@/components/elements/Button";
import Link from "next/link";
import AuthButton from "./AuthButton";
export default function Header1({
  show,
  handleMobileMenu,
  isMobileMenuOpen,
  upperNavItems,
  lowerNavItems,
  activeItemId,
  handleNavItemClick,
  handleSearchModal,
  handleSidebar,
}: any) {
  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-gray-300 bg-white transition-transform duration-300 md:h-20 ${show}`}
    >
      {/* Desktop Section */}
      {/* Upper Nav  */}
      <Wrapper className="flex w-full items-center justify-between py-2 max-md:hidden">
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-2 md:gap-4">
          <button className="text-xl duration-300 hover:text-bg1" onClick={handleSearchModal}>
            <IoSearchOutline />
          </button>
          <ul className="hidden items-center gap-x-5 font-medium text-blue-900 md:flex">
            <Menu
              navItemsArray={upperNavItems}
              activeItemId={activeItemId}
              onItemClick={handleNavItemClick}
            />
          </ul>
          <AuthButton handleSidebar={handleSidebar} />
        </div>
      </Wrapper>
      {/* Lower Nav  */}
      <Wrapper
        bgColor="bg-white"
        containerClassName="border-t border-gray-300"
        className="max-md:hidden"
      >
        <ul className="hidden items-center justify-between gap-x-5 font-medium text-zinc-800 md:flex">
          <Menu
            navItemsArray={lowerNavItems}
            activeItemId={activeItemId}
            onItemClick={handleNavItemClick}
          />
        </ul>
      </Wrapper>
      {/* -------------------------------------  */}
      {/* Mobile Section */}
      <Wrapper className="flex w-full items-center justify-between gap-1 py-2 md:hidden">
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-x-2">
          {/* Search Icon  */}
          <button className="text-3xl duration-300 hover:text-bg1" onClick={handleSearchModal}>
            <IoSearchOutline />
          </button>
          <AuthButton handleSidebar={handleSidebar} />
          {/* HamMenu Icon  */}
          <HamIcon isMobileMenuOpen={isMobileMenuOpen} handleMobileMenu={handleMobileMenu} />
        </div>
      </Wrapper>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-20 w-full md:hidden">
          <MenuMobile
            navItemsArray={upperNavItems}
            setIsMobileMenuOpen={handleMobileMenu}
            activeItemId={activeItemId}
          />
          <MenuMobile
            navItemsArray={lowerNavItems}
            setIsMobileMenuOpen={handleMobileMenu}
            activeItemId={activeItemId}
          />
        </div>
      )}
    </header>
  );
}

function HamIcon({ isMobileMenuOpen, handleMobileMenu }: any) {
  return (
    <button
      className={`navbar-toggle-btn ${isMobileMenuOpen ? "open" : ""}`}
      type="button"
      onClick={handleMobileMenu}
    >
      <span />
      <span />
      <span />
      <span />
    </button>
  );
}
