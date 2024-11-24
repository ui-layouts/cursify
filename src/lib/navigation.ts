import { CATEGORIES } from "@/constants/sidebarOptions";

export const formatPath = (categoryId: string, subcategoryId: string) =>
  `/${categoryId}/${subcategoryId}`;

export const findComponentByPath = (
  pathname: string
): React.ComponentType | null => {
  const [categoryId, subcategoryId] = pathname.split("/").filter(Boolean);

  const category = CATEGORIES.find((cat) => cat.id === categoryId);
  const subcategory = category?.subcategories.find(
    (sub) => sub.id === subcategoryId
  );

  return subcategory?.component || null;
};
