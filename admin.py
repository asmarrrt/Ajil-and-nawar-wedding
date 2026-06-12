cur.execute("""
    SELECT id, nama, hadir, pesan
    FROM rsvp
    ORDER BY id DESC
""")
