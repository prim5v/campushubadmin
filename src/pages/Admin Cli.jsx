import React, { useState } from "react";
import axios from "axios";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Play, Trash2, HelpCircle, Database } from "lucide-react";

export default function AdminCLI() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [loading, setLoading] = useState(false);

  const runQuery = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setResponse(null);
      setResult(null);

      const { data } = await axios.post(
        "https://campushub4293.pythonanywhere.com/admin/create_cli",
        { query }
      );

      if (data.type === "select") {
        setResult(data);
      } else {
        setResponse(data);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Query failed");
    } finally {
      setLoading(false);
    }
  };

  const clearQuery = () => {
    setQuery("");
    setResult(null);
    setResponse(null);
    setError(null);
  };

  const helpQueries = [
    "SHOW TABLES;",
    "DESCRIBE users;",
    "SELECT * FROM users;",
    "SELECT * FROM users LIMIT 10;",
    "SELECT * FROM users ORDER BY id DESC LIMIT 10;",
    "SELECT id, username FROM users;",
    "SELECT COUNT(*) FROM users;",
    "SELECT DISTINCT status FROM users;",
    "SELECT * FROM users WHERE id = 1;",
    "SELECT * FROM users WHERE status = 'active';",
    "SELECT * FROM users WHERE username LIKE '%john%';",
    "INSERT INTO users (username, email) VALUES ('john', 'john@gmail.com');",
    "UPDATE users SET email = 'new@gmail.com' WHERE id = 1;",
    "DELETE FROM users WHERE id = 1;",
    "SELECT status, COUNT(*) FROM users GROUP BY status;",
    "SELECT MAX(id) FROM users;",
    "SELECT MIN(id) FROM users;",
    "SELECT AVG(id) FROM users;",
    "SELECT users.username, orders.amount FROM users JOIN orders ON users.id = orders.user_id;",
    "SELECT * FROM login_logs ORDER BY id DESC LIMIT 20;",
    "SELECT * FROM activity_logs ORDER BY id DESC LIMIT 20;",
    "SELECT * FROM page_time ORDER BY paged_at DESC LIMIT 20;",
    "SELECT DATABASE();",
    "SELECT VERSION();",
    "SELECT NOW();",
    "SELECT * FROM orders;",
    "SELECT * FROM orders WHERE amount > 1000;",
    "SELECT user_id, COUNT(*) FROM orders GROUP BY user_id;",
    "SELECT * FROM users WHERE created_at > '2025-01-01';",
    "UPDATE users SET status = 'inactive' WHERE id = 2;"
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-2">
        <Database className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-semibold">Admin CLI Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="mb-3 text-sm text-gray-500">
            Tip: Use SELECT to fetch data, INSERT to add, UPDATE to modify, DELETE to remove.
          </div>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-64 p-3 rounded-lg bg-gray-900 text-green-400 font-mono text-sm"
            placeholder="Write your SQL query here..."
          />

          <div className="flex gap-2 mt-3">
            <button
              onClick={runQuery}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4" /> Run
            </button>

            <button
              onClick={clearQuery}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>

            <button
              onClick={() => setShowHelp(!showHelp)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" /> Help
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-3">Results</h2>

          {loading && <div className="text-gray-500 text-sm">Running query...</div>}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-3">
              {error}
            </div>
          )}

          {response && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-3">
              {response.type === "insert" && `Insert successful. ID: ${response.insert_id}`}
              {response.type === "update" && `Updated rows: ${response.affected_rows}`}
              {response.type === "delete" && `Deleted rows: ${response.affected_rows}`}
            </div>
          )}

          {result && (
            <div className="overflow-auto max-h-96 border rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {result.columns.map((col) => (
                      <th key={col} className="px-3 py-2 text-left">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.map((row, i) => (
                    <tr key={i} className="border-t">
                      {result.columns.map((col) => (
                        <td key={col} className="px-3 py-2">
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* HELP PANEL */}
      {showHelp && (
        <div className="bg-white border rounded-xl p-4 shadow-sm mt-6">
          <h2 className="font-semibold mb-3">Query Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {helpQueries.map((q, index) => (
              <button
                key={index}
                onClick={() => setQuery(q)}
                className="text-left bg-gray-100 hover:bg-gray-200 p-2 rounded text-sm font-mono"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
