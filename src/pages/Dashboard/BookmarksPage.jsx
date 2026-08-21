import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountLayout from "../../components/AccountLayout";
import { fetchBookmarks } from "../../lib/api";
import { LangLogo } from "../../components/icons";

function BookmarkOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-14 h-14 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 3h12v18l-6-4-6 4V3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BookmarksPage() {
  const [userId] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codelearn_user") || "null")?.id || null;
    } catch {
      return null;
    }
  });
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let alive = true;
    fetchBookmarks(userId)
      .then((d) => alive && setBookmarks(d.bookmarks || []))
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [userId]);

  return (
    <AccountLayout active="Bookmarks">
      <div>
        <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[22px] font-bold text-slate-900 mb-1">Bookmarks</h1>
            <p className="text-[14px] text-slate-600">
              Access your favorite CodeLearn learning resources in one place.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg border border-slate-200 py-20 flex items-center justify-center text-slate-400">
            Loading…
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 py-20 flex flex-col items-center justify-center text-center">
            <BookmarkOutlineIcon />
            <p className="text-[18px] font-semibold text-slate-800 mt-4">No bookmarks found</p>
            <p className="text-[14px] text-slate-500 mt-1">
              Click the bookmark icon in tutorials to save your favorite tutorials.{" "}
              <Link to="/learn" className="text-green-600 underline font-medium">
                Start learning by clicking here!
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
            {bookmarks.map((b) => (
              <div key={b.id} className="flex items-center gap-4 px-4 py-3">
                <LangLogo name={b.trackName || "Code"} className="w-10 h-10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-slate-400">
                    {b.trackName || "Resource"}
                  </p>
                  <p className="text-[15px] font-semibold text-slate-900 truncate">
                    {b.title}
                  </p>
                </div>
                {b.trackSlug && (
                  <Link
                    to={`/learn/${b.trackSlug}`}
                    className="text-green-600 text-[13px] font-semibold hover:underline whitespace-nowrap"
                  >
                    Open
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
