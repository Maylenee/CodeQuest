import React, { useState, useEffect } from "react";
import AccountLayout from "../../components/AccountLayout";
import { LangLogo } from "../../components/icons";
import { Search, ArrowDown } from "lucide-react";
import { fetchCertificates } from "../../lib/api";

export default function CertificatesPage() {
  const [userId] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codelearn_user") || "null")?.id || null;
    } catch {
      return null;
    }
  });
  const [certificates, setCertificates] = useState([]);
  const [exams, setExams] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    fetchCertificates(userId)
      .then((d) => {
        if (!alive) return;
        setCertificates(d.certificates || []);
        setExams(d.exams || []);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [userId]);

  const filtered = exams.filter((e) => {
    const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === "All" ||
      (status === "Earned" && e.earned) ||
      (status === "Not earned" && !e.earned);
    return matchesQuery && matchesStatus;
  });

  return (
    <AccountLayout active="Certificates">
      <div>
        <h1 className="text-[26px] font-bold text-slate-900 mb-1">Certificates</h1>
        <p className="text-[14px] text-slate-600 mb-1">
          Document your knowledge with a CodeLearn Certificate!
        </p>
        <p className="text-[14px] text-slate-600 mb-4">
          You can take certification exams in a variety of topics. The exam is online and if you
          pass, you will earn a Certificate of Completion.
        </p>

        <div className="flex items-center gap-4 mb-6">
          <button className="bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold px-5 py-2.5 rounded-md">
            Browse Exams
          </button>
          <button className="text-green-600 text-[14px] font-semibold flex items-center gap-1 hover:underline">
            <ArrowDown className="w-4 h-4" /> Get Access to All Exams
          </button>
        </div>

        {certificates.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-5 mb-5">
            <h2 className="text-[17px] font-bold text-slate-900 mb-3">Your Certificates</h2>
            <div className="space-y-2">
              {certificates.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-4 px-4 py-3 bg-green-50 border border-green-100 rounded-lg"
                >
                  <LangLogo name={c.trackName || "Code"} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-slate-400">Certificate</p>
                    <p className="text-[15px] font-semibold text-slate-900">{c.trackName}</p>
                  </div>
                  <span className="text-[12px] text-slate-500 whitespace-nowrap">
                    {c.quizScore != null ? `${c.quizScore}%` : ""} ·{" "}
                    {c.issuedAt ? new Date(c.issuedAt).toLocaleDateString() : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg border border-slate-200">
          <div className="flex flex-wrap items-center gap-3 px-4 pt-3 pb-2 border-b border-slate-100">
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[13px] text-slate-500">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-[13px] border border-slate-200 rounded-md px-2 py-1 text-slate-600"
              >
                <option>All</option>
                <option>Earned</option>
                <option>Not earned</option>
              </select>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter by name..."
                  className="text-[13px] border border-slate-200 rounded-md pl-8 pr-3 py-1.5 w-44 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filtered.map((exam) => (
              <div key={exam.trackId} className="flex items-center gap-4 px-4 py-3">
                <LangLogo name={exam.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-slate-400">Exam</p>
                  <p className="text-[15px] font-semibold text-slate-900">{exam.name}</p>
                </div>
                {exam.earned && (
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
                    EARNED
                  </span>
                )}
                <button className="border border-slate-300 hover:bg-slate-50 text-[13px] font-semibold text-slate-700 px-4 py-1.5 rounded-md whitespace-nowrap">
                  Get Certificate
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-slate-400 text-[14px] py-10">
                No exams match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
