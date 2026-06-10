@app.route("/admin")
def admin():

    conn = sqlite3.connect("wedding.db")
    cur = conn.cursor()

    cur.execute("SELECT * FROM rsvp")
    data = cur.fetchall()

    conn.close()

    return str(data)