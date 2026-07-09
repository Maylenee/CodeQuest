import { Home, BookOpen, Trophy, Flag, Store, User, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { CodeTag } from "../ui/CodeTag";
import "./Sidebar.css";

const navItems = [
  { id: "home", icon: Home, label: "Beranda" },
  { id: "alphabet", icon: BookOpen, label: "Huruf" },
  { id: "leaderboard", icon: Trophy, label: "Papan Skor" },
  { id: "missions", icon: Flag, label: "Misi" },
  { id: "shop", icon: Store, label: "Toko" },
  { id: "profile", icon: User, label: "Profil" },
  { id: "more", icon: MoreHorizontal, label: "Lainnya" },
];

export function Sidebar({
  collapsed,
  onToggle,
  activeSection,
  onNavClick,
}: {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onNavClick: (id: string) => void;
}) {
  return (
    <div className={"sidebar " + (collapsed ? "sidebar--collapsed" : "sidebar--expanded")}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <CodeTag size={24} />
        </div>
        {!collapsed && <span className="sidebar-logo-text">CodeQuest</span>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <div key={item.id} className="sidebar-nav-item">
              {isActive && <div className="sidebar-nav-active-indicator" />}
              <button
                className={"sidebar-nav-btn " + (isActive ? "sidebar-nav-btn--active" : "sidebar-nav-btn--inactive")}
                onClick={() => onNavClick(item.id)}
              >
                <Icon />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-toggle-area">
        <button onClick={onToggle} className="sidebar-toggle-btn">
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
    </div>
  );
}
