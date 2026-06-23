import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GroupSetupPage from './pages/GroupSetupPage';
import MissionsMenuPage from './pages/MissionsMenuPage';
import ActiveMissionPage from './pages/ActiveMissionPage';
import MissionSummaryPage from './pages/MissionSummaryPage';
import RefleksiPage from './pages/RefleksiPage';
import EvaluasiPage from './pages/EvaluasiPage';
import PetunjukPage from './pages/PetunjukPage';
import TeacherRecapPage from './pages/TeacherRecapPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/group-setup" element={<GroupSetupPage />} />
      <Route path="/missions" element={<MissionsMenuPage />} />
      <Route path="/mission/:categoryId" element={<ActiveMissionPage />} />
      <Route path="/mission/:categoryId/summary" element={<MissionSummaryPage />} />
      <Route path="/petunjuk" element={<PetunjukPage />} />
      <Route path="/refleksi" element={<RefleksiPage />} />
      <Route path="/evaluasi" element={<EvaluasiPage />} />
      <Route path="/teacher-recap" element={<TeacherRecapPage />} />
    </Routes>
  );
}

export default App;
