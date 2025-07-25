"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import "../../main.css";
import AdminNavbar from "./AdminNavbar";
import Spinner from "../spinner/Spinner";
import Notification from "../Notification";
import Confirmation from "../Confirmation";
import AdminItemModal from "./AdminItemModal"; // Ensure this path is correct
import { menuService } from "../service/menuService";
import { isTokenValid, getUsername, getRole, logout } from "../../utils/auth";

const MenuItem = ({ item, onEdit, onDelete }) => (
    <li className="dashboard-list-item">
      <div className="dashboard-list-thumb">
        <img
            src={item.imageUrl || "/placeholder.svg?height=60&width=60"}
            alt={item.name}
            style={{ width: 60, height: 48, objectFit: "cover", borderRadius: 6 }}
        />
      </div>
      <div className="dashboard-list-main" style={{ flex: 2, minWidth: 0 }}>
        <div style={{ fontWeight: "bold", fontSize: "1.07em", color: "var(--heading-color)" }}>
          {item.name}
          {item.vegetarian && (
              <span className="badge veg" title="Vegetarian">
            🥗
          </span>
          )}
          {item.spicy && (
              <span className="badge spicy" title="Spicy">
            🌶️
          </span>
          )}
        </div>
        <div className="dashboard-list-cat">{item.category}</div>
        <div className="dashboard-list-desc" title={item.description}>
          {item.description?.length > 80 ? `${item.description.slice(0, 77)}...` : item.description}
        </div>
        {item.ingredients && (
            <div className="dashboard-list-ing">
              <span style={{ color: "var(--accent-color)" }}>Ingredients: </span>
              {Array.isArray(item.ingredients) ? item.ingredients.join(", ") : item.ingredients}
            </div>
        )}
      </div>
      <div className="dashboard-list-price" style={{ minWidth: 75 }}>
        €{typeof item.price === "number" ? item.price.toFixed(2) : "-"}
      </div>
      <div className="dashboard-list-actions">
        <button
            className="dashboard-edit-btn"
            onClick={() => onEdit(item)}
            aria-label={`Edit ${item.name}`}
        >
          <i className="bi bi-pencil"></i> Edit
        </button>
        <button
            className="dashboard-delete-btn"
            onClick={() => onDelete(item.id)}
            aria-label={`Delete ${item.name}`}
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </li>
);

function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [userInfo, setUserInfo] = useState({ username: "", role: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await menuService.getMenuItems();
      setMenuItems(data);
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      if (!isTokenValid()) {
        setNotification({ message: "Session expired. Please login again.", type: "error" });
        setTimeout(() => (window.location.href = "/admin-login"), 2000);
        return false;
      }
      const username = getUsername();
      const role = getRole();
      if (role !== "ROLE_ADMIN") {
        setNotification({ message: "Access denied. Admin privileges required.", type: "error" });
        setTimeout(() => (window.location.href = "/"), 2000);
        return false;
      }
      setUserInfo({ username, role });
      return true;
    };

    if (checkAuth()) {
      fetchMenuItems();
    }
  }, [fetchMenuItems]);

  const filteredItems = useMemo(() => menuService.filterMenuItems(menuItems, search), [menuItems, search]);

  const handleDelete = useCallback((id) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await menuService.deleteMenuItem(itemToDelete);
      setMenuItems((items) => items.filter((i) => i.id !== itemToDelete));
      setNotification({ message: "Item deleted successfully.", type: "success" });
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setConfirmOpen(false);
      setItemToDelete(null);
    }
  }, [itemToDelete]);

  const handleAddItem = useCallback(() => {
    console.log("Add Item clicked");
    setModalItem(null);
    setModalOpen(true);
  }, []);

  const handleEditItem = useCallback((item) => {
    console.log("Edit Item clicked", item);
    setModalItem(item);
    setModalOpen(true);
  }, []);

  const handleSaveItem = useCallback(
      async (formData) => {
        try {
          setSaving(true);
          if (modalItem) {
            const updated = await menuService.updateMenuItem(modalItem.id, formData);
            setMenuItems((items) => items.map((i) => (i.id === modalItem.id ? updated : i)));
            setNotification({ message: "Item updated successfully.", type: "success" });
          } else {
            const created = await menuService.createMenuItem(formData);
            setMenuItems((items) => [created, ...items]);
            setNotification({ message: "Item added successfully.", type: "success" });
          }
          setModalOpen(false);
          setModalItem(null);
        } catch (err) {
          setNotification({ message: err.message, type: "error" });
        } finally {
          setSaving(false);
        }
      },
      [modalItem],
  );

  const handleLogout = useCallback(() => {
    logout();
    setNotification({ message: "Logged out successfully.", type: "success" });
    setTimeout(() => (window.location.href = "/admin-login"), 1500);
  }, []);

  return (
      <div className="admin-dashboard">
        <AdminNavbar username={userInfo.username} onLogout={handleLogout} />
        <main className="settings-root">
          <div className="dashboard-header-row">
            <h2 className="dashboard-title">Management Dashboard</h2>
            <button className="dashboard-add-btn" onClick={handleAddItem}>
              <i className="bi bi-plus-circle"></i> Add Item
            </button>
          </div>
          <div className="dashboard-search-row">
            <input
                type="search"
                className="dashboard-search-input"
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search menu items"
            />
            <button
                className="dashboard-add-btn"
                onClick={fetchMenuItems}
                title="Refresh menu items"
                style={{ marginLeft: "10px", padding: "0.65em 1em" }}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
          {loading ? (
              <div className="dashboard-center">
                <Spinner />
              </div>
          ) : (
              <ul className="dashboard-list">
                {filteredItems.length === 0 ? (
                    <li className="dashboard-empty">
                      {search ? "No items found matching your search." : "No menu items available."}
                    </li>
                ) : (
                    filteredItems.map((item) => (
                        <MenuItem key={item.id} item={item} onEdit={handleEditItem} onDelete={handleDelete} />
                    ))
                )}
              </ul>
          )}
          {notification && (
              <Notification
                  message={notification.message}
                  type={notification.type}
                  duration={3000}
                  onClose={() => setNotification(null)}
              />
          )}
          <Confirmation
              open={confirmOpen}
              title="Delete menu item?"
              message="Are you sure you want to delete this item? This action cannot be undone."
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={confirmDelete}
              onCancel={() => setConfirmOpen(false)}
          />
          <AdminItemModal
              show={modalOpen}
              selectedItem={modalItem}
              onSave={handleSaveItem}
              onClose={() => {
                setModalOpen(false);
                setModalItem(null);
              }}
              saving={saving}
              deleteItem={handleDelete}
          />
        </main>
      </div>
  );
}

export default AdminDashboard;