export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline?: string;
  avatar?: string;
  bio: string;
  location?: string;
  email?: string;
  socials?: SocialLink[];
  links?: { label: string; url: string; icon?: string }[];
}
