import sqlite3

conn = sqlite3.connect("wedding.db")

cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    hadir TEXT NOT NULL,
    pesan TEXT
)
""")

conn.commit()
conn.close()

print("Database berhasil dibuat")