from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

# Halaman utama
@app.route("/")
def home():

    conn = sqlite3.connect("wedding.db")
    cur = conn.cursor()

    cur.execute("""
        SELECT nama, hadir, pesan
        FROM rsvp
        ORDER BY id DESC
    """)

    ucapan = cur.fetchall()

    conn.close()

    return render_template(
        "index.html",
        ucapan=ucapan
    )

# Simpan RSVP
@app.route("/rsvp", methods=["POST"])
def rsvp():

    nama = request.form["nama"]
    hadir = request.form["hadir"]
    pesan = request.form["pesan"]

    conn = sqlite3.connect("wedding.db")
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO rsvp (nama, hadir, pesan) VALUES (?, ?, ?)",
        (nama, hadir, pesan)
    )

    conn.commit()
    conn.close()

    return redirect("/#rsvp")

# Halaman admin
@app.route("/admin")
def admin():

    conn = sqlite3.connect("wedding.db")
    cur = conn.cursor()

    cur.execute("""
        SELECT nama, hadir, pesan
        FROM rsvp
        ORDER BY id DESC
    """)

    data = cur.fetchall()

    conn.close()

    html = """
    <h1>Daftar RSVP</h1>
    <table border='1' cellpadding='10'>
    <tr>
        <th>Nama</th>
        <th>Kehadiran</th>
        <th>Ucapan</th>
    </tr>
    """

    for row in data:
        html += f"""
        <tr>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
        </tr>
        """

    html += "</table>"

    return html

if __name__ == "__main__":
    app.run(debug=True)