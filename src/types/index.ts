export interface DiscoverCard {
  title: string;
  description: string;
  link: string;
  background: string;
  items: CardItem[];
}

export interface CardItem {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export interface CardContent {
  title: string;
  background: string;
  text: string;
  multiText: string[];
  enterLink?: string;
  learnLink?: string;
}

export interface NavbarItem {
  name: string;
  hasChildren: boolean;
  path?: string;
  children: MenuChild[];
}

interface MenuChild {
  name: string;
  path: string;
}
