import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { SearchInput } from "../components/ui/SearchInput";
import {
  Users,
  User,
  Globe,
  Activity,
  Circle,
  Filter
} from "lucide-react";

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ status }) {
  const map = {
    online: "bg-green-100 text-green-700",
    idle: "bg-amber-100 text-amber-700",
    offline: "bg-gray-200 text-gray-600"
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${
        map[status] || "bg-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

/* ---------------- TIME FORMATTER ---------------- */

const formatTime = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

/* ---------------- ACTIVITY CARD ---------------- */

const ActivityCard = ({ item, type }) => {
  const isOnline = item.status === "online";
  const isIdle = item.status === "idle";

  const userLabel =
    type === "member"
      ? item.user?.username || "Member"
      : `Guest-${item.page_id?.slice(0, 6)}`;

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-center">

      <div className="space-y-1 text-sm">

        <div className="flex items-center gap-2 font-semibold">

          {userLabel}

          <Circle
            className={`w-3 h-3 ${
              isOnline
                ? "text-green-500 fill-green-500"
                : isIdle
                ? "text-amber-500 fill-amber-500"
                : "text-gray-400 fill-gray-400"
            }`}
          />

        </div>

        <div className="text-gray-600">
          Page : <span className="font-medium">{item.page_name}</span>
        </div>

        <div className="text-gray-500 text-xs">
          Last Activity : {formatTime(item.paged_at)}
        </div>

      </div>

      <StatusBadge status={item.status} />

    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

export function PageTime() {

  const [anonymous, setAnonymous] = useState([]);
  const [members, setMembers] = useState([]);

  const [onlineStats, setOnlineStats] = useState({});

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(false);

  /* -------- FETCH DATA -------- */

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "https://campushub4293.pythonanywhere.com/admin/get_page_time_list"
      );

      if (data) {
        setAnonymous(data.lists?.anonymous || []);
        setMembers(data.lists?.members || []);
        setOnlineStats(data.online_data || {});
      }

    } catch (err) {
      console.error("Activity fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* -------- AUTO REFRESH -------- */

  useEffect(() => {

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  /* -------- MERGE MEMBERS + GUESTS -------- */

  const allData = useMemo(() => {

    const memberData = members.map((m) => ({
      ...m,
      type: "member"
    }));

    const guestData = anonymous.map((g) => ({
      ...g,
      type: "guest"
    }));

    return [...memberData, ...guestData];

  }, [members, anonymous]);

  /* -------- SEARCH + FILTER -------- */

  const filteredData = useMemo(() => {

    let list = [...allData];

    if (filter !== "all") {
      list = list.filter((i) => i.status === filter);
    }

    if (search) {
      const s = search.toLowerCase();

      list = list.filter((i) => {

        const username = (i.username || "").toLowerCase();
        const page = (i.page_name || "").toLowerCase();

        return username.includes(s) || page.includes(s);

      });
    }

    return list;

  }, [allData, search, filter]);

  /* ---------------- UI ---------------- */

  return (
    <DashboardLayout>

      {/* -------- TITLE -------- */}

      <div className="flex items-center gap-2 mb-6">

        <Activity className="w-6 h-6 text-blue-500" />

        <h1 className="text-2xl font-semibold">
          Page Activity
        </h1>

      </div>

      {/* -------- STATS -------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="border rounded-xl p-4 shadow-sm flex items-center gap-3">

          <Users className="w-6 h-6 text-blue-500" />

          <div>
            <div className="text-sm text-gray-500">
              Total Online
            </div>
            <div className="text-xl font-semibold">
              {onlineStats?.total_counts || 0}
            </div>
          </div>

        </div>

        <div className="border rounded-xl p-4 shadow-sm flex items-center gap-3">

          <User className="w-6 h-6 text-green-500" />

          <div>
            <div className="text-sm text-gray-500">
              Members Online
            </div>
            <div className="text-xl font-semibold">
              {onlineStats?.members || 0}
            </div>
          </div>

        </div>

        <div className="border rounded-xl p-4 shadow-sm flex items-center gap-3">

          <Globe className="w-6 h-6 text-purple-500" />

          <div>
            <div className="text-sm text-gray-500">
              Guests Online
            </div>
            <div className="text-xl font-semibold">
              {onlineStats?.anonymous || 0}
            </div>
          </div>

        </div>

      </div>

      {/* -------- SEARCH + FILTER -------- */}

      <div className="flex flex-col md:flex-row gap-3 mb-6">

        <div className="flex-1">
          <SearchInput
            placeholder="Search users or pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-2 rounded-lg text-sm ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("online")}
            className={`px-3 py-2 rounded-lg text-sm ${
              filter === "online"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Online
          </button>

          <button
            onClick={() => setFilter("offline")}
            className={`px-3 py-2 rounded-lg text-sm ${
              filter === "offline"
                ? "bg-gray-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Offline
          </button>

        </div>

      </div>

      {/* -------- ACTIVITY LIST -------- */}

      <div className="space-y-3">

        {filteredData.length === 0 && (
          <div className="border rounded-xl p-6 text-center text-gray-500">
            No activity found
          </div>
        )}

        {filteredData.map((item) => (
          <ActivityCard
            key={`${item.type}-${item.page_id}`}
            item={item}
            type={item.type}
          />
        ))}

      </div>

      {/* -------- LOADING -------- */}

      {loading && (
        <div className="text-center text-sm text-gray-500 mt-4">
          {/* Updating activity... */}
        </div>
      )}

    </DashboardLayout>
  );
}

