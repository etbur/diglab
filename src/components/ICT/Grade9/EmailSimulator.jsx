import React, { useState } from "react";

const EmailSimulator = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [inbox, setInbox] = useState([]);

  const handleSend = () => {
    if (!to.trim() || !subject.trim() || !message.trim()) {
      alert("Please complete all fields.");
      return;
    }

    const newEmail = {
      id: Date.now(),
      from: "you@lab.et",
      to,
      subject,
      message,
      time: new Date().toLocaleString(),
    };

    setInbox([newEmail, ...inbox]);
    setTo("");
    setSubject("");
    setMessage("");
  };

  return (
    <div style={styles.wrapper}>
      <h1>Email Sending & Receiving Simulator Lab - Ethiopia</h1>

      <section style={styles.formBox}>
        <h2>📤 Compose Email</h2>
        <input
          type="email"
          placeholder="To (e.g. example@domain.com)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleSend} style={styles.sendButton}>Send Email</button>
      </section>

      <section style={styles.inboxBox}>
        <h2>📥 Inbox</h2>
        {inbox.length === 0 ? (
          <p style={styles.emptyInbox}>No emails received yet.</p>
        ) : (
          inbox.map((email) => (
            <div key={email.id} style={styles.emailCard}>
              <p><strong>From:</strong> {email.from}</p>
              <p><strong>To:</strong> {email.to}</p>
              <p><strong>Subject:</strong> {email.subject}</p>
              <p><strong>Time:</strong> {email.time}</p>
              <div style={styles.messageBody}>{email.message}</div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: "Segoe UI, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "#f8f9fa",
  },
  formBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  inboxBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  sendButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  emailCard: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#fdfdfd",
  },
  messageBody: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#eef1f5",
    borderRadius: "4px",
    fontStyle: "italic",
  },
  emptyInbox: {
    color: "#777",
    fontStyle: "italic",
  },
};

export default EmailSimulator;
