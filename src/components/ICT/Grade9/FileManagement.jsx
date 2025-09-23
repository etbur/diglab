import React, { useState } from "react";

const FileManagement = () => {
  // Initial file system root
  const initialFS = {
    id: "root",
    name: "Root",
    type: "folder",
    children: [],
  };

  const [fileSystem, setFileSystem] = useState(initialFS);
  const [currentFolderId, setCurrentFolderId] = useState("root");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("folder");
  const [renamingId, setRenamingId] = useState(null);
  const [renameText, setRenameText] = useState("");

  // Helper: find folder by id recursively
  const findFolderById = (node, id) => {
    if (node.id === id) return node;
    if (node.type === "folder") {
      for (const child of node.children) {
        const found = findFolderById(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper: find parent of an item by child's id
  const findParentById = (node, childId) => {
    if (node.type === "folder") {
      for (const child of node.children) {
        if (child.id === childId) return node;
        const found = findParentById(child, childId);
        if (found) return found;
      }
    }
    return null;
  };

  // Navigate to a folder
  const goToFolder = (id) => {
    setCurrentFolderId(id);
    setSelectedItemId(null);
    setRenamingId(null);
  };

  // Create new file/folder in current folder
  const createNewItem = () => {
    if (!newItemName.trim()) {
      alert("Please enter a name for the new item.");
      return;
    }

    const currentFolder = findFolderById(fileSystem, currentFolderId);
    if (!currentFolder) return;

    // Check for duplicate names
    if (
      currentFolder.children.some(
        (child) => child.name.toLowerCase() === newItemName.trim().toLowerCase()
      )
    ) {
      alert("An item with this name already exists here.");
      return;
    }

    const newItem = {
      id: `${Date.now()}`, // simple unique id
      name: newItemName.trim(),
      type: newItemType,
      ...(newItemType === "folder" ? { children: [] } : {}),
    };

    currentFolder.children.push(newItem);
    setFileSystem({ ...fileSystem });
    setNewItemName("");
  };

  // Delete selected item
  const deleteItem = () => {
    if (!selectedItemId) {
      alert("Select an item to delete.");
      return;
    }
    if (selectedItemId === "root") {
      alert("Cannot delete the root folder.");
      return;
    }
    const parent = findParentById(fileSystem, selectedItemId);
    if (!parent) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${parent.children.find(c => c.id === selectedItemId)?.name}"?`
    );
    if (!confirmed) return;

    parent.children = parent.children.filter((c) => c.id !== selectedItemId);
    setSelectedItemId(null);
    setFileSystem({ ...fileSystem });
  };

  // Start renaming selected item
  const startRenaming = () => {
    if (!selectedItemId) {
      alert("Select an item to rename.");
      return;
    }
    if (selectedItemId === "root") {
      alert("Cannot rename the root folder.");
      return;
    }
    const item = findFolderById(fileSystem, selectedItemId);
    if (!item) return;
    setRenamingId(selectedItemId);
    setRenameText(item.name);
  };

  // Save rename
  const saveRename = () => {
    if (!renameText.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    const parent = findParentById(fileSystem, renamingId);
    if (!parent) return;

    // Check for duplicates
    if (
      parent.children.some(
        (c) =>
          c.id !== renamingId &&
          c.name.toLowerCase() === renameText.trim().toLowerCase()
      )
    ) {
      alert("An item with this name already exists.");
      return;
    }

    const item = parent.children.find((c) => c.id === renamingId);
    if (item) {
      item.name = renameText.trim();
      setFileSystem({ ...fileSystem });
      setRenamingId(null);
      setRenameText("");
    }
  };

  // Cancel rename
  const cancelRename = () => {
    setRenamingId(null);
    setRenameText("");
  };

  // Get breadcrumb path to current folder
  const getBreadcrumbs = () => {
    const path = [];
    let currentId = currentFolderId;
    while (currentId) {
      const node = findFolderById(fileSystem, currentId);
      if (!node) break;
      path.unshift(node);
      if (currentId === "root") break;
      const parent = findParentById(fileSystem, currentId);
      currentId = parent ? parent.id : null;
    }
    return path;
  };

  // Current folder contents
  const currentFolder = findFolderById(fileSystem, currentFolderId);

  return (
    <div style={styles.container} role="main" aria-label="File Management Simulation">
      <h1 style={styles.heading}>File Management Simulation Lab Ethiopia</h1>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={styles.breadcrumb}>
        {getBreadcrumbs().map((folder, idx, arr) => (
          <span key={folder.id}>
            <button
              onClick={() => goToFolder(folder.id)}
              style={styles.breadcrumbButton}
              aria-current={folder.id === currentFolderId ? "page" : undefined}
            >
              {folder.name}
            </button>
            {idx < arr.length - 1 && <span style={styles.breadcrumbSeparator}> / </span>}
          </span>
        ))}
      </nav>

      {/* Folder contents */}
      <section style={styles.content}>
        {currentFolder.children.length === 0 ? (
          <p style={styles.emptyText}>This folder is empty.</p>
        ) : (
          <ul style={styles.list}>
            {currentFolder.children.map((item) => (
              <li
                key={item.id}
                style={{
                  ...styles.listItem,
                  backgroundColor: selectedItemId === item.id ? "#e3f2fd" : "transparent",
                }}
              >
                {renamingId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={renameText}
                      onChange={(e) => setRenameText(e.target.value)}
                      style={styles.renameInput}
                      aria-label={`Rename ${item.type} ${item.name}`}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveRename();
                        if (e.key === "Escape") cancelRename();
                      }}
                    />
                    <button onClick={saveRename} style={styles.saveBtn} aria-label="Save rename">
                      Save
                    </button>
                    <button onClick={cancelRename} style={styles.cancelBtn} aria-label="Cancel rename">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (item.type === "folder") {
                          goToFolder(item.id);
                        } else {
                          alert(`Opening file: ${item.name}`);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (item.type === "folder") {
                            goToFolder(item.id);
                          } else {
                            alert(`Opening file: ${item.name}`);
                          }
                        }
                      }}
                      style={{
                        ...styles.itemName,
                        cursor: item.type === "folder" ? "pointer" : "default",
                        fontWeight: item.type === "folder" ? "700" : "400",
                        color: item.type === "folder" ? "#1565c0" : "#555",
                      }}
                      aria-label={`${item.type} named ${item.name}`}
                    >
                      {item.name}
                    </span>
                    <button
                      onClick={() => setSelectedItemId(item.id)}
                      style={{
                        ...styles.selectBtn,
                        backgroundColor: selectedItemId === item.id ? "#1565c0" : "#eee",
                        color: selectedItemId === item.id ? "white" : "black",
                      }}
                      aria-pressed={selectedItemId === item.id}
                      aria-label={`Select ${item.type} ${item.name}`}
                    >
                      {selectedItemId === item.id ? "Selected" : "Select"}
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Controls */}
      <section style={styles.controls} aria-label="File management controls">
        <div style={styles.newItemGroup}>
          <input
            type="text"
            placeholder="New folder or file name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            style={styles.input}
            aria-label="New folder or file name"
            onKeyDown={(e) => {
              if (e.key === "Enter") createNewItem();
            }}
          />
          <select
            value={newItemType}
            onChange={(e) => setNewItemType(e.target.value)}
            style={styles.select}
            aria-label="Select type: folder or file"
          >
            <option value="folder">Folder</option>
            <option value="file">File</option>
          </select>
          <button onClick={createNewItem} style={styles.createBtn} aria-label="Create new item">
            Create
          </button>
        </div>

        <div style={styles.actionButtons}>
          <button
            onClick={startRenaming}
            disabled={!selectedItemId || renamingId !== null || selectedItemId === "root"}
            style={{
              ...styles.actionBtn,
              opacity: !selectedItemId || renamingId !== null || selectedItemId === "root" ? 0.5 : 1,
              cursor: !selectedItemId || renamingId !== null || selectedItemId === "root" ? "not-allowed" : "pointer",
            }}
            aria-disabled={!selectedItemId || renamingId !== null || selectedItemId === "root"}
            aria-label="Rename selected item"
          >
            Rename
          </button>
          <button
            onClick={deleteItem}
            disabled={!selectedItemId || selectedItemId === "root"}
            style={{
              ...styles.actionBtn,
              backgroundColor: "#e53935",
              color: "white",
              opacity: !selectedItemId || selectedItemId === "root" ? 0.5 : 1,
              cursor: !selectedItemId || selectedItemId === "root" ? "not-allowed" : "pointer",
            }}
            aria-disabled={!selectedItemId || selectedItemId === "root"}
            aria-label="Delete selected item"
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7f9fc",
    padding: "1.5rem 2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#1a237e",
  },
  breadcrumb: {
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  breadcrumbButton: {
    background: "none",
    border: "none",
    color: "#1565c0",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "1rem",
    padding: 0,
    margin: 0,
  },
  breadcrumbSeparator: {
    margin: "0 6px",
    color: "#555",
  },
  content: {
    minHeight: 200,
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "6px",
    boxShadow: "inset 0 0 10px #ddd",
  },
  emptyText: {
    color: "#777",
    fontStyle: "italic",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    borderBottom: "1px solid #eee",
  },
  itemName: {
    outline: "none",
  },
  selectBtn: {
    border: "1px solid #1565c0",
    borderRadius: "4px",
    padding: "5px 12px",
    backgroundColor: "#eee",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "0.9rem",
  },
  controls: {
    marginTop: "1.5rem",
  },
  newItemGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "1rem",
  },
  input: {
    flexGrow: 1,
    padding: "8px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "8px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  createBtn: {
    backgroundColor: "#1565c0",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  actionButtons: {
    display: "flex",
    gap: "15px",
  },
  actionBtn: {
    padding: "8px 18px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
  renameInput: {
    padding: "6px 8px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #1976d2",
    marginRight: "8px",
    flexGrow: 1,
  },
  saveBtn: {
    padding: "6px 12px",
    marginRight: "6px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
  cancelBtn: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#e53935",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default FileManagement;
