import { Outlet, Link } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">My Dashboard</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard/banner" className="block py-2 px-3 rounded hover:bg-gray-700">Banner</Link>
          <Link to="/dashboard/about" className="block py-2 px-3 rounded hover:bg-gray-700">About</Link>
          <Link to="/dashboard/skills" className="block py-2 px-3 rounded hover:bg-gray-700">Skills</Link>
          <Link to="/dashboard/experience" className="block py-2 px-3 rounded hover:bg-gray-700">Experiences</Link>
          <Link to="/dashboard/project" className="block py-2 px-3 rounded hover:bg-gray-700">Projects</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Dynamic content from routes */}
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
