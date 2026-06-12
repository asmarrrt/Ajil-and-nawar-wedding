import sqlite3

conn = sqlite3.connect("wedding.db")
cur = conn.cursor()

# Check table structure
cur.execute("PRAGMA table_info(rsvp)")
print("Table structure:")
print(cur.fetchall())

# Check data
cur.execute("SELECT * FROM rsvp")
print("\nDatabase content:")
for row in cur.fetchall():
    print(row)

conn.close()
