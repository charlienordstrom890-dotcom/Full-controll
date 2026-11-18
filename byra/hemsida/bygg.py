"""Bygger den publicerbara hemsidan från index.html (som också är förhandsvisningen på claude.ai).

Kör:  python3 byra/hemsida/bygg.py
Resultat: byra/hemsida/publicera/index.html (det som GitHub Pages lägger ut).
"""
from pathlib import Path

HERE = Path(__file__).parent
KONTAKT_EPOST = "hej@fullthus.se"   # ändra här om adressen blir en annan
FORMULAR_URL = ""                   # t.ex. Formspree/Tally-endpoint; tomt = öppna e-post med förifylld text

src = (HERE / "index.html").read_text(encoding="utf-8")

head = f"""<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='12' cy='32' r='9' fill='%23C8322B'/%3E%3Ccircle cx='32' cy='32' r='9' fill='%23C8322B'/%3E%3Ccircle cx='52' cy='32' r='9' fill='%23C8322B'/%3E%3C/svg%3E">
<style>:root{{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}html{{scroll-behavior:smooth}}</style>
"""

# Byt formulärets demo-hantering mot en riktig: skicka till FORMULAR_URL, annars öppna e-post.
old = """    // Koppla här till Tally, Formspree eller liknande när sajten läggs upp på riktigt.
    document.getElementById('thanks-email').textContent = email.value.trim();
    form.hidden = true;
    document.getElementById('thanks').hidden = false;"""
new = f"""    var data = new FormData(form);
    var done = function () {{
      document.getElementById('thanks-email').textContent = email.value.trim();
      form.hidden = true;
      document.getElementById('thanks').hidden = false;
    }};
    var endpoint = {FORMULAR_URL!r};
    if (endpoint) {{
      fetch(endpoint, {{ method: 'POST', body: data, headers: {{ 'Accept': 'application/json' }} }})
        .then(function (r) {{ if (!r.ok) throw new Error(); done(); }})
        .catch(function () {{ msg.textContent = 'Det gick inte att skicka. Mejla oss på {KONTAKT_EPOST} i stället.'; }});
    }} else {{
      var body = 'Hej! Jag vill ha en gratis granskning.%0D%0A%0D%0A';
      data.forEach(function (v, k) {{ body += encodeURIComponent(k + ': ' + v) + '%0D%0A'; }});
      window.location.href = 'mailto:{KONTAKT_EPOST}?subject=' + encodeURIComponent('Gratis granskning: ' + data.get('namn')) + '&body=' + body;
      msg.textContent = 'Ditt mejlprogram öppnas. Fungerar det inte, mejla oss på {KONTAKT_EPOST}.';
    }}"""
assert old in src, "formulärkoden har ändrats — uppdatera bygg.py"
src = src.replace(old, new)
src = src.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")

out = HERE / "publicera" / "index.html"
out.parent.mkdir(exist_ok=True)
out.write_text(head + src + "\n</html>\n", encoding="utf-8")
(out.parent / ".nojekyll").write_text("")
print("Byggd:", out)
