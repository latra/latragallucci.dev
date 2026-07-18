export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
}

export interface NavigationConfig {
  items: NavigationItem[];
}
