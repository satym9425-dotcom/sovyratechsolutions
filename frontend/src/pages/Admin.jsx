import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  LogOut, Download, Search, Users, FileText, GraduationCap, Rocket, Loader2, ChevronDown,
} from "lucide-react";
import Logo from "@/components/Logo";
import { api, formatApiErrorDetail } from "@/lib/api";

const STATUSES = ["new", "contacted", "enrolled", "rejected"];

const statusStyles = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  enrolled: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [leads, setLeads] = useState({ inquiries: [], applications: [] });
  const [tab, setTab] = useState("applications");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get("/auth/me").then((r) => setUser(r.data)).catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (user) {
      api.get("/admin/leads").then((r) => setLeads(r.data)).catch(() => toast.error("Failed to load leads"));
    }
  }, [user]);

  const login = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data);
      toast.success(`Welcome back, ${data.name}`);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    setUser(null);
    toast.success("Logged out");
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/leads/${id}`, { status });
      setLeads((prev) => ({
        inquiries: prev.inquiries.map((l) => (l.id === id ? { ...l, status } : l)),
        applications: prev.applications.map((l) => (l.id === id ? { ...l, status } : l)),
      }));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const rows = useMemo(() => {
    const list = tab === "applications" ? leads.applications : leads.inquiries;
    return list.filter((l) => {
      const matchesProgram = filter === "all" || (l.program || "") === filter;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        (l.full_name || l.name || "").toLowerCase().includes(q) ||
        (l.email || "").toLowerCase().includes(q) ||
        (l.phone || "").includes(q) ||
        (l.domain || "").toLowerCase().includes(q);
      return matchesProgram && matchesQuery;
    });
  }, [leads, tab, filter, query]);

  const kpis = useMemo(() => {
    const apps = leads.applications;
    const inq = leads.inquiries;
    return [
      { icon: Users, label: "Total Inquiries", value: inq.length },
      { icon: FileText, label: "Applications", value: apps.length },
      { icon: Rocket, label: "Placement Track", value: apps.filter((a) => (a.program || "").includes("Placement")).length },
      { icon: GraduationCap, label: "Internship Track", value: apps.filter((a) => a.program === "Training + Internship").length },
    ];
  }, [leads]);

  const exportCsv = () => {
    const header = ["Name", "Email", "Phone", "Program", "Domain", "College", "Status", "Date"];
    const lines = rows.map((l) =>
      [l.full_name || l.name, l.email, l.phone, l.program, l.domain || "", l.college || "", l.status, l.created_at]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sovyra tech solutions-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-700" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="blueprint-grid flex min-h-screen items-center justify-center bg-[#F1F5F9] px-5" data-testid="admin-login-page">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <form
            onSubmit={login}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5"
            data-testid="admin-login-form"
          >
            <h1 className="font-display text-2xl font-extrabold text-slate-950">Admin Portal</h1>
            <p className="mt-1.5 text-sm text-slate-500">Sign in to review inquiries and applications.</p>

            {error && (
              <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700" data-testid="admin-login-error">
                {error}
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@Sovyra tech solutions.com"
                  className={inputCls}
                  data-testid="admin-email-input"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                  data-testid="admin-password-input"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-blue-700 py-3.5 font-display text-base font-bold text-white shadow-lg shadow-blue-700/25 transition-colors duration-200 hover:bg-blue-800 disabled:opacity-60"
              data-testid="admin-login-submit-button"
            >
              {loginLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-500">
            <Link to="/" className="font-semibold text-blue-700 hover:underline">← Back to website</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]" data-testid="admin-dashboard">
      <header className="border-b border-slate-800 bg-[#0B132B]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Logo dark />
            </Link>
            <span className="rounded-full bg-blue-600/20 px-3 py-1 font-mono-alt text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-400 sm:block">{user.email}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors duration-200 hover:border-rose-400 hover:text-rose-300"
              data-testid="admin-logout-button"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-5" data-testid={`kpi-${k.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{k.label}</span>
                <k.icon className="h-4 w-4 text-blue-700" />
              </div>
              <div className="mt-3 font-display text-3xl font-black text-slate-950">{k.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2">
              {["applications", "inquiries"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-5 py-2 font-display text-sm font-bold capitalize transition-colors duration-200 ${
                    tab === t ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  data-testid={`admin-tab-${t}`}
                >
                  {t} ({t === "applications" ? leads.applications.length : leads.inquiries.length})
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, email, domain..."
                  className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors duration-200 focus:border-blue-600 sm:w-64"
                  data-testid="admin-search-input"
                />
              </div>
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full appearance-none rounded-full border border-slate-300 bg-white py-2.5 pl-4 pr-10 text-sm outline-none transition-colors duration-200 focus:border-blue-600 sm:w-auto"
                  data-testid="admin-program-filter"
                >
                  <option value="all">All Programs</option>
                  <option value="Training + Internship">Training + Internship</option>
                  <option value="Training + Internship + Placement">Training + Internship + Placement</option>
                  <option value="">Not specified</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              <button
                onClick={exportCsv}
                className="flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-700"
                data-testid="admin-export-csv-button"
              >
                <Download className="h-4 w-4" /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm" data-testid="admin-applications-table">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5">Student</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">Program</th>
                  <th className="px-5 py-3.5">Domain</th>
                  <th className="px-5 py-3.5">College</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-slate-400" data-testid="admin-empty-state">
                      No {tab} yet. They will appear here as students submit the forms.
                    </td>
                  </tr>
                )}
                {rows.map((l) => (
                  <tr key={l.id} className="border-b border-slate-100 transition-colors duration-150 hover:bg-blue-50/40">
                    <td className="px-5 py-4 font-semibold text-slate-900">{l.full_name || l.name}</td>
                    <td className="px-5 py-4">
                      <div className="text-slate-700">{l.email}</div>
                      <div className="text-xs text-slate-500">{l.phone}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{l.program || <span className="text-slate-400">—</span>}</td>
                    <td className="px-5 py-4">
                      {l.domain ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{l.domain}</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{l.college || "—"}</td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {l.created_at ? new Date(l.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={l.status || "new"}
                        onChange={(e) => updateStatus(l.id, e.target.value)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-bold capitalize outline-none ${statusStyles[l.status || "new"]}`}
                        data-testid={`admin-status-select-${l.id}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
