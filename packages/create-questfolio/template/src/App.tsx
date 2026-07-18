import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  AboutPage,
  AchievementsPage,
  HomePage,
  NotFoundPage,
  PortfolioProvider,
  PostDetailPage,
  PostsPage,
  ProjectDetailPage,
  ProjectsPage,
  RootLayout,
  SkillsPage,
  ThemeModeProvider,
  TimelinePage,
} from 'questfolio';
import type { NavigationConfig, Profile, SkillCatalog, ThemeConfig } from 'questfolio';
import profileData from '../config/profile.json';
import themeDarkData from '../config/theme.dark.json';
import themeLightData from '../config/theme.light.json';
import navigationData from '../config/navigation.json';
import skillsData from '../config/skills.json';
import { achievements, posts, projects, timelineEntries } from './content';

const profile = profileData as Profile;
const themeDark = themeDarkData as ThemeConfig;
const themeLight = themeLightData as ThemeConfig;
const navigation = navigationData as NavigationConfig;
const skillCatalog = skillsData as SkillCatalog;

export function App() {
  return (
    <ThemeModeProvider light={themeLight} dark={themeDark}>
      <PortfolioProvider
        projects={projects}
        achievements={achievements}
        posts={posts}
        timelineEntries={timelineEntries}
        profile={profile}
        navigation={navigation}
        skillCatalog={skillCatalog}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetailPage />} />
              <Route path="posts" element={<PostsPage />} />
              <Route path="posts/:slug" element={<PostDetailPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="timeline" element={<TimelinePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeModeProvider>
  );
}
