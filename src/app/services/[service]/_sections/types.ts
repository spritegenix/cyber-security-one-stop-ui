export interface FilterProps {
    verify?: boolean;
    rating?: number;
    sortBy?: "alphabetical" | "rating" | "experience";
    order?: "asc" | "desc";
    page?: number;
}