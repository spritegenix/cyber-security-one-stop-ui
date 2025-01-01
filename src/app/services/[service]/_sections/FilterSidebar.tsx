import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { loggedUser } from "@/data/global";
import { VscVerifiedFilled } from "react-icons/vsc";
import Link from "next/link";
import useAuthStore from "@/zustandStore/authStore";
import Portal from "@/components/elements/Portal";
import { FiltersList } from "@/components/elements/Filters";

export default function FilterSidebar({
  isSidebar,
  handleSidebar,
  filtersApplied,
  setFiltersApplied,
}: any) {
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" onClick={handleSidebar}>
        <div
          className="ml-auto h-full w-full overflow-y-scroll bg-black/70 transition-all duration-300 sm:w-80"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Close Button  */}
          <button
            className="absolute right-3 top-2 z-[9999999] text-2xl text-bg1 duration-300 hover:text-red-600"
            onClick={handleSidebar}
          >
            <AiOutlineCloseCircle />
          </button>
          <div className="flex w-full flex-col items-start gap-3 px-3 pt-10 md:pt-20">
            <h2 className="text-2xl font-semibold text-white">Apply Filters</h2>
            <FiltersList filtersApplied={filtersApplied} setFiltersApplied={setFiltersApplied} />
          </div>
        </div>
      </div>
    </Portal>
  );
}
