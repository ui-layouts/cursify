export interface SubCategory {
     id: string;
     title: string;
     description?: string;
     component: React.ComponentType;
   }
   
   export interface Category {
     id: string;
     title: string;
     icon?: React.ComponentType;
     subcategories: SubCategory[];
   }