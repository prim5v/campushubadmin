import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  // EDIT STATES
  const [showEdit, setShowEdit] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [updating, setUpdating] = useState(false);

  const API = "https://campushub4293.pythonanywhere.com/admin";

  // ---------------------------
  // Fetch Plans
  // ---------------------------
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/get_plans`);
      const data = await res.json();
      setPlans(data.plans || []);
    } catch (err) {
      console.error("Fetch plans error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ---------------------------
  // Delete Plan
  // ---------------------------
  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await fetch(`${API}/delete_plan/${id}`, {
        method: "DELETE",
      });
      fetchPlans();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ---------------------------
  // OPEN EDIT (replaces direct popular toggle logic)
  // ---------------------------
  const togglePopular = (plan) => {
    setEditingPlan(plan);
    setShowEdit(true);
  };

  // ---------------------------
  // Update Plan (Edit Route)
  // ---------------------------
  const updatePlan = async (e) => {
    e.preventDefault();
    if (!editingPlan) return;

    setUpdating(true);

    try {
      const form = new FormData(e.target);

      await fetch(`${API}/edit_plan/${editingPlan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          price: Number(form.get("price")),
          period: form.get("period"),
          description: form.get("description"),
          features: form.get("features")
            ? form.get("features").split(",").map(v => v.trim())
            : [],
          notIncluded: form.get("notIncluded")
            ? form.get("notIncluded").split(",").map(v => v.trim())
            : [],
          popular: form.get("popular") === "on" ? 1 : 0,
        }),
      });

      setShowEdit(false);
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      console.error("Update plan error:", err);
    } finally {
      setUpdating(false);
    }
  };

  // ---------------------------
  // Create Plan
  // ---------------------------
const createPlan = async (e) => {
  e.preventDefault();
  setCreating(true);

  try {
    const form = new FormData(e.target);

    await fetch(`${API}/create_plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        price: Number(form.get("price")),
        period: form.get("period"),
        description: form.get("description"),
        features: form.get("features")
          ? form.get("features").split(",").map(v => v.trim())
          : [],
        not_included: form.get("notIncluded")  // <-- updated key to match backend
          ? form.get("notIncluded").split(",").map(v => v.trim())
          : [],
        popular: 0,
      }),
    });

    setShowCreate(false);
    fetchPlans();
  } catch (err) {
    console.error("Create plan error:", err);
  } finally {
    setCreating(false);
  }
};

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <DashboardLayout>
      <div className="p-6 relative">
        <h2 className="text-2xl font-semibold mb-6">Plans Admin</h2>

        {loading && <p>Loading plans...</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-xl p-5 bg-white shadow-sm relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute top-3 right-3 text-xs bg-amber-500 text-white px-2 py-1 rounded">
                  POPULAR
                </span>
              )}

              {/* Header */}
              <h3 className="text-lg font-semibold">{plan.name}</h3>

              <p className="text-2xl font-bold mt-1">
                KES {plan.price}
                <span className="text-sm font-normal text-gray-500">
                  {" "} / {plan.period}
                </span>
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {plan.description}
              </p>

              {/* Included */}
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2 text-emerald-600">
                  Included
                </p>
                <ul className="text-sm space-y-1">
                  {plan.features?.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              {plan.notIncluded?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-2 text-red-500">
                    Not Included
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {plan.notIncluded.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => togglePopular(plan)}
                  className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg"
                >
                  {plan.popular ? "Unmark Popular" : "Make Popular"}
                </button>

                <button
                  onClick={() => deletePlan(plan.id)}
                  className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Create Button */}
        <button
          onClick={() => setShowCreate(true)}
          className="fixed bottom-8 right-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full shadow-lg"
        >
          + Create Plan
        </button>

        {/* Create Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
              onSubmit={createPlan}
              className="bg-white rounded-xl p-6 w-[420px] space-y-3 shadow-lg"
            >
              <h3 className="text-lg font-semibold">Create Plan</h3>

              <input
                name="name"
                placeholder="Plan Name"
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="price"
                placeholder="Price"
                type="number"
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="period"
                placeholder="Period (month, 6 months, year)"
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                className="w-full border p-2 rounded"
              />

              <input
                name="features"
                placeholder="Features (comma separated)"
                className="w-full border p-2 rounded"
              />

              <input
                name="notIncluded"
                placeholder="Not Included (comma separated)"
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  disabled={creating}
                  className="px-4 py-2 bg-emerald-600 text-white rounded"
                >
                  {creating ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Modal */}
        {showEdit && editingPlan && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
              onSubmit={updatePlan}
              className="bg-white rounded-xl p-6 w-[420px] space-y-3 shadow-lg"
            >
              <h3 className="text-lg font-semibold">Edit Plan</h3>

              <input
                name="name"
                defaultValue={editingPlan.name}
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="price"
                type="number"
                defaultValue={editingPlan.price}
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="period"
                defaultValue={editingPlan.period}
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                name="description"
                defaultValue={editingPlan.description}
                className="w-full border p-2 rounded"
              />

              <input
                name="features"
                defaultValue={editingPlan.features?.join(", ")}
                className="w-full border p-2 rounded"
              />

              <input
                name="notIncluded"
                defaultValue={editingPlan.notIncluded?.join(", ")}
                className="w-full border p-2 rounded"
              />

              {/* Popular Toggle inside Edit */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="popular"
                  defaultChecked={editingPlan.popular === 1}
                />
                Mark as Popular
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEdit(false);
                    setEditingPlan(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  disabled={updating}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
