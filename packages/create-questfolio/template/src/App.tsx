import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './site/Layout';
import { HomePage } from './site/HomePage';
import { ProjectsPage } from './site/ProjectsPage';
import { ProjectPage } from './site/ProjectPage';
import { NotFoundPage } from './site/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
