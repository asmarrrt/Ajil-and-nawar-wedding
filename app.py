from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
    conn = sqlite3.connect("wedding.db")
    cur = conn.cursor()
    
cur.execute("""
    SELECT id, nama, hadir, pesan FROM rsvp ORDER BY id DESC
""")
ucapan = [
    {"id": row[0], "nama": row[1], "hadir": row[2], "pesan": row[3]}
    for row in cur.fetchall()
]
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


# Halaman Admin
@app.route("/admin")
def admin():

    conn = sqlite3.connect("wedding.db")
    cur = conn.cursor()

    cur.execute("""
        SELECT id, nama, hadir, pesan
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
        <th>Aksi</th>
    </tr>
    """

    for row in data:

        html += f"""
        <tr>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
            <td>{row[3]}</td>
            <td>
                <a href="/hapus/{row[0]}"
                onclick="return confirm('Hapus ucapan ini?')">
                Hapus
                </a>
            </td>
        </tr>
        """

    html += "</table>"

    return html


# Hapus RSVP
@app.route("/hapus/<int:id>")
def hapus(id):

    conn = sqlite3.connect("wedding.db")
    cur = conn.cursor()

    cur.execute(
        "DELETE FROM rsvp WHERE id=?",
        (id,)
    )

    conn.commit()
    conn.close()

    return redirect("/admin")


if __name__ == "__main__":
    app.run(debug=True)
