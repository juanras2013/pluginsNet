const LZString = {
    compressToEncodedURIComponent: function(o) {
        if (null == o) return "";
        return LZString._compress(o, 6, function(o) { return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(o); });
    },
    _compress: function(o, r, n) {
        if (null == o) return "";
        var e, t, i, s = {}, a = {}, p = "", c = "", l = "", f = 2, w = 3, h = 0, d = 0, v = 0;
        for (i = 0; i < o.length; i += 1) if (p = o.charAt(i), Object.prototype.hasOwnProperty.call(s, p) || (s[p] = w++, a[p] = !0), c = l + p, Object.prototype.hasOwnProperty.call(s, c)) l = c; else {
            if (Object.prototype.hasOwnProperty.call(a, l)) {
                if (l.charCodeAt(0) < 256) {
                    for (e = 0; e < v; e++) h <<= 1, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++;
                    for (t = l.charCodeAt(0), e = 0; e < 8; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
                } else {
                    for (t = 1, e = 0; e < v; e++) h = h << 1 | t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t = 0;
                    for (t = l.charCodeAt(0), e = 0; e < 16; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
                }
                f--, 0 == f && (f = Math.pow(2, v), v++), delete a[l];
            } else for (t = s[l], e = 0; e < v; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
            f--, 0 == f && (f = Math.pow(2, v), v++), s[c] = w++, l = String(p);
        }
        if ("" !== l) {
            if (Object.prototype.hasOwnProperty.call(a, l)) {
                if (l.charCodeAt(0) < 256) {
                    for (e = 0; e < v; e++) h <<= 1, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++;
                    for (t = l.charCodeAt(0), e = 0; e < 8; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
                } else {
                    for (t = 1, e = 0; e < v; e++) h = h << 1 | t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t = 0;
                    for (t = l.charCodeAt(0), e = 0; e < 16; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
                }
                f--, 0 == f && (f = Math.pow(2, v), v++), delete a[l];
            } else for (t = s[l], e = 0; e < v; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
            f--, 0 == f && (f = Math.pow(2, v), v++);
        }
        for (t = 2, e = 0; e < v; e++) h = h << 1 | 1 & t, d == r - 1 ? (d = 0, f += n(h), h = 0) : d++, t >>= 1;
        for (;;) { if (h <<= 1, d == r - 1) { f += n(h); break; } d++; }
        return f;
    }
};

(() => {
    const inputArea = document.getElementById("codigoInput");
    const linkDinamico = document.getElementById("linkDinamico");
    if (!inputArea || !linkDinamico) return;

    inputArea.addEventListener("input", () => {
        const contenido = inputArea.value;
        if (!contenido.trim()) {
            linkDinamico.href = "#";
            linkDinamico.innerText = "Escribe para empaquetar tu infraestructura...";
            return;
        }
        const compressed = LZString.compressToEncodedURIComponent(contenido);
        const baseUrl = window.location.origin + window.location.pathname;
        const finalUrl = `${baseUrl}?code=${compressed}`;
        linkDinamico.href = finalUrl;
        linkDinamico.innerText = finalUrl;
    });
})();
