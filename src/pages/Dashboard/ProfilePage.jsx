import React, { useState, useEffect } from "react";
import AccountLayout from "../../components/AccountLayout";
import { ProfileIcon } from "../../components/icons";
import { fetchProfile, updateProfile } from "../../lib/api";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${
        checked ? "bg-green-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className="block text-[14px] font-medium text-slate-800 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[12px] text-slate-500 mt-1.5">{hint}</p>}
    </div>
  );
}

export default function ProfilePage() {
  const [userId] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codelearn_user") || "null")?.id || null;
    } catch {
      return null;
    }
  });
  const [showProfile, setShowProfile] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [showSpaces, setShowSpaces] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    fetchProfile(userId)
      .then((d) => {
        if (!alive || !d.user) return;
        setFirstName(d.user.firstName || "");
        setLastName(d.user.lastName || "");
        setEmail(d.user.email || "");
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const user = await updateProfile({ userId, firstName, lastName });
      const stored = JSON.parse(localStorage.getItem("codelearn_user") || "{}");
      localStorage.setItem("codelearn_user", JSON.stringify({ ...stored, ...user }));
    } catch (e) {
      alert(e.message || "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AccountLayout active="Profile">
      <div className="bg-white rounded-lg border border-slate-200 max-w-4xl mx-auto p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 rounded-2xl bg-orange-50 flex items-center justify-center">
              <ProfileIcon className="w-12 h-12 text-orange-400" />
              <button className="absolute -bottom-1 -left-1 bg-white border border-slate-200 rounded p-1 text-red-500 shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m3 0l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="absolute -bottom-1 left-6 bg-white border border-slate-200 rounded p-1 text-slate-600 shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[26px] font-bold text-slate-900">
                  {firstName} {lastName}
                </h1>
              </div>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-semibold text-[14px] px-5 py-2.5 rounded-md"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>

        <h2 className="text-[19px] font-bold text-slate-900 mb-4">Basic information</h2>
        <div className="space-y-5 mb-6">
          <Field label="CodeLearn Nickname" hint="Your nickname will appear on the League and be visible to others.">
            <input
              type="text"
              placeholder="Enter your CodeLearn Nickname"
              className="w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>

          <Field label="Profile URL">
            <div className="flex gap-2">
              <input
                readOnly
                value="https://www.codelearn.dev/u/"
                className="flex-1 border border-slate-300 rounded-md px-3.5 py-2.5 text-[14px] text-slate-500 bg-slate-50"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white text-[14px] font-semibold px-5 rounded-md whitespace-nowrap">
                Copy link
              </button>
            </div>
          </Field>
        </div>

        <div className="divide-y divide-slate-100 border-t border-slate-100">
          <div className="flex items-center gap-3 py-4">
            <Toggle checked={showProfile} onChange={setShowProfile} />
            <span className="text-[15px] font-medium text-slate-800">Show profile</span>
          </div>

          <div className="py-4">
            <div className="flex items-center gap-3">
              <Toggle checked={showCerts} onChange={setShowCerts} />
              <span className="text-[15px] font-medium text-slate-800 flex-1">
                Show Certificates in Profile
              </span>
              <span className="text-slate-400">›</span>
            </div>
            <p className="text-[13px] text-slate-500 mt-1.5 ml-[52px]">
              Show the certificates you've earned on your CodeLearn profile.
            </p>
          </div>

          <div className="py-4">
            <div className="flex items-center gap-3">
              <Toggle checked={showSpaces} onChange={setShowSpaces} />
              <span className="text-[15px] font-medium text-slate-800 flex-1">
                Show Spaces in Profile
              </span>
              <span className="text-slate-400">›</span>
            </div>
            <p className="text-[13px] text-slate-500 mt-1.5 ml-[52px]">
              Show the spaces you've created on your CodeLearn profile.
            </p>
          </div>
        </div>

        <h2 className="text-[19px] font-bold text-slate-900 mt-8 mb-4">Account information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-2">
          <Field label="First Name" required>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>
          <Field label="Last Name" required>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>
        </div>
        <p className="text-[12px] text-slate-500 mb-5">
          The name you enter here will appear on your certificates.
        </p>

        <Field label="Email" required>
          <input
            readOnly
            value={email}
            placeholder="email@example.com"
            className="w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-[14px] text-slate-500 bg-slate-50"
          />
        </Field>
        <div className="bg-slate-100 rounded-md px-4 py-3 mt-3 text-[13px] font-medium text-slate-700">
          Email is managed by your account.
        </div>

        <label className="flex items-center gap-2.5 mt-5 text-[14px] text-slate-700">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
          />
          Email me with news and updates
        </label>

        <h2 className="text-[19px] font-bold text-slate-900 mt-8 mb-4">Password</h2>
        <button className="border border-slate-300 hover:bg-slate-50 text-[14px] font-semibold text-slate-800 px-5 py-2.5 rounded-md">
          Reset password
        </button>

        <h2 className="text-[19px] font-bold text-red-600 mt-8 mb-3">Delete Account</h2>
        <button className="border border-red-300 text-red-600 hover:bg-red-50 text-[14px] font-semibold px-5 py-2.5 rounded-md">
          Delete My Account
        </button>
      </div>
    </AccountLayout>
  );
}
