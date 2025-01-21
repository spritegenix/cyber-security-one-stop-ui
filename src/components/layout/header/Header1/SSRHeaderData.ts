import { fetchCategoriesSSR } from "@/app/_queryCall/ssr";
import { ArrayConvertor } from "@/utils/Convertor";



export async function LowerNavData() {
    const categories = await fetchCategoriesSSR();
    return ArrayConvertor(categories?.allCategories);
}