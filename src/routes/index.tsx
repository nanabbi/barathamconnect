import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  LayoutDashboard, Users, HeartHandshake, MapPin, Settings, FileText, Search, Plus, Menu, X,
  Building2, IndianRupee, Bell, ChevronDown, LogOut, UserCircle, Activity, Stethoscope,
  UserPlus, HandCoins, Phone, Mail, Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BFWF ERP Portal — Bharathamatha Family Welfare Foundation" },
      { name: "description", content: "Management portal for beneficiaries, donors, branches and staff of Bharathamatha Family Welfare Foundation." },
      { property: "og:title", content: "BFWF ERP Portal" },
      { property: "og:description", content: "Beneficiaries, donors, branches and staff management for Bharathamatha Family Welfare Foundation." },
    ],
  }),
  component: App,
});

type View = "dashboard" | "beneficiaries" | "donors" | "branches" | "reports" | "settings";

const BRANCHES = [
  { name: "Thiruthuraipoondi", hq: true, location: "47, South Street, Thiruvarur Dist.", programs: ["Early Intervention", "De-addiction Centre", "Swadhar Shelter"], beneficiaries: 755 },
  { name: "Thirukuvalai", hq: false, location: "Thirukuvalai, Nagapattinam Dist.", programs: ["Old Age Care Home"], beneficiaries: 36 },
  { name: "Muthupettai", hq: false, location: "Muthupettai, Thiruvarur Dist.", programs: ["Community Based Rehabilitation"], beneficiaries: 412 },
  { name: "Kottur", hq: false, location: "Kottur, Thiruvarur Dist.", programs: ["Disability Support"], beneficiaries: 337 },
];
const PROGRAMS = ["Early Intervention", "De-addiction Centre", "Swadhar Shelter", "Old Age Care Home", "Community Based Rehabilitation", "Disability Support"];

const STAFF = [
  { name: "Edaiyoor R.V. Manimaran", role: "Founder & Secretary", phone: "+91-94430-00001", email: "secretary@bfwf.org" },
  { name: "Mariakkannu", role: "Chairman", phone: "+91-94430-00002", email: "chairman@bfwf.org" },
  { name: "Vasanthakumari", role: "Treasurer", phone: "+91-94430-00003", email: "treasurer@bfwf.org" },
  { name: "Abhijith M", role: "System Administrator", phone: "+91-94430-00004", email: "admin@bfwf.org" },
];

const DONORS = [
  { name: "Ramesh Krishnan", phone: "+91-9876543210", email: "ramesh.k@email.com", amount: 50000, program: "Old Age Care" },
  { name: "Priya Natarajan", phone: "+91-8765432109", email: "priya.n@email.com", amount: 25000, program: "Swadhar Shelter" },
  { name: "TechCorp India Ltd", phone: "+91-7654321098", email: "csr@techcorp.in", amount: 500000, program: "Disability Intervention" },
  { name: "Meenakshi Sundaram", phone: "+91-6543210987", email: "meenakshi.s@email.com", amount: 100000, program: "General Welfare" },
];

type Beneficiary = { id: string; name: string; age: number; branch: string; program: string; status: "Active" | "Graduated" };
const SEED_BENEFICIARIES: Beneficiary[] = [
  { id: "BFWF-1001", name: "Karthik Selvam", age: 6, branch: "Thiruthuraipoondi", program: "Early Intervention", status: "Active" },
  { id: "BFWF-1002", name: "Lakshmi Ammal", age: 74, branch: "Thirukuvalai", program: "Old Age Care Home", status: "Active" },
  { id: "BFWF-1003", name: "Murugan Pandian", age: 38, branch: "Thiruthuraipoondi", program: "De-addiction Centre", status: "Graduated" },
  { id: "BFWF-1004", name: "Revathi Kumar", age: 29, branch: "Thiruthuraipoondi", program: "Swadhar Shelter", status: "Active" },
  { id: "BFWF-1005", name: "Arun Prakash", age: 14, branch: "Kottur", program: "Disability Support", status: "Active" },
  { id: "BFWF-1006", name: "Saraswathi Devi", age: 81, branch: "Thirukuvalai", program: "Old Age Care Home", status: "Active" },
  { id: "BFWF-1007", name: "Vignesh Raja", age: 22, branch: "Muthupettai", program: "Community Based Rehabilitation", status: "Graduated" },
  { id: "BFWF-1008", name: "Anitha Mohan", age: 4, branch: "Thiruthuraipoondi", program: "Early Intervention", status: "Active" },
  { id: "BFWF-1009", name: "Selvi Ramasamy", age: 33, branch: "Thiruthuraipoondi", program: "Swadhar Shelter", status: "Graduated" },
  { id: "BFWF-1010", name: "Ganesh Babu", age: 45, branch: "Thiruthuraipoondi", program: "De-addiction Centre", status: "Active" },
  { id: "BFWF-1011", name: "Divya Bharathi", age: 17, branch: "Muthupettai", program: "Community Based Rehabilitation", status: "Active" },
  { id: "BFWF-1012", name: "Rajendran K", age: 52, branch: "Kottur", program: "Disability Support", status: "Active" },
];

const CHART = [
  { program: "Old Age Care", count: 36 },
  { program: "Swadhar Shelter", count: 150 },
  { program: "Early Intervention", count: 500 },
  { program: "De-addiction", count: 105 },
];

const ACTIVITY = [
  { icon: HandCoins, text: "New donation of ₹25,000 received from Priya Natarajan", time: "12 min ago", tone: "success" },
  { icon: Stethoscope, text: "Medical camp concluded at Muthupettai — 84 people screened", time: "2 hours ago", tone: "primary" },
  { icon: UserPlus, text: "New volunteer registered at Kottur branch", time: "5 hours ago", tone: "primary" },
  { icon: FileText, text: "80-G receipt issued to TechCorp India Ltd", time: "Yesterday", tone: "success" },
  { icon: Users, text: "3 new beneficiaries enrolled in Early Intervention", time: "2 days ago", tone: "primary" },
];

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

const NAV: { id: View; label: string; icon: typeof Users }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "beneficiaries", label: "Beneficiaries", icon: Users },
  { id: "donors", label: "Donors & Finance", icon: HeartHandshake },
  { id: "branches", label: "Branches & Staff", icon: MapPin },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

function App() {
  const [view, setView] = useState<View>("dashboard");
  const [open, setOpen] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState(SEED_BENEFICIARIES);
  const current = NAV.find((n) => n.id === view)!;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {open && <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-primary text-primary-foreground transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center gap-3 border-b border-primary-foreground/10 px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success text-success-foreground"><HeartHandshake className="h-5 w-5" /></div>
          <div className="leading-tight">
            <p className="text-sm font-bold">Bharathamatha</p>
            <p className="text-xs opacity-70">Family Welfare Fdn. · 1989</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => { setView(n.id); setOpen(false); }}
              className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                view === n.id ? "bg-primary-foreground text-primary shadow" : "opacity-80 hover:bg-primary-foreground/10 hover:opacity-100 hover:translate-x-1")}>
              <n.icon className="h-4 w-4" />{n.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-primary-foreground/10 p-4 text-xs opacity-70">
          47, South Street, Thiruthuraipoondi, Thiruvarur – 614713
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-card/90 px-4 backdrop-blur md:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></Button>
          <div>
            <h1 className="text-lg font-semibold">{current.label}</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">Bharathamatha Family Welfare Foundation ERP</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" onClick={() => toast("You have 3 new notifications")}>
              <Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-success" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">AM</div>
                  <div className="hidden text-left leading-tight sm:block">
                    <p className="text-sm font-medium">Abhijith M</p>
                    <p className="text-xs text-muted-foreground">System Administrator</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast("Profile opened")}><UserCircle className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView("settings")}><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("Signed out")}><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main key={view} className="flex-1 animate-in fade-in slide-in-from-bottom-2 p-4 duration-300 md:p-6">
          {view === "dashboard" && <Dashboard />}
          {view === "beneficiaries" && <Beneficiaries data={beneficiaries} setData={setBeneficiaries} />}
          {view === "donors" && <Donors />}
          {view === "branches" && <Branches />}
          {view === "reports" && <Placeholder icon={FileText} title="Reports" text="Annual, FCRA and program-wise reports will be available here." />}
          {view === "settings" && <Placeholder icon={Settings} title="Settings" text="Organization profile, user roles and preferences." />}
        </main>
      </div>
    </div>
  );
}

function Dashboard() {
  const kpis = [
    { label: "Total Beneficiaries", value: "1,540", icon: Users, note: "+48 this month" },
    { label: "Active Donors", value: "142", icon: HeartHandshake, note: "+6 this month" },
    { label: "Active Branches", value: "4", icon: Building2, note: "Across Tamil Nadu" },
    { label: "Funds Raised this Year", value: "₹12,50,000", icon: IndianRupee, note: "+18% vs last year" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="flex items-start justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{k.label}</p>
                <p className="mt-1 text-2xl font-bold">{k.value}</p>
                <p className="mt-1 text-xs font-medium text-success">{k.note}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5 text-primary"><k.icon className="h-5 w-5" /></div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Beneficiaries by Program</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="program" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={{ borderRadius: 8, border: "1px solid var(--border)" }} />
                <Bar dataKey="count" name="Beneficiaries" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Activity className="h-4 w-4" />Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <ol className="relative space-y-5 border-l pl-6">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="relative">
                  <span className={cn("absolute -left-[37px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-card", a.tone === "success" ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground")}>
                    <a.icon className="h-3 w-3" />
                  </span>
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Beneficiaries({ data, setData }: { data: Beneficiary[]; setData: (d: Beneficiary[]) => void }) {
  const [q, setQ] = useState("");
  const [branch, setBranch] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", dob: "", branch: "", program: "" });

  const rows = useMemo(() => data.filter((b) =>
    (branch === "all" || b.branch === branch) &&
    (b.name.toLowerCase().includes(q.toLowerCase()) || b.id.toLowerCase().includes(q.toLowerCase()))), [data, q, branch]);

  const save = () => {
    if (!form.name || !form.dob || !form.branch || !form.program) {
      toast.error("Please fill all fields");
      return;
    }
    const age = Math.max(0, Math.floor((Date.now() - new Date(form.dob).getTime()) / 31557600000));
    setData([{ id: `BFWF-${1001 + data.length}`, name: form.name, age, branch: form.branch, program: form.program, status: "Active" }, ...data]);
    setForm({ name: "", dob: "", branch: "", program: "" });
    setOpen(false);
    toast.success(`${form.name} added as a beneficiary`);
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search Beneficiaries" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="md:w-56"><SelectValue placeholder="Filter by Branch" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {BRANCHES.map((b) => <SelectItem key={b.name} value={b.name}>{b.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => setOpen(true)} className="transition-transform hover:scale-[1.02]"><Plus className="mr-1 h-4 w-4" />Add Beneficiary</Button>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Age</TableHead><TableHead>Branch</TableHead><TableHead>Enrolled Program</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((b) => (
                <TableRow key={b.id} className="transition-colors hover:bg-primary/5">
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>{b.age}</TableCell>
                  <TableCell>{b.branch}</TableCell>
                  <TableCell>{b.program}</TableCell>
                  <TableCell>
                    <Badge className={b.status === "Active" ? "bg-success/15 text-success hover:bg-success/20" : "bg-muted text-muted-foreground hover:bg-muted"}>{b.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No beneficiaries found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground">Showing {rows.length} of {data.length} records</p>
      </CardContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Beneficiary</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></div>
            <div className="grid gap-2"><Label>Date of Birth</Label><Input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} /></div>
            <div className="grid gap-2"><Label>Branch</Label>
              <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
                <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                <SelectContent>{BRANCHES.map((b) => <SelectItem key={b.name} value={b.name}>{b.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label>Program</Label>
              <Select value={form.program} onValueChange={(v) => setForm({ ...form, program: v })}>
                <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                <SelectContent>{PROGRAMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save Beneficiary</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function Donors() {
  const total = DONORS.reduce((s, d) => s + d.amount, 0);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Listed Donors</p><p className="text-2xl font-bold">{DONORS.length}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Lifetime Contributions</p><p className="text-2xl font-bold text-success">{inr(total)}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Largest Contributor</p><p className="text-2xl font-bold">TechCorp India</p></CardContent></Card>
      </div>
      <Card>
        <CardContent className="p-5">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow><TableHead>Donor Name</TableHead><TableHead>Phone</TableHead><TableHead>Email</TableHead><TableHead className="text-right">Lifetime Contribution</TableHead><TableHead>Preferred Program</TableHead><TableHead>Action</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {DONORS.map((d) => (
                  <TableRow key={d.email} className="transition-colors hover:bg-primary/5">
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{d.email}</TableCell>
                    <TableCell className="text-right font-semibold">{inr(d.amount)}</TableCell>
                    <TableCell><Badge variant="outline">{d.program}</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-success text-success-foreground transition-all hover:bg-success/90 hover:shadow"
                        onClick={() => toast.success("80-G Receipt generated successfully", { description: `Receipt for ${d.name} · ${inr(d.amount)}` })}>
                        <FileText className="mr-1 h-4 w-4" />Generate 80-G Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Branches() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {BRANCHES.map((b) => (
          <Card key={b.name} className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary"><MapPin className="h-5 w-5" /></div>
                {b.hq && <Badge className="bg-primary text-primary-foreground">HQ</Badge>}
              </div>
              <div>
                <h3 className="font-semibold">{b.name}</h3>
                <p className="text-xs text-muted-foreground">{b.location}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {b.programs.map((p) => <span key={p} className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">{p}</span>)}
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-sm text-muted-foreground">Total Beneficiaries</span>
                <span className="text-lg font-bold">{b.beneficiaries}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold">Staff Directory</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STAFF.map((s) => (
            <Card key={s.name} className="transition-all hover:shadow-md">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {s.name.split(" ").filter((w) => !w.includes(".")).map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{s.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Briefcase className="h-3 w-3" />{s.role}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{s.phone}</p>
                  <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{s.email}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Placeholder({ icon: Icon, title, text }: { icon: typeof Users; title: string; text: string }) {
  return (
    <Card><CardContent className="flex flex-col items-center py-20 text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary"><Icon className="h-8 w-8" /></div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>
    </CardContent></Card>
  );
}
